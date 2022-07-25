import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserModule } from '../user/user.module';
import { HouseModule } from '../house/house.module';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userSchema } from 'src/schema/user.schema';
import { CommentModule } from '../comment/comment.module';
import { FeedbackModule } from '../feedback/feedback.module';

@Module({
  imports: [
    CommentModule,
    FeedbackModule,
    HouseModule,
    MongooseModule.forFeature([{ name: user.name, schema: userSchema }]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
