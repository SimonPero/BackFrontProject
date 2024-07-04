import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/database';

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
  }
);

export default User;