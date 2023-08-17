const router = require("express").Router();

// user login
router.post("/", (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }

    return res.status(401).json("done");
  } catch (error) {
    res.send("does not exist");
  }
});

// user register
router.post("/register", (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }
    res.status(401);
    throw new Error("done");
  } catch (error) {
    res.send("does not exist");
  }
});

module.exports = router;
