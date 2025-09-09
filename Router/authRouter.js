import express from "express";
import {
  getSingleUser,
  handleLogOut,
  handleSignIn,
  handleSignUP,
  verifyToken,
} from "../Controller/authController.js";
const authRouter = express.Router();

authRouter.post("/signup", handleSignUP);
authRouter.post("/signin", handleSignIn);
authRouter.post("/logout", handleLogOut);
authRouter.get("/user/:id", getSingleUser);

authRouter.post("/verify/token", verifyToken);
export default authRouter;
