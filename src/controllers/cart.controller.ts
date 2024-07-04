import { NextFunction, Request, Response } from "express";
import { services } from "../utils/serviceContainer";

export default class CartController {
    async getCartById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.CustomerID);
            const cart = await services.cartService.getCartById(id)
            res.status(201).json(cart)
        } catch (error) {
            next(error)
        }
    }

    async addItemToCart(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, productID, quantity } = req.body
            const cart = await services.cartService.addItemToCart(email, productID, quantity)
            res.status(201).json(cart)
        } catch (error) {
            next(error)
        }
    }
}