const { Router } = require("express");
const { Admin, Course } = require("../db");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  console.log("admin signup");
  const username = req.body.username;
  const password = req.body.password;

  const admin = new Admin({
    username: username,
    password: password,
  });

  try {
    await admin.save();
    console.log("admin saved");
    res.json(admin);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  console.log("admin course creation");
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
    console.log("course saved");
    res.json(course);
  } catch (err) {
    res.status(404).send({ message: "Error while creating the course" });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic

  console.log("admin fetching all courses");

  try {
    const result = await Course.find();
    res.json(result);
  } catch (err) {
    res.status(404).send({ data: "There was an error while fetching" });
  }
});

module.exports = router;
