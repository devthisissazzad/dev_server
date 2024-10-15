import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import colors from "colors";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));
app.use(cookieParser());

// routes

export default app;
