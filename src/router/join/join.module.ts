import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userSchema } from 'src/schema/user.schema';
import { JoinController } from './join.controller';
import { JoinService } from './join.service';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: user.name, schema: userSchema }]),
  ],
  controllers: [JoinController],
  providers: [JoinService],
  exports: [JoinService],
})
export class JoinModule {}
