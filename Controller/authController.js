import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bycrypt from "bcryptjs";
import userModel from "../Models/userModel.js";

import dotenv from "dotenv";
import blacklistedTokenModel from "../Models/blacklistedToken.js";
dotenv.config();

const handleSignUP = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    //Hash the Password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    const createUserProfile = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });

    const userInfo = {
      id: createUserProfile.id,
      name: createUserProfile.name,
      departmet: createUserProfile.department,
      email: createUserProfile.email,
    };

    if (!createUserProfile) {
      res.status(401).json({
        Message: "Sign Up Failed",
        Status: "Error",
      });
    }

    return res.status(201).json({
      Message: "Sign Up Successful",
      Status: "Success",
      userInfo,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleSignIn = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    //Check if email Exists

    const verifyUser = await userModel.findOne({ email: email });
    if (!verifyUser) {
      res.status(401).json({
        Message: "Email or password Incorrect",
        Status: "Error",
      });
    }

    //Check Password
    // const checkPassword = await userModel.findOne({password : password})
    const checkPassword = await bycrypt.compare(password, verifyUser.password);
    if (!checkPassword) {
      res.status(401).json({
        Message: "Email or passworddddd Incorrect",
        Status: "Error",
      });
    }

    //Generate an access Token using Jwt
    const generateToken = await jwt.sign(
      { userId: verifyUser.id, email: verifyUser.email },
      process.env.jwtToken,
      {
        expiresIn: process.env.tokenExp,
      }
    );

    return res.status(201).json({
      Message: "Sign In Sucessful",
      Status: "Success",
      accesToken: generateToken,
      verifyUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleLogOut = async (req, res) => {
  const { token } = req.body;
  try {
    await blacklistedTokenModel.create({ token });
    return res.status(401).json({     
      Message: "Logout Successfull",
      Status: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};  

export { handleSignUP, handleSignIn, handleLogOut };
