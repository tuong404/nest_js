import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { house, houseSchema } from 'src/schema/house.schema';
import { user, userSchema } from 'src/schema/user.schema';
import { HouseService } from './house.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: house.name, schema: houseSchema }]),
  ],
  providers: [HouseService],
  exports: [HouseService],
})
export class HouseModule {}
