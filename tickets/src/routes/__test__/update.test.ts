import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";
import { response } from "express";

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

it("Returns a 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signin())
    .send({ title: "test", price: 20 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "test", price: 30 })
    .expect(401);
});

it("Returns a 400 if the user provides an invalid title ot price", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "test", price: 20 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 30 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "test", price: -30 })
    .expect(400);
});

it("Updates the ticket provided valid inputs", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "test", price: 20 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "newTitle", price: 50 })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send({});

  expect(ticketResponse.body.title).toEqual("newTitle");
  expect(ticketResponse.body.price).toEqual(50);
});
