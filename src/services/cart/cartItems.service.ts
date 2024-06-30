import { CartItems } from "../DAO";
import { AppError, ErrorLevels } from "../middlewares/errorHandler";
export default class CartItemsService {
    async addItemsToCart(cartID: number, productID: number, quantity: number): Promise<CartItems> {
        try {
            const existingCartItem = await CartItems.findOne({ where: { cartID, productID } });
            if (existingCartItem) {
                existingCartItem.quantity += quantity;
                await existingCartItem.save();
                return existingCartItem;
            } else {
                const cartItem = await CartItems.create({ cartID, productID, quantity });
                return cartItem;
            }
        } catch (error) {
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
            if (!cartItems) {
                throw new AppError('Cart Items not found', 404, null, ErrorLevels.WARNING);
            }
            return cartItems;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new AppError('Error fetching Cart Items', 500, error, ErrorLevels.CRITICAL);
            }
        }
    }
}