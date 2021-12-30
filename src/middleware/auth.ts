import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/secret';

export class Auth {
  constructor() {}

  public auth(req: Request, res: Response, next: NextFunction){
  try {
    const token = req.headers.authorization.split(' ')[1];
      console.log('##########TOKEN RECIEVED. API ACCESS VIA REST CLIENT########');
      const decodedToken: any = jwt.verify(token, JWT_SECRET);
      console.log(decodedToken);
      const tokenStatus = decodedToken.isActive;
      if (tokenStatus) {
        next();
      } else {
        throw 'Invalid token';
      }
  } catch(error) {
      console.log('plplplpllpllplplplpl', error);
      throw error;
    };
  };
}
