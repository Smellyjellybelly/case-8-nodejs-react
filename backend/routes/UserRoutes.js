const { Router } = require("express");
const UserController = require("../controllers/UserController");
const userRouter = Router();


userRouter.get("/users", UserController.handleGetAllUsers);
userRouter.get("/users/:username", UserController.handleGetUserByUsername);
userRouter.get("/signin", UserController.handleSignIn);

module.exports = userRouter;