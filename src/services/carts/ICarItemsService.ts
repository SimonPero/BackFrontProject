import { CartItems, Product } from "../../DAO";

export interface ICartItemsService {
    addItemsToCart(cartID: number, prod: Product, quantity: number): Promise<CartItems[]>;
    getCartItemsByCartId(cartID: number): Promise<CartItems[]>;
    delProdInCart(cartID: number, productID: number): Promise<number>;
}