import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { app } from "../app";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "asdf";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  // Build a JWT payload { id, email }
  const payload = {
    id,
    email: "test@test.com",
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object { jwt: jwt }
  const session = { jwt: token };

  // Make session JSON
  const sessionJSON = JSON.stringify(session);

  // Encode with base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // Return a string with encoded data = cookie
  return [`express:sess=${base64}`];
};
