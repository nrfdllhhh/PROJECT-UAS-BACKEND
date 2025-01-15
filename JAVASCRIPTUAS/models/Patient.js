const db = require('../config/database'); // Import konfigurasi database

class Patient {
  // Mendapatkan semua data pasien
  static findAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients"; // Query untuk mendapatkan semua pasien
      db.query(sql, (err, results) => {
        if (err) return reject(err); // Menangani error
        resolve(results); // Mengembalikan hasil
      });
    });
  }

  // Mencari pasien berdasarkan nama
  static findByName(name) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE name LIKE ?"; // Query dengan pencocokan pola nama
      db.query(sql, [`%${name}%`], (err, results) => {
        if (err) return reject(err); // Menangani error
        resolve(results); // Mengembalikan hasil
      });
    });
  }

  // Mencari pasien berdasarkan status
  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE status = ?"; // Query untuk mencari pasien dengan status tertentu
      db.query(sql, [status], (err, results) => {
        if (err) return reject(err); // Menangani error
        resolve(results); // Mengembalikan hasil
      });
    });
  }

  // Mencari pasien berdasarkan ID
  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE id = ?"; // Query untuk mencari pasien dengan ID tertentu
      db.query(sql, [id], (err, results) => {
        if (err) return reject(err); // Menangani error
        resolve(results[0]); // Mengembalikan hasil pertama (karena ID unik)
      });
    });
  }

  // Menambahkan data pasien baru
  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO patients (name, phone, address, status, in_date_at, out_date_at) VALUES (?, ?, ?, ?, ?, ?)`; // Query untuk insert data
      db.query(
        sql,
        [data.name, data.phone, data.address, data.status, data.in_date_at, data.out_date_at],
        (err, result) => {
          if (err) return reject(err); // Menangani error
          resolve(result); // Mengembalikan hasil
        }
      );
    });
  }

  // Menghapus data pasien berdasarkan ID
  static deleteById(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM patients WHERE id = ?"; // Query untuk menghapus data berdasarkan ID
      db.query(sql, [id], (err, result) => {
        if (err) return reject(err); // Menangani error
        resolve(result); // Mengembalikan hasil
      });
    });
  }

  // Mengupdate data pasien berdasarkan ID
  static updateById(id, data) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE patients SET name = ?, phone = ?, address = ?, status = ?, in_date_at = ?, out_date_at = ? WHERE id = ?`; // Query untuk update data
      db.query(
        sql,
        [data.name, data.phone, data.address, data.status, data.in_date_at, data.out_date_at, id],
        (err, result) => {
          if (err) return reject(err); // Menangani error
          resolve(result); // Mengembalikan hasil
        }
      );
    });
  }
}

module.exports = Patient; // Mengekspor class Patient untuk digunakan di file lain
