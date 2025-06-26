const express = require("express");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
} = require("../controllers/doctorController");
const { checkForAuthentication } = require("../middlewares/authentication");
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getDoctorInfo",checkForAuthentication, getDoctorInfoController); // not sure why did we use post instead of get, he said we need to pass auth middleware

// //POST UPDATE PROFILE
router.post("/updateProfile", checkForAuthentication, updateProfileController);

// //POST  GET SINGLE DOC INFO
router.post("/getDoctorById", checkForAuthentication, getDoctorByIdController);

// //GET Appointments
router.post("/doctor-appointments",checkForAuthentication, doctorAppointmentsController);

// //POST Update Status
router.post("/update-status", checkForAuthentication, updateStatusController);

module.exports = router;