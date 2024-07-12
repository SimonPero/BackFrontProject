import { Cart, CartItems } from "../../DAO";
import { IUserService } from "../users/IUserService";
export interface ICartService {
    setUserService(userService: IUserService): void;
    createCart(customerID: number): Promise<Cart>;
    getCartByEmail(email: string): Promise<{ cart: Cart, items: CartItems[] }>;
    addItemToCart(email: string, productID: string, quantity: string): Promise<{ cart: Cart, items: CartItems[] }>;
    delProdInCart(cartID: string, productID: string): Promise<void>;
}