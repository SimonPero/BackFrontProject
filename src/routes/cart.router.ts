import { Router } from "express";
import CartController from "../controllers/cart.controller";
const cartController = new CartController();
const cartRouter = Router();


cartRouter.get("/getCart/:CustomerID", cartController.getCartById)
cartRouter.post("/addToCart", cartController.addItemToCart)

export default cartRouter