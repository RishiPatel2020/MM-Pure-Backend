const DataCollection = require("../models/DataCollection");

const router = require("express").Router();



// adds previous website
router.post("/referral", (req, res) => {
    DataCollection.addReferral(req.body,res); 
});



module.exports = router;


