import { Router } from "express";
import CartController from "../controllers/cart.controller";
const cartController = new CartController();
const cartRouter = Router();


cartRouter.get("/getCart/:id", cartController.getCartById)

export default cartRouter