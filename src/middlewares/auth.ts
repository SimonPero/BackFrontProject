import jwt from 'jsonwebtoken';
import envConfig from '../config/env.config';
import { NextFunction, Request, Response } from 'express';

function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, envConfig.jwtSecret, (err: any) => {
      if (err) {
        return res.sendStatus(403); // Token inválido
      }
      next();
    });
  } else {
    return res.sendStatus(401); // Token no proporcionado
  }
}

export default authenticateJWT;