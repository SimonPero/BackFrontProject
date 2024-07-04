import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../../config/database';

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
    }
);

export default CartItems;