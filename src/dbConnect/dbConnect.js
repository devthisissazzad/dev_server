import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(
      `${process.env.DB_URI}/dev_database`
    );
    if (connect.connection) {
      console.log(
        `dbConnect Success:${connect.connection.host}`.bgCyan.black.bold
      );
    }
  } catch (error) {
    console.log(`dbConnect Error:${error?.message}`.bgRed.white.bold);
  }
};
