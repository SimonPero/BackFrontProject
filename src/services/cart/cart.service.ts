import { Cart, CartItems } from "../../DAO";
import { AppError, ErrorLevels } from "../../middlewares/errorHandler";
import { ICartService } from "./ICartService";
import { IUserService } from "../users/IUserService";
import { ICartItemsService } from "./ICarItemsService";

export default class CartService implements ICartService{
    private userService!: IUserService;

    constructor(private cartItemsService: ICartItemsService) {}

    setUserService(userService: IUserService) {
        this.userService = userService;
    }
    
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
            const items = await this.cartItemsService.getCartItemsByCartId(foundCart.cartID);
            return { cart: foundCart, items };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new AppError('Error fetching Cart', 500, error, ErrorLevels.CRITICAL);
            }
        }
    }

    async addItemToCart(email: string, productID: string, quantity: string): Promise<{ cart: Cart, items: CartItems[] }> {
        try {
            const parsedProductID = parseInt(productID);
            const parsedQuantity = parseInt(quantity);

            if (isNaN(parsedProductID) || isNaN(parsedQuantity)) {
                throw new AppError('Invalidad data', 400, null, ErrorLevels.WARNING)
            }
            const user = await this.userService.getUserByEmail(email)
            const cart = await this.getCartById(user.customerID)
            this.cartItemsService.addItemsToCart(cart.cart.cartID, parsedProductID, parsedQuantity)
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