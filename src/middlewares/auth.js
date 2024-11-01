const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  //Read the token from Request Cookies

  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid!");
    }
    //Validate the token
    const decodedObj = await jwt.verify(token, "Dev@VipVer-28Under$Dev");

    const { _id } = decodedObj;

    //find the user
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

module.exports = {
  userAuth,
};
