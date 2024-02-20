const { Router } = require("express");
const app = require("../../01-middlewares/01-requestcount");
const { User, Course } = require("../db");
const router = Router();
const userMiddleware = require("../middleware/user");

// app.use(express.json());

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  const user = new User({ username: username, password: password });

  try {
    await user.save();
    res.json(user);
  } catch (e) {
    res.status(404).send({ message: "Error saving user" });
  }
});

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  console.log("User fetching courses");

  try {
    const result = await Course.find();
    res.json(result);
  } catch (err) {
    res.status(404).send({ data: "There was an error while fetching" });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  console.log("User fetching courses by ID");
  const courseId = req.params.courseId;

  const username = req.headers.username;
  try {
    const result = await User.updateOne(
      { username: username },
      { $push: { purchasedCourses: courseId } }
    );
  
    console.log("Update result:", result);
  
    if (result.nModified === 1) {
      res.json("success");
    } else {
      res.status(404).send({ message: "Purchase failed: User not found or course already purchased" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
    
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  console.log("User fetching purchased courses");

  const username = req.headers.username;
  const password = req.headers.password;

  try {
    const result = await User.findOne({
      username: username,
      password: password,
    });
    console.log(result);
    res.json(result.purchasedCourses);
  } catch (e) {
    res.status(404).send({ message: "Unable to fetch the courses" });
  }
});

module.exports = router;
