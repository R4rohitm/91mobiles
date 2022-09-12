const UsersModel = require("../Models/UserModel");

const GetUsers = async (req, res) => {
  const query = req.query;
  // console.log(query);

  const users = await UsersModel.find({ query });
  if (users) {
    return res.status(200).json({ users: users });
  } else {
    return res.status(501).json({ message: "No users found" });
  }
};

module.exports = { GetUsers };
