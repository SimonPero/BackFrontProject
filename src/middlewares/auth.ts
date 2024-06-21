import jwt from 'jsonwebtoken';
import envConfig from '../config/env.config';
import { NextFunction, Request, Response } from 'express';

const authenticateJWT = (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, envConfig.jwtSecret, (err) => {
      if (err) {
        return res.sendStatus(403); // Token inválido
      }
      next();
    });
  } else {
    res.sendStatus(401); // Token no proporcionado
  }
};

export default authenticateJWT;