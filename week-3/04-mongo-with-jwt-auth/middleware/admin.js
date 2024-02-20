const jwt = require("jsonwebtoken");

// Middleware for handling auth

const JWT_SECRET = "jwt-secret";
function adminMiddleware(req, res, next) {
  console.log("admin middleware");
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization; // bearer token
  const words = token.split(" "); // ["Bearer", "token"]
  const jwtToken = words[1]; // token
  console.log("token", jwtToken); //

  try {
    const verifiedToken = jwt.verify(jwtToken, "jwt-secret");
    console.log("verified token", verifiedToken);
    next();
  } catch (err) {
    console.log(err.message);
    res.status(404).send({ message: "failed to validate" });
  }
}

module.exports = adminMiddleware;
