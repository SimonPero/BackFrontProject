import { Model, DataTypes, Optional, Association, ModelStatic } from 'sequelize';
import sequelize from '../../../config/database';
import { Cart, Product } from '../..';

export interface CartItemsAttributes {
    cartItemID: number;
    cartID: number;
    productID: number;
    quantity: number;
}

export interface CartItemsCreationAttributes extends Optional<CartItemsAttributes, 'cartItemID'> { }

// Define el modelo
class CartItems extends Model<CartItemsAttributes, CartItemsCreationAttributes> implements CartItemsAttributes {
    public cartItemID!: number;
    public cartID!: number;
    public productID!: number;
    public quantity!: number;
    // Associations
    public static associations: {
        cart: Association<CartItems, Cart>;
        product: Association<CartItems, Product>;
    };

    public static associate(models: {[key: string]: ModelStatic<Model>}) {
        CartItems.belongsTo(models.Cart, { foreignKey: 'cartID', as: 'cart' });
        CartItems.belongsTo(models.Product, { foreignKey: 'productID', as: 'product' });
    }
}

CartItems.init(
    {
        cartItemID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cartID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productID: {
            type: DataTypes.INTEGER,

        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'cart_items',
        modelName: 'CartItems',
        timestamps: true
    }
);

export default CartItems;