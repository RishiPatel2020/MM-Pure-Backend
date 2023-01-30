const mysql = require("../config/db");

class User {
  User() {
    this.finalOrderHistory = [];
  }
  //   CREATE USER OR REGISTER
  add({ firstName, lastName, email, password }, resp) {
    try {
      const q =
        "INSERT INTO Customer (First_Name, Last_Name,Email,Password) VALUES (?,?,?,?)";
      mysql.query(q, [firstName, lastName, email, password], (err, res) => {
        if (err) {
          // resp.status(501).json(err.sqlMessage);
          resp.json(err.sqlMessage);
        } else {
          // resp.status(201).json(res.insertId);
          console.log(`SUCCESSFUL ADDITION: ${res.insertId}`);
          // resp.json(res.insertId);
          resp.send(res.insertId);
        }
      });
    } catch (err) {
      resp.json(err);
    }
  }

  // LOGIN USER
  logIn({ userName, password }, resp) {
    const q = "SELECT * FROM Customer WHERE EMAIL = ? AND PASSWORD = ?";
    mysql.query(q, [userName, password], (err, res) => {
      if (err) {
        resp.status(501).json(err.sqlMessage);
      } else {
        if (res[0]) {
          resp.status(200).json(res[0]);
        } else {
          resp.status(401).json("Unauthorized!");
        }
      }
    });
  }

  // UPDATE LOG IN INFO
  update({ id, userName, password }, resp) {
    const q = "UPDATE Customer SET email = ?, password = ? WHERE id=?";
    mysql.query(q, [userName, password, id], (err, res) => {
      if (err) {
        resp.status(501).json(err.sqlMessage);
      } else {
        if (res.affectedRows > 0) {
          resp.status(200).json({
            userName: userName,
            password: password,
          });
        } else {
          resp.status(304).json("no change");
        }
      }
    });
  }

  callBack(OrderId) {
    return new Promise((resolve, reject) => {
      const subQuery =
        "select name from practice.item where item_id in (select item_id from practice.Hotel where order_id = ?)";
      mysql.query(subQuery, [OrderId], (err, mealsOrdered) => {
        if (err) {
          reject(err);
        } else {
          const result = JSON.stringify(mealsOrdered);
          resolve(result);
        }
      });
    });
  }
  accountHistory(CustomerId, resp) {
    console.log(`CustomerId is ${CustomerId}`);
    const q =
      "with PartialInfo as (select ot.id as OrderID, c.id as CustomerID, sum(h.quantity) as MealSize From Customer c Join Order_table ot on c.id = ot.Customer_id Join Hotel h on ot.id = h.Order_ID Join Item i on h.item_id = i.item_id group by OrderID having c.id = ?) select OrderID, CustomerID, MealSize, Total_price, Shipping_date, order_date from PartialInfo join Order_table on Order_table.id=PartialInfo.OrderID";
    mysql.query(q, [CustomerId], (err, res) => {
      if (err) {
      } else {
        const result = JSON.stringify(res);
        let promises = [];
        this.finalOrderHistory = [];
        JSON.parse(result).forEach(async (item) => {
          let objToBeAdded = {
            OrderId: item.OrderID,
            deliveryDate: item.Shipping_date,
            totalPrice: item.Total_price,
            mealSize: item.MealSize,
            orderDate: item.order_date,
            meals: [],
          };
          this.finalOrderHistory.push(objToBeAdded);
          promises.push(this.callBack(item.OrderID));
        });
        Promise.all(promises)
          .then((result) => {
            result.forEach((item, index) => {
              this.finalOrderHistory[index].meals = JSON.parse(item);
            });
            resp.status(200).json(this.finalOrderHistory);
          })
          .catch((error) => {
            resp.status(500).json({ error });
          });
      }
    });
  }
}

module.exports = new User();
