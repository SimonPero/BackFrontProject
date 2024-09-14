import { CartItems, OrderDetail } from "../../DAO";

export interface IOrderDetailService {
  addItemsToOrder(
    orderId: number,
    prodsToAdd: CartItems[]
  ): Promise<OrderDetail[]>;
}
