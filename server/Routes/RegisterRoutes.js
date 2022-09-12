const { Router } = require("express");
const RegisterRoutes = Router();
const {
  RegisterUser,
  EditUser,
} = require("../Controllers/RegistrationControllers");

RegisterRoutes.post("/", RegisterUser);

RegisterRoutes.put("/edit", EditUser);

module.exports = RegisterRoutes;
