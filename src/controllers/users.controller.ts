import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import { createUserToken } from "../utils/jwt/jwt";
import { services } from "../utils/serviceContainer";

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
            const user = await services.userService.createUser(userData);
            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }

    async logUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await services.userService.logUser(email, password);
            createUserToken(user, res);
        } catch (error: any) {
            next(error);
        }
    }
}
