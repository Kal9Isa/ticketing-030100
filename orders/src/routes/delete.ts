import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from "@hiroit/common";

// import { Ticket } from "../models/ticket";
// import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .not()
      .isEmpty()
      .isFloat({ gt: 0 })
      .withMessage("Price should exist and ne greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // const ticket = await Ticket.findById(req.params.id);
    // if (!ticket) {
    //   throw new NotFoundError();
    // }
    // if (ticket.userId !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }
    // ticket.set({ title: req.body.title, price: req.body.price });
    // await ticket.save();
    // new TicketUpdatedPublisher(natsWrapper.client).publish({
    //   id: ticket.id,
    //   title: ticket.title,
    //   price: ticket.price,
    //   userId: ticket.userId,
    // });
    // res.send(ticket);
  }
);

export { router as deleteOrderRouter };
