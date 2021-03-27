import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("Lost connection to NATS");
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    // ACK message manually in the code, if no ACK in 30s retries sending event
    .setManualAckMode(true)
    // Send all relevant messages at service startup
    .setDeliverAllAvailable()
    // Send all non-processed messages at service startup
    .setDurableName("orders-srv");

  const subscription = stan.subscribe(
    "ticket:created",
    "orders-srv-qgrp",
    options
  );

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received msg: #${msg.getSequence()}`);
      console.log(`Data-#${msg.getSequence()}: ${data}`);
    }
    msg.ack();
  });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
