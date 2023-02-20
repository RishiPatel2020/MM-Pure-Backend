const express = require("express");
const app = express();
const dotenv = require("dotenv");
const checkout = require("./routes/checkout");
const hotel = require("./routes/hotel");
const authRoute = require("./routes/auth");
const sms = require("./routes/sms");
const datacollect = require("./routes/datacollect");
const admin = require("./routes/admin"); 
const cors = require("cors");
const backTask = require("./models/BackgroundTasks");

// for sending orders
backTask();

dotenv.config();

//setting up port in server
app.listen(process.env.PORT || 5001, () => {
  console.log(`Backend is running... on ${process.env.PORT}`);
});

// parse application/json
app.use(express.json());

// cors policy
app.use(cors());

// auth routes that uses User object and add() method to add user in DB
app.use("/api/auth", authRoute);

app.use("/api/checkout", checkout);

app.use("/api/hotel", hotel);

app.use("/api/SMS", sms);


app.use("/api/dataCollection", datacollect);

app.use("/api/admin",admin)

app.get("/", (req, res) => {
  res.json(`Backend hit successfully! RUnning on ::: ${process.env.PORT}`);
});
