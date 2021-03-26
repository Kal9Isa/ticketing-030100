import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@kal9isa-tickets/common";

const app = express();
// Allow Ingress NGINX
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    // No encryption
    signed: false,
    // over HTTPS
    secure: process.env.NODE_ENV !== "test",
  })
);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
