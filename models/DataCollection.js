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
}

module.exports = new DataCollection();
