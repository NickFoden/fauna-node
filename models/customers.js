const { client, q } = require("../config");

module.exports = class Customers {
  static getCustomers() {
    return client
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index("all_customers"))),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      )
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log("error in getCustomers", err);
      });
  }
};
