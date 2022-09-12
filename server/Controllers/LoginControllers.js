const UsersModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = "WTFAUTH";

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  let validPassword;

  if (!email) {
    return res.status(501).json({ message: "Email is not specified" });
  }
  const user = await UsersModel.findOne({ email: email });
  if (!user) {
    return res.status(501).json({ message: "Email is not Registered" });
  } else {
    validPassword = await bcrypt.compare(password, user.password);
  }

  if (validPassword) {
    const token = jwt.sign({ id: user._id, email: user.email }, secret, {
      expiresIn: "30d",
    });

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + 60 * 1000 * 4),
      })
      .status(200)
      .json({
        status: 200,
        token: token,
        userid: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        mobile: user.mobile,
        email: user.email,
        message: "Logged in Successfully",
      });
  } else {
    return res.status(501).json({ message: "Invalid Login Details" });
  }
};

const LoginUserWithToken = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log(req.headers);
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Forbidden" });
  } else {
    const decodedToken = jwt.verify(token, secret);
    if (decodedToken) {
      const user = await UsersModel.findOne({ email: decodedToken.email });
      const { first_name, last_name, mobile, email } = user;
      return res.status(200).json({
        message: "Logged In Successfully",
        user: { first_name, last_name, mobile, email },
      });
    } else {
      return res.status(401).json({ message: "Forbidden" });
    }
  }
};

module.exports = { LoginUser, LoginUserWithToken };
