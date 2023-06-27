import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongodbConnection from "./database/mongodbConnection.js";
import router from "./routes/route.js";

//configing the dotenv
dotenv.config();

//establishing mongodb commection
mongodbConnection();

//rest object
const app = express();

//now adding the middlewares
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

//adding the middleware for route
app.use("/", router);

//creating a variable with name PORT and get the port number from .env
const PORT = process.env.PORT || 8000;

//listen server
app.listen(PORT, () => {
  console.log(`Server is running successfully on PORT ${PORT}`);
});
