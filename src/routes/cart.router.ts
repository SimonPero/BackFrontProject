import { Router } from "express";
import CartController from "../controllers/cart.controller";
import authenticateJWT from "../middlewares/auth";
const cartController = new CartController();
const cartRouter = Router();

cartRouter.post("/getCart", authenticateJWT, cartController.getCartByEmail)
cartRouter.post("/addToCart", authenticateJWT, cartController.addItemToCart)
cartRouter.delete("/deleteFromCart/:prodId/:cartId", authenticateJWT, cartController.deleteProdInCart)

export default cartRouter