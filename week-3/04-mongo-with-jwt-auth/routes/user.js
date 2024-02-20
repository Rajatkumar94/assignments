const { Router } = require("express");
const { User, Course } = require("../db");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic

  const username = req.body.username;
  const password = req.body.password;

  const user = new User({ username, password });

  try {
    await user.save();
    res.json({ message: "User created successfully" });
  } catch (err) {
    res.status(404).send({ message: "try again later" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  console.log("user signin");

  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({ username: username, password: password });
    if (user) {
      const token = jwt.sign({ username: username }, "jwt-secret");
      res.json({ token: token });
    } else {
      res.status(404).send({ message: "Please sign up first" });
    }
  } catch (err) {
    res.status(404).send({ message: "try again later" });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  try {
    const courses = await Course.find();
    res.json({ courses: courses });
  } catch (err) {
    res.status(500).send({ message: "Error getting courses" });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const id = req.params.courseId;
  const token = req.headers.authorization; // bearer token
  const words = token.split(" "); // ["Bearer", "token"]
  const jwtToken = words[1];

  try {
    const username = jwt.decode(jwtToken).username;

    console.log("user name: " + username, id);
    const course = await Course.findById(id);
    console.log(course);

    if (course) {
      await User.updateOne(
        { username: username },
        { $push: { purchasedCourses: id } }
      );

      res.send({ message: "Course purchased successfully" });
    } else {
      res.status(404).send({ message: "Course does not exists!!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  console.log("Purchased courses");
  const token = req.headers.authorization; // bearer token
  const words = token.split(" "); // ["Bearer", "token"]
  const jwtToken = words[1];

  try {
    const username = jwt.decode(jwtToken).username;

    const user = await User.findOne({ username: username });

    const courses = await Course.find({
      _id: {
        $in: user.purchasedCourses,
      },
    });

    console.log(courses)

    res.json(courses);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
