const mysql = require("../config/db");
const DateService = require("../service/DateService");

class Admin {
  // as of now
  async getOrders(resp) {
    try {
      const q =
        "Select ot.id,i.Name,h.Quantity,ot.Shipping_Date, ot.Address FROM Order_table ot JOIN Hotel h On ot.id = h.Order_ID JOIN Item i On h.Item_ID = i.Item_ID ORDER BY ot.id";
      const [result] = await mysql.query(q);
      const temp = {};
      result.forEach((element) => {
        if (temp[element.id]) {
          temp[element.id].meals.push([element.Name, element.Quantity]);
        } else {
          const objToBeAdded = {
            orderNumber: element.id,
            meals: [[element.Name, element.Quantity]],
            dueDate: element.Shipping_Date,
            address: element.Address,
          };
          temp[element.id] = objToBeAdded;
        }
      });
      resp.status(200).json(Object.values(temp));
    } catch (err) {
      resp.status(206).json(err);
    }
  }

  //   view all orders
  async getAllOrders(resp) {
    try {
      const q =
        "Select ot.id,i.Name,h.Quantity,ot.Shipping_Date, ot.Address FROM Order_table ot JOIN Hotel h On ot.id = h.Order_ID JOIN Item i On h.Item_ID = i.Item_ID ORDER BY ot.id";
      const [result] = await mysql.query(q);
      const temp = {};
      result.forEach((element) => {
        if (temp[element.id]) {
          temp[element.id].meals.push([element.Name, element.Quantity]);
        } else {
          const objToBeAdded = {
            orderNumber: element.id,
            meals: [[element.Name, element.Quantity]],
            dueDate: element.Shipping_Date,
            address: element.Address,
          };
          temp[element.id] = objToBeAdded;
        }
      });
      resp.status(200).json(Object.values(temp));
    } catch (err) {
      resp.status(206).json(err);
    }
  }

  //   return orders for delivery
  async getOrdersForDelivery(resp) {
    const closestSunday = DateService.closestUpcomingSunday();
    try {
      const q =
        "Select ot.id,i.Name,h.Quantity,ot.Shipping_Date, ot.Address FROM Order_table ot JOIN Hotel h On ot.id = h.Order_ID JOIN Item i On h.Item_ID = i.Item_ID Where ot.Shipping_date = ? ORDER BY ot.id";
      const [result] = await mysql.query(q, [closestSunday]);
      const temp = {};
      result.forEach((element) => {
        if (temp[element.id]) {
          temp[element.id].meals.push([element.Name, element.Quantity]);
        } else {
          const objToBeAdded = {
            orderNumber: element.id,
            meals: [[element.Name, element.Quantity]],
            dueDate: element.Shipping_Date,
            address: element.Address,
          };
          temp[element.id] = objToBeAdded;
        }
      });
      resp.status(200).json(Object.values(temp));
    } catch (err) {
      resp.status(206).json(err);
    }
  }

  //   return order by number
  async getOrderByNumber(orderNumber, resp) {
    try {
      const q =
        "Select ot.id,i.Name,h.Quantity,ot.Shipping_Date, ot.Address FROM Order_table ot JOIN Hotel h On ot.id = h.Order_ID JOIN Item i On h.Item_ID = i.Item_ID  where ot.id = ? ORDER BY ot.id";
      const [result] = await mysql.query(q, [orderNumber]);
      const temp = {};
      result.forEach((element) => {
        if (temp[element.id]) {
          temp[element.id].meals.push([element.Name, element.Quantity]);
        } else {
          const objToBeAdded = {
            orderNumber: element.id,
            meals: [[element.Name, element.Quantity]],
            dueDate: element.Shipping_Date,
            address: element.Address,
          };
          temp[element.id] = objToBeAdded;
        }
      });
      resp.status(200).json(Object.values(temp));
    } catch (err) {
      console.log("ERR: in Get Order by Number " + err);
      resp.status(206).json(err);
    }
  }

  async deleteOrder(orderNumber, resp) {
    try {
      const q = "Delete from Hotel where Order_ID = ?";
      await mysql.query(q, [orderNumber]);

      const q2 = "Delete from Order_table where id = ?";
      await mysql.query(q2, [orderNumber]);
      resp.status(200).json("ok");
    } catch (err) {
      console.log("ERR: in Delete Function " + err);
      resp.status(206).json(err);
    }
  }
}

module.exports = new Admin();
