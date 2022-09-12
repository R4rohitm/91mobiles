const bcrypt = require("bcryptjs");
const UserModel = require("../Models/UserModel");

const validateCapitalLetter = (password) => {
  let letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  for (let i = 0; i < password.length; i++) {
    if (letters.includes(password[i])) {
      return true;
    }
  }
  return false;
};

const validateCharacter = (password) => {
  let specialChars = ["!", "#", "$", "%", "&", "(", ")"];
  for (let i = 0; i < password.length; i++) {
    if (specialChars.includes(password[i])) {
      return true;
    }
  }
  return false;
};

const RegisterUser = async (req, res) => {
  let { first_name, last_name, email, password, mobile, role, status } =
    req.body;

  if (password && password.length >= 8) {
    if (validateCapitalLetter(password) && validateCharacter(password)) {
      return res.status(501).json({ message: "Enter A Valid Password" });
    }
  } else {
    return res
      .status(501)
      .json({ message: "Password must be at least 8 characters" });
  }

  password = await bcrypt.hash(password, 10);

  const checkUser = await UserModel.findOne({ email: email });
  if (checkUser) {
    return res.status(501).json({ message: "User Already Exists" });
  } else {
    const user = await UserModel({
      first_name,
      last_name,
      email,
      password,
      mobile,
      role,
      status,
    });

    user.save((err, user) => {
      if (err) return res.status(501).json({ message: err.message });
      else
        return res
          .status(200)
          .json({ message: "Account successfully created" });
    });
  }
};

const EditUser = async (req, res) => {
  let { first_name, last_name, email, mobile, password } = req.body;
  const { userid: _id } = req.body;
  if (!_id) {
    return res.status(501).json({ message: "Wrong User ID" });
  }
  if (password && password.length >= 8) {
    if (validateCapitalLetter(password) && validateCharacter(password)) {
      return res.status(501).json({ message: "Enter A Valid Password" });
    }
  } else {
    return res
      .status(501)
      .json({ message: "Password must be at least 8 characters" });
  }

  password = await bcrypt.hash(password, 10);
  UserModel.findByIdAndUpdate(
    _id,
    {
      first_name,
      last_name,
      email,
      mobile,
      password,
    },
    async (err, user) => {
      if (err) {
        return res.status(501).json({ message: "Something went wrong" });
      } else {
        const data = await UserModel.findOne({ email: user.email });
        return res
          .status(200)
          .json({ message: "User updated successfully", user: data });
      }
    }
  );
};

module.exports = { RegisterUser, EditUser };
