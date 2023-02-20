const router = require("express").Router();
const Admin = require("../models/Admin");

// getOrders for admin portal where address will be included
router.post("/getOrders", (req, res) => {
  const data = req.body.password;
  if (data !== "MirchiMeals") {
    res.status(206).json("Nope");
  } else {
    Admin.getOrders(res);
  }
});

router.get("/ordersDelivery", (req, res) => {
  Admin.getOrdersForDelivery(res);
});

router.post("/orderById", (req, res) => {
  Admin.getOrderByNumber(req.body.orderNumber, res);
});

// delete order given id
router.post("/deleteOrder", (req, res) => {
  if (req.body.password !== "MirchiMeals") {
    res.status(206).json("Nope");
    console.log("Not deleted!");
  } else {
    Admin.deleteOrder(req.body.orderNumber, res);
  }
});

module.exports = router;
