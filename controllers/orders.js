const { mapToObj } = require("../helpers");
const Customers = require("../models/customers");
const Orders = require("../models/orders");
const Products = require("../models/products");

//Was starting down a promise chain for each index
//but Promise.all feels faster and succinct
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

  //Creating an object vs looping & looping within each order
  const customersObj = mapToObj(customers);
  const productsObj = mapToObj(products);

  Object.values(orders).map(anOrder => {
    if (!anOrder.data || !anOrder.data.line) {
      return;
    }
    const { id } = anOrder.ref;
    const { customer, line, shipAddress, status } = anOrder.data;

    //use the shipping address from the order not the customer in case they are shipping a gift etc
    //I like defaults of false but have used others as well
    const orderWithData = {
      orderId: id,
      orderItems: [],
      customerName: "",
      shipAddress: shipAddress ? shipAddress : false,
      status: status ? status : false,
      total: 0
    };
    //Assume we just want the full name for the shipping label
    if (customer && customer.id) {
      const custObj = customersObj[customer.id];
      orderWithData["customerName"] = `${custObj.firstName} ${
        custObj.lastName
      }`;
    }
    //Handle the order total and subtotal for each type here mapping over the order
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
