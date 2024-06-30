import User, { UserCreationAttributes } from "../DAO/models/user.model";
import { AppError, ErrorLevels } from "../middlewares/errorHandler";
import bcrypt from 'bcrypt';
import CartService from "./cart/cart.service";

const cartService = new CartService();
export default class UserService {
    async getAllUsers(): Promise<User[]> {
        try {
            const users = await User.findAll()
            if (!users) {
                throw new AppError('users table is empty', 404, null, ErrorLevels.WARNING);
            }
            return (users)
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new AppError('Error fetching users', 500, error, ErrorLevels.CRITICAL)
            }
        }
    }

    async getUserByEmail(email: string): Promise<User | any> {
        if (typeof email !== 'string' || !email.includes('@')) {
            throw new AppError('Invalid email format', 400, null, ErrorLevels.WARNING);
        }

        try {
            const user = await User.findOne({ where: { email } });
            return user;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new AppError('Error fetching user', 500, error, ErrorLevels.CRITICAL);
            }
        }
    }

    async createUser(userData: UserCreationAttributes): Promise<User> {
        try {
            const foundUser = await this.getUserByEmail(userData.email)
            if (foundUser) {
                throw new AppError('User already exist', 400, null, ErrorLevels.INFO);
            }
            const user = await User.create(userData);
            cartService.createCart(user.customerID)
            if (!user) {
                throw new AppError('User not found', 404, null, ErrorLevels.WARNING);
            }
            return user
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new AppError('Error creating user', 500, error, ErrorLevels.WARNING);
            }
        }
    }

    async logUser(email: string, password: string) {
        try {
            const foundUser = await this.getUserByEmail(email);
            const isMatch = await bcrypt.compare(password, foundUser.password);
            if (!isMatch) {
                throw new AppError('Password does not match', 401, null, ErrorLevels.WARNING);
            }
            return foundUser;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new AppError('User not found', 404, error, ErrorLevels.WARNING);
            }
        }
    }
}