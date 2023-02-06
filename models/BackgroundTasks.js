const mysql = require("../config/db");
const cron = require("node-cron");
const DateService = require("../service/DateService");
const sendMsg = require("../models/SMS");

async function reminder() {
  const closestSunday = DateService.closestUpcomingSunday();
  const q =
    "SELECT First_Name, phone, derived.id FROM Customer JOIN (SELECT * FROM Order_table Where Shipping_date = ?) AS derived ON Customer.id = derived.Customer_id";
  const [customers] = await mysql.query(q, [closestSunday]);

  customers.forEach((customer) => {
    const { First_Name, phone, id } = customer;
    let message;
    if (DateService.isSaturday()) {
      message = `Mirchi Meals \nHello ${First_Name}. Tomorrow you will get delivery around 06:30PM EST for order #${id}`;
    } else {
      message = ` Mirchi Meals \nHello ${First_Name}. Today you will get delivery around 06:30PM EST for order #${id}`;
    }
    sendMsg.sendMessage(phone,message);

  });
}

// replace 24 23 with 0 18 for 06:00PM EST
module.exports = function () {
  cron.schedule("0 18 * * 6,0", function () {
    reminder();
  });
};
