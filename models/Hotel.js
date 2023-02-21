const mysql = require("../config/db").default;

class Hotel {
  // ADD (OrderID, itemId, quantity) in Hotel table

  // CANNOT have any kind of error
  add(orderId, itemAndquantity) {
    try {
      itemAndquantity.map((item) => {
        const q =
          "INSERT INTO Hotel (Order_ID, Item_ID, Quantity) VALUES (?,?,?)";
        mysql.query(q, [orderId, item[0], item[1]], (err, res) => {
          // Handle this
          if (err) {
            return false;
          }
        });
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  // PREPARES TABLE 2
  async getOrdersTable(date, resp) {
    try {
      const q =
        "Select ot.id,i.Name,h.Quantity,ot.Shipping_Date FROM Order_table ot JOIN Hotel h On ot.id = h.Order_ID JOIN Item i On h.Item_ID = i.Item_ID Where ot.Shipping_date = ? ORDER BY ot.Order_date";
      const [result] = await mysql.query(q, [date]);
      const temp = {};
      result.forEach((element) => {
        if (temp[element.id]) {
          temp[element.id].meals.push([element.Name, element.Quantity]);
        } else {
          const objToBeAdded = {
            orderNumber: element.id,
            meals: [[element.Name, element.Quantity]],
            dueDate: element.Shipping_Date,
          };
          temp[element.id] = objToBeAdded;
        }
      });
      resp.status(200).json(Object.values(temp));
    } catch (err) {
      resp.status(206).json(err);
    }
  }

  // PREPARES TABLE 1
  async getMealQuantityTable(date, resp) {
    try {
      const q =
        "Select  Hotel.Item_ID as item_id, sum(Hotel.Quantity) as Total_Quantity From Order_table ot JOIN Hotel on ot.id = Hotel.Order_Id Where ot.Shipping_date = ? Group By Item_ID";
      const [result] = await mysql.query(q, [date]);
      resp.status(200).json(result);
    } catch (err) {
      resp.status(206).json(err);
    }
  }
}

module.exports = new Hotel();
