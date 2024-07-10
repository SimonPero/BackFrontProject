import { Model, DataTypes, Optional, Association, ModelStatic } from 'sequelize';
import sequelize from '../../config/database';
import { CartItems } from '..';

// Define the attributes of your model
export interface ProductAttributes {
  productID: number;
  category: string;
  name: string;
  description: string;
  size: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the optional attributes for creation
export interface ProductCreationAttributes extends Optional<ProductAttributes, 'productID' | 'createdAt' | 'updatedAt'> { }

// Define the model
class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public productID!: number;
  public category!: string;
  public name!: string;
  public description!: string;
  public size!: string;
  public price!: number;
  public stock!: number;
  public imageUrl!: string | null;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public static associations: {
    cartItems: Association<Product, CartItems>;
  };

  public static associate(models: { [key: string]: ModelStatic<Model> }) {
    Product.hasMany(models.CartItems, { foreignKey: 'productID', as: 'cartItems' });
  }
}

Product.init(
  {
    productID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
    modelName: 'Product',
  }
);

export default Product;