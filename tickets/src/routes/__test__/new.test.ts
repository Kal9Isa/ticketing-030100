import request from "supertest";
import { app } from "../../app";

it("As a route handler listening to /api/tickets for POST requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});
it("Can only be accessed if the user is signed in", async () => {});
it("Returns an error is an invalid title or price is provided", async () => {});
it("Creates a ticket with valid parameters", async () => {});
