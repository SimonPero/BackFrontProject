import { CartItems, Product } from "../../DAO";
import { AppError, ErrorLevels } from "../../utils/customError/errors";
import { ICartItemsService } from "./ICarItemsService";

export default class CartItemsService implements ICartItemsService {
    async addItemsToCart(cartID: number, prod: Product , quantity: number): Promise<CartItems[]> {
        try {
            let cartItem = await CartItems.findOne({ where: { cartID, productID:prod.dataValues.productID } });
            if (cartItem) {
                cartItem.quantity += quantity;
                cartItem.price = prod.dataValues.price
                await cartItem.save();
            } else {
                cartItem = await CartItems.create({ cartID, productID:prod.dataValues.productID, price:prod.dataValues.price, quantity });
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
            const cartItems = await CartItems.findAll({
                where: { cartID },
                include: [{
                    model: Product,
                    as: 'product'
                }]
            });
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

    async delProdInCart(cartID: number, productID: number): Promise<number> {
        try {
            const deletedCount = await CartItems.destroy({
                where: {
                    productID: productID,
                    cartID: cartID,
                },
            });
            return deletedCount
        } catch (error) {
            console.error('Error in delProdInCart:', error);
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new AppError('Error deleting prod from Cart', 500, error, ErrorLevels.CRITICAL);
            }
        }
    }
}
