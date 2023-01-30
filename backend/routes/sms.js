const SMS = require("../models/SMS");

const router = require("express").Router();



// send sms
router.post("/sendSMS", (req, res) => {
    console.log("sms.JS HIT ");
    SMS.sendMessage(req.body,res); 
});



module.exports = router;


