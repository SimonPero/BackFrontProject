import { Cart, CartItems, Order, OrderDetail } from "../../DAO";
import { AppError, ErrorLevels } from "../../utils/customError/errors";
import { IOrdersService } from "./IOrder.service";
import { IOrderDetailService } from "./IOrderDetail.service";

export default class OrdersService implements IOrdersService {
  constructor(private orderDetailService: IOrderDetailService) {}
  async findOrderById(orderId: number): Promise<Order> {
    try {
      const order = await Order.findByPk(orderId); 
      if (!order) {
        throw new AppError(
          "Order not found",
          404,
          "Order not found",
          ErrorLevels.WARNING
        );
      }
      return order;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError(
          "Error in finding Order",
          500,
          error,
          ErrorLevels.CRITICAL
        );
      }
    }
  }

  async getAllUserOrders(customerID: number, offsetN = 10) {
    try {
      const orders = await Order.findAll({
        where: { customerID },
        offset: (offsetN - 1) * 1,
        limit: 1,
        order: [["orderID", "DESC"]],
      });

      if (!orders) {
        throw new AppError(
          "Products not found",
          404,
          null,
          ErrorLevels.WARNING
        );
      }

      return orders;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError(
          "Error fetching orders",
          500,
          error,
          ErrorLevels.CRITICAL
        );
      }
    }
  }

  async createFinishedOrder(
    customerId: number,
    address: string,
    items: CartItems[]
  ): Promise<{ order: Order; items: OrderDetail[] }> {
    const date = new Date();
    const order = await Order.create({
      customerID: customerId,
      shippingAddress: address,
      status: "ongoing",
      orderDate: date,
    });
    const soldItems = await this.orderDetailService.addItemsToOrder(
      order.ordersID,
      items
    );
    return { order: order, items: soldItems };
  }
}
