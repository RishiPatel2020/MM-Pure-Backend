const router = require("express").Router();
const Hotel = require("../models/Hotel");
const User = require("../models/Hotel");

// meal quantity Table
router.post("/mealQuantityTable", (req, res) => {
  Hotel.getMealQuantityTable(req.body.date, res);
});

router.post("/ordersTable", (req, res) => {
  Hotel.getOrdersTable(req.body.date, res);
});

module.exports = router;


