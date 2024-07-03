import { CartItems } from "../../DAO";
import { AppError, ErrorLevels } from "../../middlewares/errorHandler";
export default class CartItemsService {
    async addItemsToCart(cartID: number, productID: number, quantity: number): Promise<CartItems[]> {
        try {
            let cartItem = await CartItems.findOne({ where: { cartID, productID } });
            if (cartItem) {
                cartItem.quantity += quantity;
                await cartItem.save();
            } else {
                cartItem = await CartItems.create({ cartID, productID, quantity });
            }
            return this.getCartItemsByCartId(cartID);
        } catch (error) {
            console.error('Error in addItemsToCart:', error);
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new AppError('Error creating or updating Cart Item', 500, error, ErrorLevels.WARNING);
            }
        }
    }

    async getCartItemsByCartId(cartID: number): Promise<CartItems[]> {
        try {
            const cartItems = await CartItems.findAll({ where: { cartID } });
            if (!cartItems || cartItems.length === 0) {
                return [];
            }
            return cartItems;
        } catch (error) {
            console.error('Error in getCartItemsByCartId:', error);
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new AppError('Error fetching Cart Items', 500, error, ErrorLevels.CRITICAL);
            }
        }
    }
}