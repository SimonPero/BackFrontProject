import { Cart, CartItems, User } from "../../DAO";
import { AppError, ErrorLevels } from "../../utils/customError/errors";
import { ICartService } from "./ICartService";
import { IUserService } from "../users/IUserService";
import { ICartItemsService } from "./ICarItemsService";

export default class CartService implements ICartService {
    private userService!: IUserService;

    constructor(private cartItemsService: ICartItemsService) { }

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

    async getCartByEmail(email: string): Promise<{ cart: Cart, items: CartItems[] }> {
        try {
            const user: User = await this.userService.getUserByEmail(email)
            const customerID = user.customerID
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
            const cart = await this.getCartByEmail(email)
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
    
    async findCartByID(cartID: number) {
        try {
            const cart = Cart.findByPk(cartID)
            if (!cart) {
                throw new AppError('Cart not found', 404, 'Cart not found', ErrorLevels.WARNING);
            }
            return cart
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new AppError('Error in finding Cart', 500, error, ErrorLevels.CRITICAL);
            }
        }
    }

    async delProdInCart(cartID: string, productID: string): Promise<void> {
        try {
            const parsedProductID = parseInt(productID);
            const parsedCartID = parseInt(cartID);

            // Verificar la existencia del carrito
            const cart = await this.findCartByID(parsedCartID);
            if (!cart) {
                throw new AppError('Cart not found', 404, 'Cart not found', ErrorLevels.WARNING);
            }
            const deletedCount = await this.cartItemsService.delProdInCart(parsedCartID, parsedProductID)
            // Verificar si se eliminó algo
            if (deletedCount === 0) {
                throw new AppError('Product not found in the cart', 404, 'Product not in cart', ErrorLevels.WARNING);
            }
        } catch (error) {
            console.error('Error in delProdInCart:', error);
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new AppError('Error deleting product from Cart', 500, error, ErrorLevels.CRITICAL);
            }
        }
    }
}