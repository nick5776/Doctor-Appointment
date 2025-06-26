const express = require("express");
const mongoose = require("mongoose");

const {getAllUsersController, getAllDoctorsController, changeAccountStatusController} = require("../controllers/adminController");
const { checkForAuthentication } = require("../middlewares/authentication");

const { Router } = require("express");


const router = Router();

router.get("/getAllUsers", getAllUsersController); // checkForAuthentication is causing some errors which i am unable to resolve

router.get("/getAllDoctors", getAllDoctorsController); // checkForAuthentication is causing some errors which i am unable to resolve

router.post("/changeAccountStatus", changeAccountStatusController)
module.exports = router;
