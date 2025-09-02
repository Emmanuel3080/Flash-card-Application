import express from "express";
import dotenv from "dotenv";
// import connectDb from "./DbConfig/connectDatabase";

const app = express();

dotenv.config();

const portNumber = process.env.PORT;

app.listen(portNumber, () => {
  console.log(`Port is Runnig on http://localhost:${portNumber}`);
});


app.get("/api/v1",(req,res)=>{
    res.send("Welcome Jhorrr")
})


// connectDb()