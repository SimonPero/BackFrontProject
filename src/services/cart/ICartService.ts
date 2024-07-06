import { Cart, CartItems } from "../../DAO";
import { IUserService } from "../users/IUserService";
export interface ICartService {
    setUserService(userService: IUserService): void;
    createCart(customerID: number): Promise<Cart>;
    getCartById(customerID: number): Promise<{ cart: Cart, items: CartItems[] }>;
    addItemToCart(email: string, productID: string, quantity: string): Promise<{ cart: Cart, items: CartItems[] }>;
}