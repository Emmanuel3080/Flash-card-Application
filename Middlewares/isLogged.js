import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import userModel from "../Models/userModel.js";
import blacklistedTokenModel from "../Models/blacklistedToken.js";
dotenv.config();
const isLogged = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        Message: "Login First, Token Not Found",
      });
    }

    //Check if token has been blacklisted

    const checkBlackListedToken = await blacklistedTokenModel.findOne({
      token,
    });
    if (checkBlackListedToken) {
      return res.status(401).json({
        Message: "Token has been blacklisted",
        Status: "Error",
      });
    }
    const { userId } = await jwt.verify(token, process.env.jwtToken);

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(401).json({
        Message: "User Not Found",
        Status: "Error",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
  }
};

export { isLogged };
