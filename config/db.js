// require("dotenv").config();
const mysql = require("mysql2");

// const pool = mysql.createPool({
//     // host: process.env.DB_HOST,
//     // user: process.env.DB_USER /* MySQL User */,
//     // password: process.env.DB_PASSWORD /* MySQL Password */,
//     // database: process.env.DB_NAME /* MySQL Database */,
//     host: "containers-us-west-186.railway.app",
//     user: "root" /* MySQL User */,
//     password: "Jnna6d0hSQ7oum5GK6WR" /* MySQL Password */,
//     database: "railway" /* MySQL Database */,
//     port:"6748"
//   });;


const pool = mysql.createPool({
  host: "containers-us-west-186.railway.app",
  user: "root",
  password: "Jnna6d0hSQ7oum5GK6WR",
  database: "railway",
  port:"6748"
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database: ', err.stack);
    return;
  }

  console.log('Connected to database as id ', connection.threadId);
  // connection.release();
});

module.exports = pool.promise(); 