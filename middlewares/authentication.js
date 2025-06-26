const JWT = require("jsonwebtoken");

// when you will be accessing profile route it will check whether you have token in cookie or not
// agr h toh jane dega wrna nhi jane dega

const checkForAuthentication = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "Auth Fialed",
          success: false,
        });
      } else {
        req.body.userId = decode.id; //sign krte wqt id use kiya na ki _id
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};

// const isAdmin = async (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(401).send({
//       success: false,
//       message: "admin only",
//     });
//   }
//   next();
// };
//const jwt = require("jsonwebtoken");

// const checkForAuthentication = async (req, res, next) => {
//   try {
//     const authHeader = req.headers["authorization"];
//     // console.log("👉 authHeader:", authHeader);
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       console.log("❗ Missing or malformed header");
//       return res.status(401).send({
//         success: false,
//         message: "No token provided or header invalid",
//       });
//     }

//     const token = authHeader.split(" ")[1];
//     //console.log("🔑 token:", token);

//     JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         console.log("❌ JWT verify error:", err.message);
//         return res.status(401).send({
//           success: false,
//           message: "Auth Failed",
//         });
//       }
//       console.log("✅ JWT verified. decoded:", decoded);
      
//       req.userId = decoded.id;  // Support GET routes
//       next();
//     });
//   } catch (error) {
//     console.log("🚨 Middleware crash error:", error);
//     res.status(401).send({
//       success: false,
//       message: "Auth Failed",
//     });
//   }
// };

module.exports = {
  checkForAuthentication,
  //isAdmin,
};