import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

@Injectable()
export class verify {
  constructor() {}
  static verifyToken(token: string) {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  }
}
