const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User, Course } = require("../db");
const jwt = require("jsonwebtoken");
// const {JWT_SECRET} = require("../config")
const router = Router();

const JWT_SECRET = "jwt-secret";

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic

  console.log("admin signup");

  const username = req.body.username;
  const password = req.body.password;

  const admin = new Admin({ username: username, password: password });

  try {
    await admin.save();
    res.json({ success: true, message: "Admin created successfully" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error creating admin" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic

  console.log("admin signin");

  const user = req.body.username;
  const pass = req.body.password;

  console.log(user, pass);

  const adminUser = await Admin.findOne({
    username: user,
  });

  console.log(adminUser);

  if (adminUser) {
    const token = jwt.sign({ username: user }, "jwt-secret");
    res.json({ success: true, token: token });
  } else {
    res.json({ success: false, message: "Please sign up" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic

  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  const course = new Course({
    title: title,
    description: description,
    imageLink: imageLink,
    price: price,
  });

  try {
    await course.save();
    console.log("Course creation");
    res.json({ message: "Course saved successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(404).send({ message: "Error saving Course" });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic

  try {
    const courses = await Course.find();
    res.json({ courses: courses });
  } catch (err) {
    res.status(500).send({ message: "Error getting courses" });
  }
});

module.exports = router;
