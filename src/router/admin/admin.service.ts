import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user, userDocument } from 'src/schema/user.schema';
import { CommentService } from '../comment/comment.service';
import { FeedbackService } from '../feedback/feedback.service';
import { HouseService } from '../house/house.service';

import { Request, Response } from 'express';
import { idBody } from '../../core/dto/idBody';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(user.name) private userModel: Model<userDocument>,
    private commentService: CommentService,
    private feedbackService: FeedbackService,
    private houseService: HouseService,
  ) {}

  async updateUser(data: idBody, req: Request, res: Response) {
    const user = await this.userModel.findById(data.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    await this.userModel.findByIdAndUpdate(data.id, {
      role: 'manager',
    });
    return res.status(200).json({
      message: 'success, user updated to manager',
    });
  }

  // //update house
  // async updateHouse(data: updateUser, req: Request, res: Response) {
  //   const house = await this.houseService.findById(data.id);
  //   if (!house) {
  //     return res.status(404).json({
  //       message: 'House not found',
  //     });
  //   }
  //   console.log(house);
  // }
}
