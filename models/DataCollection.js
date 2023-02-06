const mysql = require("../config/db");
class DataCollection {
  async addReferral({ url }, response) {
    try {
      const q = "INSERT INTO TrafficTrack (referral) VALUES (?)";
      const [result] = await mysql.query(q, [url]);
      response.status(200).json(result.insertId);
    } catch (err) {
      response.status(501).json(err.sqlMessage);
    }
  }



  async addUnprocessedMeals({ zipcode, planSize, mealsAndFreqs }, response) {
    try {
      const q = "INSERT INTO UnprocessedMeals (zipcode,planSize,meals) VALUES (?,?,?)";
      const [result] = await mysql.query(q, [zipcode,planSize,JSON.stringify(mealsAndFreqs)]);
      response.status(200).json("Success");
    } catch (err) {
      response.status(501).json("Failed");
    }
  }

  async addZipCode({ zipcode}, response) {
    try {
      const q = "INSERT INTO ZipCodeTracker (zipcode) VALUES (?)";
      const [result] = await mysql.query(q, [zipcode]);
      response.status(200).json("Success");
    } catch (err) {
      response.status(501).json("Failed");
    }
  }
}

module.exports = new DataCollection();
