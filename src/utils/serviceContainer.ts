import UserService from "../services/user.service";
import CartService from "../services/cart/cart.service";
import CartItemsService from "../services/cart/cartItems.service";

class ServiceContainer {
    userService: UserService;
    cartService: CartService;
    cartItemsService: CartItemsService;

    constructor() {
        this.cartItemsService = new CartItemsService();
        this.cartService = new CartService(this.cartItemsService);
        this.userService = new UserService(this.cartService);

        // Set userService on cartService after both are initialized
        this.cartService.setUserService(this.userService);
    }
}

export const services = new ServiceContainer();