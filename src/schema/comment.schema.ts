import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type commentDocument = comment & Document;
@Schema({ collection: 'comment', timestamps: true })
export class comment {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  user: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'user';
  };
}

export const commentSchema = SchemaFactory.createForClass(comment);
