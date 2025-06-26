require("dotenv").config(); //always on top

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const cors=require("cors");
const path = require("path");

const userRoute = require("./routes/userRoutes");
const adminRoute = require("./routes/adminRoutes");
const doctorRoute = require("./routes/doctorRoutes");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); //parse incoming HTML form 
app.use(express.json()); //parse incoming json payloads
app.use(cors());

app.use(express.static(path.join(__dirname,"./client/build")));
app.get("*", function(req,res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"))
});

app.get("/" , (req,res)=>{
    return res.status(200).send("Hey Welcome!!");
});

const PORT = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("MongoDB Connected"));

app.use("/api/v1/user",userRoute); 
app.use("/api/v1/admin",adminRoute); 
app.use("/api/v1/doctor",doctorRoute); 

app.listen(PORT, ()=> console.log(`Server started at Port : ${PORT}`));