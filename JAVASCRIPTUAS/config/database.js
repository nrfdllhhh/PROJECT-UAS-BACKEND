// import mysql
const mysql = require("mysql");

// import dotenv dan menjalankan method config
require("dotenv").config();

// destructuring object process.env
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

// Membuat koneksi database menggunakan method createConnection
const db = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT, // Tambahkan port
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

// Menghubungkan ke database menggunakan method connect
db.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected to database");
});

module.exports = db;
