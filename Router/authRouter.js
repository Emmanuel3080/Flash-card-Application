import express from "express";
import {
  handleLogOut,
  handleSignIn,
  handleSignUP,
} from "../Controller/authController.js";
const authRouter = express.Router();

authRouter.post("/signup", handleSignUP);
authRouter.post("/signin", handleSignIn);
authRouter.post("/logout", handleLogOut);

export default authRouter;
