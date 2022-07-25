import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CommentModule } from '../comment/comment.module';
import { FeedbackModule } from '../feedback/feedback.module';
import { HouseModule } from '../house/house.module';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userSchema } from 'src/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CommentModule,
    FeedbackModule,
    HouseModule,
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: user.name, schema: userSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
