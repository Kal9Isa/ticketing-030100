import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";

it("Returns a 404 if the provided id does not exist", async () => {
  const id = mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({ title: "test", price: 20 })
    .expect(404);
});

it("Returns a 401 if the user is not authenticated", async () => {
  const id = mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "test", price: 20 })
    .expect(401);
});

it("Returns a 401 if the user does not own the ticket", async () => {});

it("Returns a 400 if the user provides an invalid title ot price", async () => {});

it("Updates the ticket provided valid inputs", async () => {});
