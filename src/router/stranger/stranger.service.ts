import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { house, houseDocument } from 'src/schema/house.schema';
import { CommentService } from '../comment/comment.service';
import { FeedbackService } from '../feedback/feedback.service';
import { CreateStrangerDto } from './dto/create-stranger.dto';
import { UpdateStrangerDto } from './dto/update-stranger.dto';

@Injectable()
export class StrangerService {
  constructor(
    @InjectModel(house.name) private houseModel: Model<houseDocument>,
    private commentService: CommentService,
    private feedbackService: FeedbackService,
  ) {}
  create(createStrangerDto: CreateStrangerDto) {
    return 'This action adds a new stranger';
  }

  findAll() {
    return this.houseModel.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} stranger`;
  }

  update(id: number, updateStrangerDto: UpdateStrangerDto) {
    return `This action updates a #${id} stranger`;
  }

  remove(id: number) {
    return `This action removes a #${id} stranger`;
  }
}
