const mysql = require("../config/db");

class User {
  User() {
    this.finalOrderHistory = [];
  }

  // REGISTER USER
  async add({ firstName, lastName, email, password }, response) {
    try {
      const q =
        "INSERT INTO Customer (First_Name, Last_Name,Email,Password) VALUES (?,?,?,?)";
      const [result] = await mysql.query(q, [
        firstName,
        lastName,
        email,
        password,
      ]);
      console.log(`SUCCESSFUL ADDITION: ${result.insertId}`);
      response.status(201).json(result.insertId);
    } catch (err) {
      response.status(501).json(err.sqlMessage);
    }
  }

  // LOG IN
  async logIn({ userName, password }, resp) {
    try {
      const q = "SELECT * FROM Customer WHERE EMAIL = ? AND PASSWORD = ?";
      const [result] = await mysql.query(q, [userName, password]);
      console.log(`User Found: ${result}`);
      resp.status(200).json(result[0]);
    } catch (err) {
      resp.status(501).json(err.message);
    }
  }

  // UPDATE LOG IN INFO
  async update({ id, userName, password }, resp) {
    try {
      const q = "UPDATE Customer SET email = ?, password = ? WHERE id=?";
      const [result] = await mysql.query(q, [userName, password, id]);
      if (result.affectedRows > 0) {
        resp.status(200).json({
          userName,
          password,
        });
      } else {
        resp.status(304).json("no change");
      }
    } catch (err) {
      resp.status(501).json(err.message);
    }
  }

  // callBack(OrderId) {
  //   return new Promise((resolve, reject) => {
  //     const subQuery =
  //       "select name from Item where Item_ID in (select item_id from Hotel where order_id = ?)";
  //     mysql.query(subQuery, [OrderId], (err, mealsOrdered) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         const result = JSON.stringify(mealsOrdered);
  //         resolve(result);
  //       }
  //     });
  //   });
  // }
  // GET ORDER HISTORY
  // async accountHistory(CustomerId, resp) {
  //   try {
  //     console.log("Here:: " + CustomerId);
  //     const q =
  //       "with PartialInfo as (select ot.id as OrderID, c.id as CustomerID, sum(h.quantity) as MealSize From Customer c Join Order_table ot on c.id = ot.Customer_id Join Hotel h on ot.id = h.Order_ID Join Item i on h.item_id = i.item_id group by OrderID having c.id = ?) select OrderID, CustomerID, MealSize, Total_price, Shipping_date, order_date from PartialInfo join Order_table on Order_table.id=PartialInfo.OrderID";
  //     const [rs] = await mysql.query(q, [CustomerId]);
  //     const result = JSON.stringify(rs);
  //     let promises = [];
  //     this.finalOrderHistory = [];
  //     JSON.parse(result).forEach(async (item) => {
  //       let objToBeAdded = {
  //         OrderId: item.OrderID,
  //         deliveryDate: item.Shipping_date,
  //         totalPrice: item.Total_price,
  //         mealSize: item.MealSize,
  //         orderDate: item.order_date,
  //         meals: [],
  //       };
  //       this.finalOrderHistory.push(objToBeAdded);
  //       promises.push(this.callBack(item.OrderID));
  //     });
  //     Promise.all(promises)
  //       .then((result) => {
  //         result.forEach((item, index) => {
  //           this.finalOrderHistory[index].meals = JSON.parse(item);
  //         });
  //         console.log("BEFORE RESP");
  //         resp.status(200).json(this.finalOrderHistory);

  //       })
  //       .catch((error) => {
  //         resp.status(500).json(error);
  //       });
  //   } catch (err) {
  //     resp.status(500).json(err);
  //   }
  // }

  async callBack(OrderId) {
    const subQuery =
      "select name from Item where Item_ID in (select item_id from Hotel where order_id = ?)";
    try {
      const [mealsOrdered] = await mysql.query(subQuery, [OrderId]);
      return JSON.stringify(mealsOrdered);
    } catch (err) {
      throw err;
    }
  }

  async accountHistory(CustomerId, resp) {
    const q =
      "with PartialInfo as (select ot.id as OrderID, c.id as CustomerID, sum(h.quantity) as MealSize From Customer c Join Order_table ot on c.id = ot.Customer_id Join Hotel h on ot.id = h.Order_ID Join Item i on h.item_id = i.item_id group by OrderID having c.id = ?) select OrderID, CustomerID, MealSize, Total_price, Shipping_date, order_date from PartialInfo join Order_table on Order_table.id=PartialInfo.OrderID";
    try {
      const [rs] = await mysql.query(q, [CustomerId]);
      const result = JSON.stringify(rs);
      this.finalOrderHistory = [];
      for (const item of JSON.parse(result)) {
        let objToBeAdded = {
          OrderId: item.OrderID,
          deliveryDate: item.Shipping_date,
          totalPrice: item.Total_price,
          mealSize: item.MealSize,
          orderDate: item.order_date,
          meals: [],
        };
        this.finalOrderHistory.push(objToBeAdded);
        objToBeAdded.meals = JSON.parse(await this.callBack(item.OrderID));
      }
      console.log("Final Order History:: " + this.finalOrderHistory);
      resp.status(200).json(this.finalOrderHistory);
    } catch (err) {
      resp.status(500).json(err);
    }
  }
}

module.exports = new User();
