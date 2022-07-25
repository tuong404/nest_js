import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHouseDto } from 'src/core/pipe/dto/dto.house';
import { house, houseDocument } from 'src/schema/house.schema';
import { CommentService } from '../comment/comment.service';
import { FeedbackService } from '../feedback/feedback.service';
import { HouseService } from '../house/house.service';
import { Request, Response } from 'express';
import { paramDTO } from 'src/core/pipe/dto/dto.param';
import { user, userDocument } from 'src/schema/user.schema';
import * as jwt from 'jsonwebtoken';

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

  // create house by user
  // async create(data: CreateHouseDto, param: paramDTO, res: Response) {
  //   const idHouse = await this.houseService.createHouse(data, param, res);
  //   await this.userModel.findByIdAndUpdate(
  //     {
  //       _id: param.id,
  //     },
  //     {
  //       $push: {
  //         totalHouse: idHouse,
  //       },
  //     },
  //     res.status(200).json({
  //       message: 'Success',
  //     }),
  //   );
  // }

  //update one house(idHouse) by user
  async updateHouse(data: any, params: paramDTO, res: Response) {
    // console.log(data);
    console.log(params);
  }

  createFeedback(createUserDto: CreateHouseDto) {
    return this.feedbackService.hello();
  }

  findAll() {
    return `This action returns all user`;
  }

  //get all house by user
  async findAllHouse(req: Request, res: Response) {
    const user: any = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
    );
    const id = user.id;
    // console.log(id);
    await this.houseService.getAllHouse(id, res);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
