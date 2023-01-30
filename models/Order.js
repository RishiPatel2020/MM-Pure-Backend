const mysql = require("../config/db");
const Hotel = require("./Hotel");

class Order {
  // ADD (order_date, shipping_date, total_price, email, address, customer_id) IN Order_Table
  // ADD (OrderID, itemId, quantity) IN Hotel table
  add(
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
    const q =
      "INSERT INTO Order_table (Order_date, Shipping_date, Total_Price, email, Address, Customer_id) VALUES (?,?,?,?,?,?)";
    mysql.query(
      q,
      [Order_date, Shipping_date, Total_Price, email, Address, Customer_id],
      (err, res) => {
        if (err) {
          resp.status(501).json(err.sqlMessage);
        } else {
          // Add items to hotel CANNOT HAVE ANY ERROR
          Hotel.add(res.insertId, mealAndFreqs);
          
          // send status
          resp.status(200).json(res.insertId);
        }
      }
    );

  }  
}

module.exports = new Order();
