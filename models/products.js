const { client, q } = require("../config");

module.exports = class Products {
  static getProducts() {
    return client
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index("all_products"))),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      )
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log("error in getProducts", err);
      });
  }
};
