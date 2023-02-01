require("dotenv").config();
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Order = require("../models/Order");
const User = require("../models/User");

// Add line items
router.post("/payment",(req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"usd",
        receipt_email:req.body.email

    },(stripeErr,stripeRes)=>{
        if(stripeErr){
            console.log("ERROR... "+stripeErr);
            res.status(206).send(""+stripeErr);
        }else{
            res.status(200).json(stripeRes);
        }
    });
});
// router.post("/payment", async (req, res) => {
//   try {
//     const [result] = await stripe.charges.create({
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "usd",
//       receipt_email: req.body.email,
//     });
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(206).send(err);
//   }
// });
// this is where we register the order in our DB
router.post("/addOrder", (req, res) => {
  Order.add(req.body, res);
});

router.post("/getOrderHistory", (req, res) => {
  User.accountHistory(req.body.id, res);
});

module.exports = router;
