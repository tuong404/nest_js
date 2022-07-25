import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type houseDocument = house & Document;
@Schema({ collection: 'house', timestamps: true })
export class house {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  adress: string;

  @Prop({ required: true })
  price: string;

  @Prop({ default: '' })
  picture: string;

  @Prop({ default: '' })
  describe: string;

  @Prop({ default: '0' })
  status: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  })
  user: string;
}

export const houseSchema = SchemaFactory.createForClass(house);
