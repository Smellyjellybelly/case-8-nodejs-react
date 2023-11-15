const { Router } = require("express");
const UserController = require("../controllers/UserController");
const userRouter = Router();

userRouter.get("/signin", UserController.handleSignIn);

userRouter.get("/users", UserController.handleGetAllUsers);
userRouter.get("/users/:name", UserController.handleGetUserByUsername);

module.exports = userRouter;