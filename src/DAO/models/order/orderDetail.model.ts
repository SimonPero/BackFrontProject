import {
  Model,
  DataTypes,
  Optional,
  Association,
  ModelStatic,
} from "sequelize";
import sequelize from "../../../config/database";
import { Product, Order } from "../../index";

// Define the attributes of your model
export interface OrderDetailsAttributes {
  orderDetailID: number;
  orderID: number;
  productID: number;
  quantity: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the optional attributes for creation
export interface OrdersDetailsCreationAttributes
  extends Optional<
    OrderDetailsAttributes,
    "orderDetailID" | "createdAt" | "updatedAt"
  > {}

// Define the model
class OrderDetail
  extends Model<OrderDetailsAttributes, OrdersDetailsCreationAttributes>
  implements OrderDetailsAttributes
{
  public orderDetailID!: number;
  public orderID!: number;
  public productID!: number;
  public quantity!: number;
  public price!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public static associations: {
    order: Association<OrderDetail, Order>;
    product: Association<OrderDetail, Product>;
  };

  public static associate(models: { [key: string]: ModelStatic<Model> }) {
    OrderDetail.belongsTo(models.Order, { foreignKey: "orderID", as: "order" });
    OrderDetail.belongsTo(models.Product, {
      foreignKey: "productID",
      as: "product",
    });
  }
}

OrderDetail.init(
  {
    orderDetailID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: true,
    modelName: "Order",
  }
);

export default OrderDetail
