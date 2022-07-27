import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user, userDocument } from 'src/schema/user.schema';
import * as argon from 'argon2';
require('dotenv').config();

@Injectable()
export class JoinService {
  constructor(
    @InjectModel(user.name) private userModel: Model<userDocument>,
    private jwt: JwtService,
  ) {}
  async login(username: string, password: string) {
    const user = await this.userModel
      .findOne({
        username: username,
      })
      .lean();
    if (!user) {
      throw new NotFoundException('user khong ton tai');
    }
    const isMatch = await argon.verify(user.password, password);
    if (!isMatch) {
      throw new NotFoundException('sai mat khau');
    }
    const token = await this.signToken(user.role, user._id);
    // console.log(token);
    return { user, token };
  }

  //create token
  signToken(role: string, id: string): Promise<string> {
    const payload = {
      role: role,
      id: id,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      secret: process.env.JWT_SECRET,
    });
  }
}
