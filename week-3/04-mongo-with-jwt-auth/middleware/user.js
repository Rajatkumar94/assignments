const jwt = require("jsonwebtoken");
function userMiddleware(req, res, next) {
  console.log("user middleware");
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization;
  const words = token.split(" ");
  const jwtToken = words[1];

  try {
    const verifiedToken = jwt.verify(jwtToken, "jwt-secret");
    next();
  } catch (err) {
    res.status(404).send({ message: "failed to verify" });
  }
}

module.exports = userMiddleware;
