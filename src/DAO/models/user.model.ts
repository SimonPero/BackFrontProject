import { Model, DataTypes, Optional, Association, ModelStatic } from 'sequelize';
import sequelize from '../../config/database';
import { Cart } from '..';
import Order from './order/order.model';

export interface UserAttributes {
  customerID: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  location: string;
  age: number;
  password: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'customerID'> { }

// Define el modelo
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public customerID!: number;
  public name!: string;
  public surname!: string;
  public email!: string;
  public location!: string;
  public phone!: string;
  public age!: number;
  public password!: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  // Associations
  public static associations: {
    carts: Association<User, Cart>;
    orders: Association<User, Order>
  };

  public static associate(models: {[key: string]: ModelStatic<Model>}) {
    User.hasMany(models.Cart, { foreignKey: 'customerID', as: 'carts' });
    User.hasMany(models.Order, { foreignKey: 'ordersID', as: 'orders' })
  }
}

User.init(
  {
    customerID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'customers',
    modelName: 'User',
    timestamps: true
  }
);

export default User;