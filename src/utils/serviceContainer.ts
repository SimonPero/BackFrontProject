import { ICartItemsService } from "../services/cart/ICarItemsService";
import { ICartService } from "../services/cart/ICartService";
import { IUserService } from "../services/users/IUserService";
import { IProductService } from "../services/products/IProductService";
import UserService from "../services/users/user.service";
import CartService from "../services/cart/cart.service";
import CartItemsService from "../services/cart/cartItems.service";
import ProductService from "../services/products/product.service";

class ServiceContainer {
    private cartItemsService: ICartItemsService;
    private cartService: ICartService;
    private userService: IUserService;
    private productService: IProductService;

    constructor(
        private productServiceClass: new () => IProductService = ProductService,
        private userServiceClass: new (cartService: ICartService) => IUserService = UserService,
        private cartServiceClass: new (cartItemsService: ICartItemsService) => ICartService = CartService,
        private cartItemsServiceClass: new () => ICartItemsService = CartItemsService
    ) {
        const productService = new this.productServiceClass();
        const cartItemsService = new this.cartItemsServiceClass();
        const cartService = new this.cartServiceClass(cartItemsService);
        const userService = new this.userServiceClass(cartService);
        cartService.setUserService(userService);

        this.cartItemsService = cartItemsService;
        this.cartService = cartService;
        this.userService = userService;
        this.productService = productService
    }
    
    public getUserService(): IUserService {
        return this.userService;
    }

    public getProductService(): IProductService {
        return this.productService;
    }

    public getCartService(): ICartService {
        return this.cartService;
    }

    public getCartItemsService(): ICartItemsService {
        return this.cartItemsService;
    }
}

export const services = new ServiceContainer();