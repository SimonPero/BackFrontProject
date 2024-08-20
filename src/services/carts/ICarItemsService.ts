import { CartItems } from "../../DAO";

export interface ICartItemsService {
    addItemsToCart(cartID: number, productID: number, quantity: number): Promise<CartItems[]>;
    getCartItemsByCartId(cartID: number): Promise<CartItems[]>;
    delProdInCart(cartID: number, productID: number): Promise<number>;
}