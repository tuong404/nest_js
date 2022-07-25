import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userJwt = req.headers.authorization;
    if (!userJwt) {
      console.log('userJwt is null');
      return res.status(401).json({
        message: 'ban can phai dang nhap',
      });
    }
    try {
      const user = jwt.verify(userJwt, process.env.JWT_SECRET);
      if (user) {
        // console.log(user);
        req['user'] = user;
        // console.log('user', user);
      }
    } catch (error) {
      console.log('LoggerMiddleware', error);
    }
    next();
  }
}
