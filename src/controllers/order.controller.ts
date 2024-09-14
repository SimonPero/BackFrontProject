import { NextFunction, Request, Response } from "express";
import { services } from "../utils/serviceContainer";

export default class OrderController {
  async getAllPreviousUserOrders(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let offSet = 10;
      if (req.query.offSet) {
        offSet = parseInt(req.query.offSet as string, 10);
      }
      const user = await services
        .getUserService()
        .getUserByEmail(req.params.email);
      const userOrders = services
        .getOrdersService()
        .getAllUserOrders(user.customerID, offSet);
      res.status(201).json(userOrders);
    } catch (error) {
      next(error);
    }
  }

  async createNewOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { address } = req.body;
      const email = req.params.email;
      const cart = await services.getCartService().getCartByEmail(email);
      const user = await services.getUserService().getUserByEmail(email);
      if (user === null) {
        res.status(404).json({ message: "User Not Found" });
      }
      const order = services
        .getOrdersService()
        .createFinishedOrder(user.customerID, address, cart.items);

      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  async findPreviousOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = parseInt(req.params.orderId);
      const order = await services.getOrdersService().findOrderById(orderId);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
}
