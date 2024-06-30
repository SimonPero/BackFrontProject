import { Cart, CartItems } from "../../DAO";
import { AppError, ErrorLevels } from "../../middlewares/errorHandler";
import CartItemsService from "./cartItems.service";
const cartItemsService = new CartItemsService();

export default class CartService {
    async createCart(customerID: number): Promise<Cart> {
        try {
            const cart = await Cart.create({ customerID });
            return cart;
        } catch (error) {
            throw new AppError('Error creating Cart', 500, error, ErrorLevels.WARNING);
        }
    }

    async getCartById(customerID: number): Promise<{ cart: Cart, items: CartItems[] }> {
        try {
            const foundCart = await Cart.findOne({ where: { customerID } })
            if (!foundCart) {
                throw new AppError('Cart not found', 404, null, ErrorLevels.WARNING);
            }
            const items = await cartItemsService.getCartItemsByCartId(foundCart.cartID);
            return { cart: foundCart, items };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new AppError('Error fetching Cart', 500, error, ErrorLevels.CRITICAL);
            }
        }
    }

    async addItemToCart(customerID: number, productID: number, quantity: number): Promise<{ cart: Cart, items: CartItems[] }> {
        try {
            const cart = await this.getCartById(customerID)
            console.log(cart.cart.cartID)
            cartItemsService.addItemsToCart(cart.cart.cartID, productID, quantity)
            return cart
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new AppError('Error fetching Cart', 500, error, ErrorLevels.CRITICAL);
            }
        }
    }
}