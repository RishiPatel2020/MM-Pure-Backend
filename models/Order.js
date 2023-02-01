const mysql = require("../config/db");
const Hotel = require("./Hotel");

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
      resp.status(200).json(result.insertId);
    } catch (err) {
      console.log("Error:: "+err);
      resp.status(501).json(err);
    }
  }
}

module.exports = new Order();
