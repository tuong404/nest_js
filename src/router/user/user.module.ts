import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CommentModule } from '../comment/comment.module';
import { FeedbackModule } from '../feedback/feedback.module';
import { HouseModule } from '../house/house.module';
import { MongooseModule } from '@nestjs/mongoose';
import { house, houseSchema } from 'src/schema/house.schema';
import { user, userSchema } from 'src/schema/user.schema';

@Module({
  imports: [
    CommentModule,
    FeedbackModule,
    HouseModule,
    MongooseModule.forFeature([{ name: user.name, schema: userSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
