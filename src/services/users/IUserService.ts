import { User } from "../../DAO";
import { UserCreationAttributes } from "../../DAO/models/user.model";

export interface IUserService {
    getAllUsers(): Promise<User[]>;
    getUserByEmail(email: string): Promise<User | any>;
    createUser(userData: UserCreationAttributes): Promise<User>;
    logUser(email: string, password: string): Promise<User>;
}