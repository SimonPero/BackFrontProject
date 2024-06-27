import config from "../../config/env.config";
import jwt from 'jsonwebtoken';
import { UserAttributes } from "../../DAO/models/user.model";
import { Response } from "express";

function signToken(user: UserAttributes) {
    const token = jwt.sign({ user }, config.jwtSecret, { expiresIn: '1d' });
    return token
}

export function createUserToken(user: UserAttributes, res: Response, req: any) {
    const token = signToken(user);
    req.session = req.session || {};

    req.session.jwt = token;
    req.session.user = user;
    res.cookie("jwt", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    return res.status(201).json({ user, token });
}