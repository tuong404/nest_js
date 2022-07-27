import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHouseDto } from 'src/core/dto/dto.house';
import { house, houseDocument } from 'src/schema/house.schema';
import { CommentService } from '../comment/comment.service';
import { FeedbackService } from '../feedback/feedback.service';
import { HouseService } from '../house/house.service';
import { Request, Response } from 'express';
import { paramDTO } from 'src/core/dto/dto.param';
import { user, userDocument } from 'src/schema/user.schema';
import * as jwt from 'jsonwebtoken';
import * as argon from 'argon2';
import { verify } from 'src/core/response/verify/verify.token';
import { JwtService } from '@nestjs/jwt';
import { AuthLogin, CreateAuthDto } from 'src/core/dto/dto.auth';
require('dotenv').config();

@Injectable()
export class UserService {
  getMultipleParams(params: paramDTO): string {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(user.name) private userModel: Model<userDocument>,
    private commentService: CommentService,
    private feedbackService: FeedbackService,
    private houseService: HouseService,
    private jwt: JwtService,
  ) {}
  //create house by user
  async createHouseByUser(data: CreateHouseDto, req: Request, res: Response) {
    const id = await this.houseService.createHouseByUser(data, req, res);
    const response = await this.userModel.findByIdAndUpdate(
      { _id: id.user },
      { $push: { totalHouse: id.house } },
    );
    res.status(200).json({ message: 'create house success' });
  }

  //update one house(idHouse) by user
  async updateHouse(data: any, params: paramDTO, res: Response) {
    // console.log(data);
    console.log(params);
  }

  createFeedback(createUserDto: CreateHouseDto) {
    return this.feedbackService.hello();
  }

  async findOne(id: string): Promise<any> {
    await this.userModel.findOne({ _id: id });
  }

  //get all house by user
  async findAllHouse(req: Request, res: Response) {
    // console.log(data);
    const token = req.headers.authorization;
    const id = verify.verifyToken(token);
    console.log(id);
    await this.houseService.getAllHouse(id, res);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
