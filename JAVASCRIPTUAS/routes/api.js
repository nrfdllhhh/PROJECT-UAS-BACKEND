const express = require('express');
const router = express.Router();
const patientController = require('../controllers/PatientController');

router.get('/patients', patientController.getAllPatients);
router.get('/patients/:id', patientController.getPatientById);
router.get('/patients/search/:name', patientController.searchPatientsByName);
router.get('/patients/status/:status', patientController.getPatientsByStatus);
router.post('/patients', patientController.addPatient);
router.put('/patients/:id', patientController.updatePatient);
router.delete('/patients/:id', patientController.deletePatient);

module.exports = router;