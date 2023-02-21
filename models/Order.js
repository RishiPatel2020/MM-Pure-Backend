const { SmsCommandContext } = require("twilio/lib/rest/supersim/v1/smsCommand");
const mysql = require("../config/db").default;
const Hotel = require("./Hotel");
const SMS = require("./SMS");
class Order {
  // ADD (order_date, shipping_date, total_price, email, address, customer_id) IN Order_Table
  // ADD (OrderID, itemId, quantity) IN Hotel table
  async add(
    {
      Order_date,
      Shipping_date,
      Total_Price,
      email,
      Address,
      Customer_id,
      mealAndFreqs,
    },
    resp
  ) {
    try {
      const q =
        "INSERT INTO Order_table (Order_date, Shipping_date, Total_Price, email, Address, Customer_id) VALUES (?,?,?,?,?,?)";
      const [result] = await mysql.query(q, [
        Order_date,
        Shipping_date,
        Total_Price,
        email,
        Address,
        Customer_id,
      ]);
      Hotel.add(result.insertId, mealAndFreqs);
      // send status

      try {
        const phoneQuery = "SELECT phone FROM Customer WHERE id = ?";
        const [phoneNumber] = await mysql.query(phoneQuery, [Customer_id]);
        SMS.sendMessage(
          phoneNumber[0].phone,
          `Order Confirmation #${result.insertId}`
        );
      } catch (err) {}

      resp.status(200).json(result.insertId);
    } catch (err) {
      console.log("ERRR: " + err);
      resp.status(501).json(err);
    }
  }
}

module.exports = new Order();
