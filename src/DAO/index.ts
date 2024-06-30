import sequelize from '../config/database';
import Product from './models/product.model';
import User from './models/user.model';
import Cart from './models/cart/cart.model';
import CartItems from './models/cart/cartItems.model';
const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false }); // Use `force: true` para reiniciar la base de datos en cada inicio
        console.log('Database synced');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

export {
    sequelize,
    syncDatabase,
    Product,
    User,
    Cart,
    CartItems,
};