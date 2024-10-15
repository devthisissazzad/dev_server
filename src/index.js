import dotenv from "dotenv";
import { dbConnect } from "./dbConnect/dbConnect.js";
import app from "./app.js";

dotenv.config({
  path: ".env",
});

dbConnect()
  .then(() => {
    app.listen(9000, () => {
      console.log(
        `server is running PORT : ${process.env.PORT || 9000}`.bgMagenta.white
          .bold
      );
    });
  })
  .catch((error) => console.log(`${error?.message}`.bgRed.white.bold));
