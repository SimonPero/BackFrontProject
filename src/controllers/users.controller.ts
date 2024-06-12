import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import UserService from "../services/user.service";
const userService = new UserService()

export default class UsersController {
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, surname, email, phone, location, age, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const userData = {
                name,
                surname,
                email,
                hashedPassword,
                phone,
                location,
                age,
                password
            };
            const user = userService.createUser(userData);
            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }

    async logUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const token = userService.logUser(email, password)
            res.json({ token }); 
        } catch (error) {
            next(error)
        }
    }
}
