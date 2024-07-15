const express = require("express");
const auth = require("../middlewares/auth");
const { getOrdersByCustomer } = require("../controllers/orderControllers");
const role = require("../middlewares/role");

const router = express.Router();

router.get("/:customerId", auth, role(['admin', 'user']), getOrdersByCustomer);

module.exports = router;
