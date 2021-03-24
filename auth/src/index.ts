import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  // Check for ENV varibales on startup
  if (!process.env.JWT_KEY) {
    throw new Error("JWT key must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
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
