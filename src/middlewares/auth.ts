import jwt from 'jsonwebtoken';
import envConfig from '../config/env.config';
import { NextFunction, Request, Response } from 'express';

function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]; 
    jwt.verify(token, envConfig.jwtSecret, (err: any) => {
      if (err) {
        return res.sendStatus(403); 
      }
      next();
    });
  } else {
    return res.sendStatus(401); 
  }
}

export default authenticateJWT;
