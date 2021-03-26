import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@kal9isa-tickets/common";

const router = express.Router();

router.post(
  "/api/tickets",
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
    res.sendStatus(200);
  }
);

export { router as createTicketRouter };