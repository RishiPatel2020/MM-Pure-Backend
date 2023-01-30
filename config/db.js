require("dotenv").config();
const mysql = require("mysql");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER /* MySQL User */,
    password: process.env.DB_PASSWORD /* MySQL Password */,
    database: process.env.DB_NAME /* MySQL Database */,
  });;


module.exports = pool; 