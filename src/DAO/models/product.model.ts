import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/database';

// Define los atributos de tu modelo
export interface ProductAttributes {
  productID: number;
  category: string;
  name: string;
  description: string;
  size: string;
  price: number;
  stock: number;
  imageUrl: string | null;
}

// Define los atributos opcionales para la creación
export interface ProductCreationAttributes extends Optional<ProductAttributes, 'productID'> {}

// Define el modelo
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
  },
  {
    sequelize,
    tableName: 'products',
  }
);

export default Product;
