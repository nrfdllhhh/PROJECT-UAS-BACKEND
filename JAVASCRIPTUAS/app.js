const express = require('express');
const dotenv = require('dotenv');
const patientRoutes = require('./routes/api');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', patientRoutes);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});