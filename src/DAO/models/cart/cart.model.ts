import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../../config/database';

export interface CartAttributes {
    cartID: number;
    customerID: number;
}

export interface CartCreationAttributes extends Optional<CartAttributes, 'cartID'> { }

// Define el modelo
class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
    public cartID!: number;
    public customerID!: number;
}

Cart.init(
    {
        cartID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        customerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'cart',
    }
);

export default Cart;