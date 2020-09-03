import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log("In error middleware ", error);
  res.status(error.statusCode).send(error.message);
});

mongoose
  .connect(process.env.CONNECTION_STRING, { useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to a server!");
    app.listen(4000);
  })
  .catch((error) => {
    console.log(error);
  });
