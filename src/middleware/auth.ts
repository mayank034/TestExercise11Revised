import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/secret';

export class Auth {
  constructor() {}

  public auth(req: Request, res: Response, next: NextFunction){
  try {
    const token = req.headers.authorization.split(' ')[1];
      const decodedToken: any = jwt.verify(token, JWT_SECRET);
      const tokenStatus = decodedToken.isActive;
      if (tokenStatus) {
        next();
      } else {
        throw 'Invalid token';
      }
  } catch(error) {
      throw error;
    };
  };
}
