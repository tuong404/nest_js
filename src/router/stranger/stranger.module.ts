import { Module } from '@nestjs/common';
import { StrangerService } from './stranger.service';
import { StrangerController } from './stranger.controller';
import { FeedbackModule } from '../feedback/feedback.module';
import { CommentModule } from '../comment/comment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { house } from 'src/schema/house.schema';
import { userSchema } from 'src/schema/user.schema';

@Module({
  imports: [
    CommentModule,
    FeedbackModule,
    MongooseModule.forFeature([{ name: house.name, schema: userSchema }]),
  ],
  controllers: [StrangerController],
  providers: [StrangerService],
})
export class StrangerModule {}
