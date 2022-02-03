const jwt = require("jsonwebtoken");
const User = require("../models/users");

module.exports.register = async ({ body: { email, password } }, res) => {
  try {
    if (!email || !password) return res.sendStatus(400);
    let oldUser = await User.findOne({ email }).catch((err) => {
      console.error(err);
    });
    if (oldUser)
      return res.status(409).json({ status: 409, message: "Already Exists" });
    let user = new User({ email });
    user.setPassword(password);
    let validationError = false;
    await user.save().catch((err) => {
      validationError = true;
      return res.sendStatus(401);
    });
    if (!validationError)
      return res.json({
        status: 201,
        message: "User Created",
        access_token: user.generateJWT(),
      });
  } catch (e) {
    return res.sendStatus(500);
  }
};
module.exports.login = async ({ body: { email, password } }, res) => {
  try {
    if (!email || !password) return res.sendStatus(400);
    let user = await User.findOne({ email }).catch((err) => console.error(err));

    if (user && user.validatePassword(password))
      return res.json({
        status: 200,
        message: "User Logged In",
        access_token: user.generateJWT(),
      });
    return res.status(401).send(null);
  } catch (err) {
    return res.sendStatus(500);
  }
};
module.exports.me = async (req, res) => {
  try {
    if (!req.user.isAuthenticated) {
      res.sendStatus(401);
      return;
    }
    let user = req.user.data;
    res.json({
      email: user.email,
      name: user.name,
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};
