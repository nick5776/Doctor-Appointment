const express = require("express");
const mongoose = require("mongoose");

const { Router } = require("express");
const { registerController, loginController, authController, applyDoctorController,getAllNotificationController, deleteAllNotificationController
,getAllDocotrsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController } = require("../controllers/userController");
const { checkForAuthentication } = require("../middlewares/authentication");


const router = Router();

router.post("/register",registerController); //signup

router.post("/login",loginController) //signin

router.post("/getUserData", checkForAuthentication, authController);

router.post("/apply-doctor", checkForAuthentication, applyDoctorController);

router.post("/get-all-notification", checkForAuthentication, getAllNotificationController);

router.post("/delete-all-notification", checkForAuthentication, deleteAllNotificationController);

router.get("/getAllDoctors", getAllDocotrsController); //checkForAuthentication ki wjh se fail hora h 

router.post("/book-appointment", checkForAuthentication, bookAppointmentController)

router.post("/booking-availability", bookingAvailabilityController);

router.post("/user-appointments" , userAppointmentsController);

module.exports = router;

