const Patient = require('../models/Patient'); // Import model Patient untuk berinteraksi dengan database

// Mendapatkan semua data pasien
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll(); // Mendapatkan semua pasien dari database
    if (patients.length === 0) { // Jika tidak ada pasien
      return res.status(200).json({ message: "Data is empty" });
    }
    res.status(200).json({ message: "Get All Resource", data: patients }); // Berhasil mendapatkan data pasien
  } catch (error) { // Penanganan error
    res.status(500).json({ message: "Server error", error });
  }
};

// Mendapatkan data pasien berdasarkan ID
exports.getPatientById = async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari parameter
  try {
    const patient = await Patient.findById(id); // Mencari pasien berdasarkan ID
    if (!patient) { // Jika pasien tidak ditemukan
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json({ message: "Get Detail Resource", data: patient }); // Berhasil mendapatkan data pasien
  } catch (error) { // Penanganan error
    res.status(500).json({ message: "Server error", error });
  }
};

// Mencari pasien berdasarkan nama
exports.searchPatientsByName = async (req, res) => {
  const { name } = req.params; // Mendapatkan nama dari parameter
  try {
    const patients = await Patient.findByName(name); // Mencari pasien berdasarkan nama
    if (patients.length === 0) { // Jika tidak ada pasien yang cocok
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json({ message: "Get searched resource", data: patients }); // Berhasil mendapatkan data pasien
  } catch (error) { // Penanganan error
    res.status(500).json({ message: "Server error", error });
  }
};

// Mendapatkan pasien berdasarkan status
exports.getPatientsByStatus = async (req, res) => {
  const { status } = req.params; // Mendapatkan status dari parameter
  try {
    const patients = await Patient.findByStatus(status); // Mencari pasien berdasarkan status
    res.status(200).json({ message: `Get ${status} resource`, total: patients.length, data: patients }); // Berhasil mendapatkan data pasien
  } catch (error) { // Penanganan error
    res.status(500).json({ message: "Server error", error });
  }
};

// Menambahkan data pasien baru
exports.addPatient = async (req, res) => {
  const { name, phone, address, status, in_date_at, out_date_at } = req.body; // Mendapatkan data pasien dari body request
  if (!name || !phone || !address || !status || !in_date_at) { // Validasi input
    return res.status(422).json({ message: "All fields must be filled correctly" });
  }
  try {
    const newPatient = await Patient.create({ name, phone, address, status, in_date_at, out_date_at }); // Menambahkan pasien baru
    res.status(201).json({ message: "Resource is added successfully", data: newPatient }); // Berhasil menambahkan pasien
  } catch (error) { // Penanganan error
    res.status(500).json({ message: "Server error", error });
  }
};

// Menghapus data pasien berdasarkan ID
exports.deletePatient = async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari parameter
  try {
    const result = await Patient.deleteById(id); // Menghapus pasien berdasarkan ID
    if (result.affectedRows === 0) { // Jika pasien tidak ditemukan
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json({ message: "Resource is delete successfully" }); // Berhasil menghapus pasien
  } catch (error) { // Penanganan error
    res.status(500).json({ message: "Server error", error });
  }
};

// Mengupdate data pasien berdasarkan ID
exports.updatePatient = async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari parameter
  const { name, phone, address, status, in_date_at, out_date_at } = req.body; // Mendapatkan data pasien dari body request
  if (!name || !phone || !address || !status || !in_date_at) { // Validasi input
    return res.status(422).json({ message: "All fields must be filled correctly" });
  }
  try {
    const result = await Patient.updateById(id, { name, phone, address, status, in_date_at, out_date_at }); // Mengupdate data pasien
    if (result.affectedRows === 0) { // Jika pasien tidak ditemukan
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json({ message: "Resource is updated successfully", data: { id, name, phone, address, status, in_date_at, out_date_at } }); // Berhasil mengupdate pasien
  } catch (error) { // Penanganan error
    res.status(500).json({ message: "Server error", error });
  }
};
