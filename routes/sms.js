const SMS = require("../models/SMS");

const router = require("express").Router();

// send sms
router.post("/sendSMS", (req, res) => {
  SMS.sendMessageAPI(req.body.number,req.body.msg, res);
});

module.exports = router;
