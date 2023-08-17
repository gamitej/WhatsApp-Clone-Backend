const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../../modals/User");
const { EncodeData, CompareEncodedData } = require("../../utils/hashFunc");

// ================= LOGIN ===================
router.post("/login", async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;
    console.log(username);

    // Validate user input
    if (!(username && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ username });

    if (user && (await CompareEncodedData(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

// ================ REGISTER ===================
router.post("/register", async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(password && username)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist & Validate if user exist in our database
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await EncodeData(password);

    // Create user in our database
    const user = await User.create({
      username: username,
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "60h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
