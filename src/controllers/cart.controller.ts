import { NextFunction, Request, Response } from "express";
import { services } from "../utils/serviceContainer";

const cartService = services.getCartService()

export default class CartController {
    async getCartByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body
            const cart = await cartService.getCartByEmail(email)
            res.status(201).json(cart)
        } catch (error) {
            next(error)
        }
    }

    async addItemToCart(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, productID, quantity } = req.body
            const cart = await cartService.addItemToCart(email, productID, quantity)
            res.status(201).json(cart)
        } catch (error) {
            next(error)
        }
    }
    async deleteProdInCart(req: Request, res: Response, next: NextFunction) {
        try {
            const { prodId, cartId } = req.params
            await cartService.delProdInCart(cartId, prodId)
            res.status(200).json("deleted")
        } catch (error) {
            next(error)
        }
    }
}