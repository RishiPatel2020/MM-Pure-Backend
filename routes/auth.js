const router = require("express").Router();
const User = require("../models/User");

// REGISTER
router.post("/register", (req, res) => {
  const data = req.body;
  User.add(data, res);
});

// LOGIN
router.post("/login", (req, res) => {
  const data = req.body;
  User.logIn(data, res);
});

// UPDATE
router.put("/update", (req, res) => {
  const data = req.body;
  User.update(data, res);
});

router.post("/forgotPassword", (req, res) => {
  const data = req.body;
  User.forgotPassword(data, res);
});


module.exports = router;
