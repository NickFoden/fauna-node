const { mapToObj } = require("../helpers");
const Customers = require("../models/customers");
const Orders = require("../models/orders");
const Products = require("../models/products");

exports.getOrders = (req, res, next) => {
  Promise.all([
    Customers.getCustomers(),
    Orders.getOrders(),
    Products.getProducts()
  ])
    .then(values => {
      const customers = values[0]["data"];
      const orders = values[1]["data"];
      const products = values[2]["data"];
      const finalValues = processOrder(customers, orders, products);
      res.status(200).send(finalValues);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const processOrder = (customers, orders, products) => {
  const finalOrders = [];

  const customersObj = mapToObj(customers);
  const productsObj = mapToObj(products);

  Object.values(orders).map(anOrder => {
    if (!anOrder.data || !anOrder.data.line) {
      return;
    }
    const { id } = anOrder.ref;
    const { customer, line, shipAddress, status } = anOrder.data;

    const orderWithData = {
      orderId: id,
      orderItems: [],
      customerName: "",
      shipAddress: shipAddress ? shipAddress : false,
      status: status ? status : false,
      total: 0
    };

    if (customer && customer.id) {
      const custObj = customersObj[customer.id];
      orderWithData["customerName"] = `${custObj.firstName} ${
        custObj.lastName
      }`;
    }

    if (line) {
      line.map(prod => {
        const { quantity, price, product } = prod;
        const { id } = product;
        const { name, description } = productsObj[id];
        const subTotalInCents = quantity * price * 100;
        const oneLine = {
          name,
          description,
          subTotal: (subTotalInCents / 100).toFixed(2)
        };

        orderWithData["total"] = orderWithData["total"] + subTotalInCents / 100;
        orderWithData.orderItems.push(oneLine);
      });
    }

    orderWithData["total"] = orderWithData["total"].toFixed(2);

    finalOrders.push(orderWithData);
  });
  return finalOrders;
};
