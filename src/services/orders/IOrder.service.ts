import { CartItems, Order, OrderDetail } from "../../DAO";

export interface IOrdersService {
  getAllUserOrders(customerId: number, offset?: number): Promise<Order[]>;
  createFinishedOrder(
    customerId: number,
    address: string,
    items: CartItems[]
  ): Promise<{ order: Order; items: OrderDetail[] }>;
  findOrderById(orderId: number): Promise<Order>;
}
