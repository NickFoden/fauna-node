const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orders");

router.get("/", orderController.getOrders);

module.exports = router;
