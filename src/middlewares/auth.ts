import jwt from 'jsonwebtoken';
import envConfig from '../config/env.config';
import { NextFunction, Request, Response } from 'express';

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, envConfig.jwtSecret, (err) => {
      if (err) {
        return res.sendStatus(403); // Token inválido
      }
      next();
    });
  } else {
    console.log(1)
    return res.sendStatus(401); // Token no proporcionado
  }
};

export default authenticateJWT;