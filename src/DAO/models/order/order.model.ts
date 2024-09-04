import {
  Model,
  DataTypes,
  Optional,
  Association,
  ModelStatic,
} from "sequelize";
import sequelize from "../../../config/database";
import { OrderDetail, User } from "../../index";

// Define the attributes of your model
export interface OrdersAttributes {
  ordersID: number;
  orderDate: Date;
  customerID: number;
  status: string;
  shippingAddress: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the optional attributes for creation
export interface OrdersCreationAttributes
  extends Optional<OrdersAttributes, "ordersID" | "createdAt" | "updatedAt"> {}

// Define the model
class Order
  extends Model<OrdersAttributes, OrdersCreationAttributes>
  implements OrdersAttributes
{
  public ordersID!: number;
  public orderDate!: Date;
  public customerID!: number;
  public status!: string;
  public shippingAddress!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public static associations: {
    user: Association<Order, User>;
    ordeDetails: Association<Order, OrderDetail>;
  };

  public static associate(models: { [key: string]: ModelStatic<Model> }) {
    Order.belongsTo(models.User, { foreignKey: "customerID", as: "user" });
    Order.hasMany(models.orderDetail, {
      foreignKey: "ordersID",
      as: "ordeDetails",
    });
  }
}

Order.init(
  {
    ordersID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.STRING,
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

export default Order;
