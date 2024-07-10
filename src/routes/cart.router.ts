import { Router } from "express";
import CartController from "../controllers/cart.controller";
const cartController = new CartController();
const cartRouter = Router();


cartRouter.post("/getCart", cartController.getCartByEmail)
cartRouter.post("/addToCart", cartController.addItemToCart)

export default cartRouter