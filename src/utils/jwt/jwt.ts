import config from "../../config/env.config";
import jwt from 'jsonwebtoken';
import { UserAttributes } from "../../DAO/models/user.model";
import { Response} from "express";

function signToken(user: UserAttributes) {
    const token = jwt.sign({user}, config.jwtSecret, { expiresIn: '1d' });
    return token
}

export function createUserToken(user: UserAttributes, res: Response, req: any) {
    const token = signToken(user);
    req.session = req.session || {};

    req.session.jwt = token;
    req.session.user = user;
    
    return res.status(201).json({ user, token });
}