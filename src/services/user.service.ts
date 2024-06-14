import User, { UserAttributes, UserCreationAttributes } from "../DAO/models/user.model";
import { AppError, ErrorLevels } from "../middlewares/errorHandler";
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
    async getUserByEmail(email: string): Promise<User | any> {
        if (typeof email !== 'string' || !email.includes('@')) {
            throw new AppError('Invalid email format', 400, null, ErrorLevels.WARNING);
        }

        try {
            const user = await User.findOne({ where: { email } });
            return user;
        } catch (error) {
            throw new AppError('Error fetching user', 500, error, ErrorLevels.CRITICAL);
        }
    }

    async createUser(userData: UserCreationAttributes): Promise<User> {
        try {
            console.log(userData)
            const foundUser = await this.getUserByEmail(userData.email)
            if (foundUser) {
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

    async logUser(email: string, password: string) {
        try {
            const foundUser = await this.getUserByEmail(email)

            console.log(password)
            console.log(foundUser)
            const isMatch = await bcrypt.compare(password, foundUser.password);
            if (!isMatch) {
                throw new AppError('User not found', 404, null, ErrorLevels.WARNING)
            }
            return foundUser
        } catch (error) {
            console.log(error)
            throw new AppError('Error fetching user', 500, error, ErrorLevels.WARNING)
        }
    }
}