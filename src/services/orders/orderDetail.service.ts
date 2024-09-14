import { Cart, CartItems, OrderDetail } from "../../DAO";
import { AppError, ErrorLevels } from "../../utils/customError/errors";
import { IOrderDetailService } from "./IOrderDetail.service";

export default class OrderDetailService implements IOrderDetailService {
  async addItemsToOrder(
    orderId: number,
    prodsToAdd: CartItems[]
  ): Promise<OrderDetail[]> {
    try {
      // Use map to return a promise for each product
      const addedProds = await Promise.all(
        prodsToAdd.map(async (prod) => {
          const totalPrice = prod.price * prod.quantity;

          // Create and return the OrderDetail for each product
          const item = await OrderDetail.create({
            orderID: orderId,
            productID: prod.dataValues.productID,
            price: totalPrice,
            quantity: prod.dataValues.quantity,
          });

          return item;
        })
      );
      return addedProds;
    } catch (error) {
      console.error("Error in addItemsToOrder:", error);
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError(
          "Error creating or updating OrderDetail",
          500,
          error,
          ErrorLevels.WARNING
        );
      }
    }
  }
}
