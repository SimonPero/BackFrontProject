import User, { UserAttributes, UserCreationAttributes } from "../DAO/models/user.model";
import { AppError, ErrorLevels } from "../middlewares/errorHandler";
import config from "../config/env.config";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class UserService {
    async getAllUsers(): Promise<User[]> {
        try {
            const users = await User.findAll()
            if (!users) {
                throw new AppError('users table is empty', 404, null, ErrorLevels.WARNING);
            }
            return (users)
        } catch (error) {
            throw new AppError('Error fetching users', 500, error, ErrorLevels.CRITICAL)
        }
    }
    async getUserByEmail(email: string): Promise<User> {
        try {
            const user = await User.findOne({ where: { email } })
            if (!user) {
                throw new AppError('users table is empty', 404, null, ErrorLevels.WARNING);
            }
            return user
        } catch (error) {
            throw new AppError('Error fetching users', 500, error, ErrorLevels.CRITICAL)
        }
    }
    async createUser(userData: UserCreationAttributes): Promise<User> {
        try {
            const foundUser = await this.getUserByEmail(userData.email)
            if (foundUser.email === userData.email) {
                throw new AppError('User already exist', 400, null, ErrorLevels.INFO);
            }

            const user = await User.create(userData);
            if (!user) {
                throw new AppError('User not found', 404, null, ErrorLevels.WARNING);
            }
            return user
        } catch (error) {
            throw new AppError('Error creating user', 500, error, ErrorLevels.WARNING);
        }
    }

    async logUser(email: string, password: string){
        const foundUser = await this.getUserByEmail(email)
        if (email === foundUser.email) {
            throw new AppError('User already exist', 400, null, ErrorLevels.INFO);
        }
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            throw new AppError('User not found', 404, null, ErrorLevels.WARNING)
        }
        const token = jwt.sign({ userId: foundUser.id }, config.jwtSecret, { expiresIn: '1d' });
        return token
    }
}