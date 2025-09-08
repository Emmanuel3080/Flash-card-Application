import express from "express";
import {
  getSingleUser,
  handleLogOut,
  handleSignIn,
  handleSignUP,
} from "../Controller/authController.js";
const authRouter = express.Router();

authRouter.post("/signup", handleSignUP);
authRouter.post("/signin", handleSignIn);
authRouter.post("/logout", handleLogOut);
authRouter.get("/user/:id", getSingleUser);
export default authRouter;
