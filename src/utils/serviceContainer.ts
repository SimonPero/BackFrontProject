import { ICartItemsService } from "../services/carts/ICarItemsService";
import { ICartService } from "../services/carts/ICartService";
import { IUserService } from "../services/users/IUserService";
import { IProductService } from "../services/products/IProductService";
import { IOrdersService } from "../services/orders/IOrder.service";
import { IOrderDetailService } from "../services/orders/IOrderDetail.service";
import UserService from "../services/users/user.service";
import CartService from "../services/carts/cart.service";
import CartItemsService from "../services/carts/cartItems.service";
import ProductService from "../services/products/product.service";
import OrdersService from "../services/orders/order.service";
import OrderDetailService from "../services/orders/orderDetail.service";



class ServiceContainer {
    private cartItemsService: ICartItemsService;
    private cartService: ICartService;
    private userService: IUserService;
    private productService: IProductService;
    private ordersService: IOrdersService;
    private orderDetailService: IOrderDetailService;

    constructor(
        private productServiceClass: new () => IProductService = ProductService,
        private userServiceClass: new (cartService: ICartService) => IUserService = UserService,
        private cartServiceClass: new (cartItemsService: ICartItemsService) => ICartService = CartService,
        private cartItemsServiceClass: new () => ICartItemsService = CartItemsService,
        private ordersServiceClass: new (orderDetailService:IOrderDetailService) => IOrdersService = OrdersService,
        private orderDetailServiceClass: new () => IOrderDetailService = OrderDetailService,
    ) {
        const productService = new this.productServiceClass();
        const cartItemsService = new this.cartItemsServiceClass();
        const cartService = new this.cartServiceClass(cartItemsService);
        const orderDetailService = new this.orderDetailServiceClass();
        const ordersService = new this.ordersServiceClass(orderDetailService);
        const userService = new this.userServiceClass(cartService);
        cartService.setUserService(userService);

        this.cartItemsService = cartItemsService;
        this.cartService = cartService;
        this.userService = userService;
        this.productService = productService
        this.orderDetailService = orderDetailService;
        this.ordersService = ordersService

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

    public getOrdersService(): IOrdersService {
        return this.ordersService;
    }
    public getOrderDetailService(): IOrderDetailService {
        return this.orderDetailService;
    }
}

export const services = new ServiceContainer();