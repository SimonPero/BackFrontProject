import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import UserService from "../services/user.service";
import { createUserToken } from "../utils/jwt/jwt";
const userService = new UserService()

export default class UsersController {
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, surname, email, password, phone, location, age } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const userData = {
                name,
                surname,
                email,
                password: hashedPassword,
                phone,
                location,
                age,
            };
            const user = await userService.createUser(userData);
            res.status(201).json(user)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async logUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await userService.logUser(email, password)
            createUserToken(user, res, req)
        } catch (error) {
            next(error)
        }
    }
}
