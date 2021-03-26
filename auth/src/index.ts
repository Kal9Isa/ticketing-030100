import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  // Check for ENV varibales on startup
  if (!process.env.JWT_KEY) {
    throw new Error("JWT key must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("Mongo URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log(">>> Listening now on 3000!");
  });
};

start();
