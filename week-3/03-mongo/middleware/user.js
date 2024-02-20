const { User } = require("../db");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

  // const username = req.headers.username;
  // const password = req.headers.password;

  // try {
  //   await User.findOne({ username: username, password: password });
  //   next();
  // } catch (err) {
  //   res.status(404).send({ message: "User does not exist" });
  // }

  const { username, password } = req.headers;
  console.log("Request Headers - Username:", username, "Password:", password);

  try {
    // Query the database for the user based on username
    const user = await User.findOne({ username });
    console.log("User found in database:", user);

    if (!user) {
      // If user is not found, respond with error
      console.log("User not found in database");
      return res.status(404).send({ message: "User does not exist" });
    }

    // Validate password (replace with appropriate password hashing and comparison logic)
    if (user.password !== password) {
      // If password does not match, respond with error
      console.log("Invalid password");
      return res.status(401).send({ message: "Invalid password" });
    }

    // If user and password are validated, call next() to proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If an error occurs during database query, respond with error
    console.error("Error during user authentication:", err);
    res.status(500).send({ message: "Internal server error" });
  }
}

module.exports = userMiddleware;
