import { Model, DataTypes, Optional, Association, ModelStatic } from 'sequelize';
import sequelize from '../../../config/database';
import { CartItems, User } from '../..';

export interface CartAttributes {
    cartID: number;
    customerID: number;
}

export interface CartCreationAttributes extends Optional<CartAttributes, 'cartID'> { }

// Define el modelo
class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
    public cartID!: number;
    public customerID!: number;
    // Associations
    public static associations: {
        customer: Association<Cart, User>;
        cartItems: Association<Cart, CartItems>;
    };

    public static associate(models: {[key: string]: ModelStatic<Model>}) {
        Cart.belongsTo(models.User, { foreignKey: 'customerID', as: 'customer' });
        Cart.hasMany(models.CartItems, { foreignKey: 'cartID', as: 'cartItems' });
    }
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
        modelName: 'Cart',
        timestamps: true
    }
);

export default Cart;