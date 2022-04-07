import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import LOGIN_ROUTE from "./Routes/login.js";
import REGISTER_ROUTE from "./Routes/register.js";
import ABOUT_ROUTE from './Routes/about.js';

const app = express();
dotenv.config({ path : './config.env' });

app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  })
);
app.use(
  bodyParser.json({
    limit: "30mb",
    extended: true,
  })
);
app.use(cors());

const MONGO_URI = process.env.DATABASE;  
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server up and running on http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/", LOGIN_ROUTE);
app.use("/", REGISTER_ROUTE);
app.use("/", ABOUT_ROUTE);