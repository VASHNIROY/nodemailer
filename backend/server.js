import express from "express";
import dotenv from "dotenv";
import emailRoutes from "./routes/emailRoutes.js";

const app = express();
dotenv.config();

import cors from "cors";

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors()); // Use this after the variable declaration

app.use(express.json()); // tell the server to accept the json data from frontend

//Signup and login
app.use("/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
