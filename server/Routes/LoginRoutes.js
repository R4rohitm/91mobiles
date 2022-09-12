const { Router } = require("express");
const {
  LoginUser,
  LoginUserWithToken,
} = require("../Controllers/LoginControllers");

const LoginRoutes = Router();

LoginRoutes.post("/", LoginUser);

LoginRoutes.get("/", LoginUserWithToken);

module.exports = LoginRoutes;
