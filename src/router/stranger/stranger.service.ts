import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { house, houseDocument } from 'src/schema/house.schema';
import { CommentService } from '../comment/comment.service';
import { FeedbackService } from '../feedback/feedback.service';

@Injectable()
export class StrangerService {
  constructor(
    @InjectModel(house.name) private houseModel: Model<houseDocument>,
    private commentService: CommentService,
    private feedbackService: FeedbackService,
  ) {}

  findAll() {
    return this.houseModel.find({});
  }
}
