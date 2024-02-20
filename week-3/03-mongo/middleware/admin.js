// const { Admin } = require("../db");
// const mongoose = require("mongoose");

// mongoose.connect(
//   "mongodb+srv://admin-second:hKAOQmInAhr7qZ0E@cluster0.qzvh3ot.mongodb.net/MongoDB",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

// async function adminMiddleware(req, res, next) {
//   const db = mongoose.connection;
//   const username = req.headers.username;
//   const password = req.headers.password;

//   console.log("admin middleware", username, password);

//   try {
//     const foundUser = await Admin.findOne({
//       username: username,
//       password: password,
//     });

//     console.log("found user", foundUser);
//     next();
//   } catch (err) {
//     res.status(404).send({ message: "Error in middleware" });
//   } finally {
//     await db.close();
//   }
// }
// // // Middleware for handling auth
// // async function adminMiddleware(req, res, next) {
// //   // Implement admin auth logic
// //   // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
// //   const headers = req.query.headers;
// //   const user = req.headers.username;
// //   const pass = req.headers.password;

// //   console.log(user, pass, headers);
// //   try {
// //     console.log(await Admin.find());
// //     const admin = await Admin.findOne({
// //       username: user,
// //       password: pass,
// //     });
// //     console.log(admin);
// //     if (admin) {
// //       console.log("Admin found", admin);
// //       next();
// //     } else {
// //       console.log("Admin not found", admin);
// //       res.status(404).send({ message: "Invalid username or password" });
// //     }
// //   } catch (err) {
// //     console.error("Error while searching:", err);
// //     res.status(500).send({ message: "Error while searching" });
// //   }
// // }

// module.exports = adminMiddleware;

const { Admin } = require("../db");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin-second:hKAOQmInAhr7qZ0E@cluster0.qzvh3ot.mongodb.net/MongoDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function adminMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  console.log("admin middleware", username, password);

  try {
    const foundUser = await Admin.findOne({
      username: username,
      password: password,
    });

    console.log("found user", foundUser);

    // Check if user is found
    if (foundUser) {
      // If user found, pass control to the next middleware
      next();
    } else {
      // If user not found, return error response
      res.status(404).send({ message: "Invalid username or password" });
    }
  } catch (err) {
    // Handle errors
    console.error("Error in middleware:", err);
    res.status(500).send({ message: "Error in middleware" });
  }
}

module.exports = adminMiddleware;
