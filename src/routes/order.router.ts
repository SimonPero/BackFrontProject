import { Router } from "express";
import authenticateJWT from "../middlewares/auth";
import OrderController from "../controllers/order.controller";
const orderRouter = Router();
const orderController = new OrderController();
orderRouter.get(
  "/allPreviousOrders/:email",
  authenticateJWT,
  orderController.getAllPreviousUserOrders
);
orderRouter.post(
  "/createNewOrder/:email",
  authenticateJWT,
  orderController.createNewOrder
);
orderRouter.get("/previousOrder/:orderId", authenticateJWT, orderController.findPreviousOrder);
