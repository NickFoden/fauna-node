const { client, q } = require("../config");

// Not in use at moment
module.exports = class Warehouses {
  static getWarehouses() {
    return client
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index("all_warehouses"))),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      )
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log("error in getWarehouses", err);
      });
  }
};
