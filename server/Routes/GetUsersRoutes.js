const { Router } = require("express");
const GetUsersRoutes = Router();
const { GetUsers } = require("../Controllers/GetUsersControllers");

GetUsersRoutes.get("/", GetUsers);

module.exports = GetUsersRoutes;
