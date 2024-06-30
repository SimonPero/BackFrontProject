import { NextFunction, Request, Response } from "express";
import CartService from "../services/cart/cart.service";

const cartService = new CartService();

export default class CartController {
    async getCartById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const cart = await cartService.getCartById(id)
            res.status(201).json(cart)
        } catch (error) {
            next(error)
        }
    }

    async addItemToCart(req: Request, res: Response, next: NextFunction) {
        try {
            const { customerID, productId, quantity } = req.body
            const cart = await cartService.addItemToCart(customerID, productId, quantity)
            res.status(201).json(cart)
        } catch (error) {
            next(error)
        }
    }
}