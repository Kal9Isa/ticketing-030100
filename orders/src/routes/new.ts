import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@hiroit/common";

// import { Ticket } from "../models/ticket";
import { natsWrapper } from "../nats-wrapper";
// import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .not()
      .isEmpty()
      .isFloat({ gt: 0 })
      .withMessage("Price must be valid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    //   const { title, price } = req.body;
    //   const ticket = Ticket.build({ title, price, userId: req.currentUser!.id });
    //   await ticket.save();
    //   await new TicketCreatedPublisher(natsWrapper.client).publish({
    //     id: ticket.id,
    //     title: ticket.title,
    //     price: ticket.price,
    //     userId: ticket.userId,
    //   });
    //   res.status(201).send(ticket);
  }
);

export { router as createOrderRouter };
