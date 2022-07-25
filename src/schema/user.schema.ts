import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type userDocument = user & Document;
@Schema({ collection: 'user', timestamps: true })
export class user {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({
    default: '',
  })
  avatar: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop()
  feedBack: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'feedBack';
    },
  ];

  @Prop()
  totalHouse: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'house';
    },
  ];

  @Prop()
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'comment';
    },
  ];
}

export const userSchema = SchemaFactory.createForClass(user);
