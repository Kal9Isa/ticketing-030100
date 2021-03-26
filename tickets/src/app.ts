import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  requireAuth,
  currentUser,
} from "@kal9isa-tickets/common";

import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";

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

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
