const { Router } = require("express");
const UserController = require("../controllers/UserController");
const userRouter = Router();

userRouter.post("/signin", UserController.handleSignIn);

userRouter.get("/users", UserController.handleGetAllUsers);
userRouter.get("/users/:username", UserController.handleGetUserByUsername);

module.exports = userRouter;