import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CommentModule } from '../comment/comment.module';
import { FeedbackModule } from '../feedback/feedback.module';
import { HouseModule } from '../house/house.module';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userSchema } from 'src/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { JoinModule } from '../join/join.module';
import { SessionSerializer } from 'src/core/constant/session.serializer';
// import { SessionSerializer } from 'src/core/utils/session';

@Module({
  imports: [UserModule, PassportModule.register({ session: true }), JoinModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
