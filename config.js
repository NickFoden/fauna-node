exports.PORT = process.env.PORT || 8080;
const ACCESS_KEY = process.env.ACCESS_KEY;

const faunadb = require("faunadb"),
  q = faunadb.query;

const client = new faunadb.Client({ secret: ACCESS_KEY });

exports.client = client;
exports.q = q;
