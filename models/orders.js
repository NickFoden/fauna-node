const { client, q } = require("../config");

module.exports = class Orders {
  static getOrders() {
    return client
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index("all_orders"))),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      )
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log("error in getOrders", err);
      });
  }
};
