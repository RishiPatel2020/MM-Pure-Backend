const DataCollection = require("../models/DataCollection");

const router = require("express").Router();



// adds previous website
router.post("/referral", (req, res) => {
    DataCollection.addReferral(req.body,res); 
});

router.post("/unprocessedMeals",(req,res)=>{
    DataCollection.addUnprocessedMeals(req.body,res); 
});



module.exports = router;


