import { Injectable } from '@nestjs/common';

import { CommentService } from '../comment/comment.service';
import { FeedbackService } from '../feedback/feedback.service';
import { HouseService } from '../house/house.service';
import { InjectModel } from '@nestjs/mongoose';
import { user, userDocument } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { Request, Response, NextFunction } from 'Express';
import { AuthLogin, CreateAuthDto } from 'src/core/pipe/dto/dto.auth';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(user.name) private userModel: Model<userDocument>,
    private commentService: CommentService,
    private feedbackService: FeedbackService,
    private houseService: HouseService,
    private jwt: JwtService,
  ) {}

  //register user
  async register(
    data: CreateAuthDto,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const hash = await argon.hash(data.password);
      await this.userModel.create({
        username: data.username,
        password: hash,
        email: data.email,
        fullname: data.fullname,
      });
      // const token = await this.signToken(data.username, data.email);
      res.status(201).send({ message: 'User has been created' });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).send({ message: 'User da ton tai' });
      }
      next(error);
    }
  }

  //login user
  async login(
    authLogin: AuthLogin,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const user = await this.userModel.findOne({
      username: authLogin.username,
    });
    try {
      if (!user) {
        return res.status(401).json({ message: 'tk ko dung' });
      }
      const isMatch = await argon.verify(user.password, authLogin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'mk ko dung' });
      }
      const token = await this.signToken(user.role, user.id);
      const id = user.id;
      return res.status(200).json({ message: 'login success', id, token });
    } catch (error) {
      next(error);
    }
  }

  //create token
  signToken(role: string, id: string): Promise<string> {
    const payload = {
      role: role,
      id: id,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: process.env.JWT_SECRET,
    });
  }

  createFeedback(createAuthDto: CreateAuthDto) {
    return this.feedbackService.hello();
  }

  findAll() {
    this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
