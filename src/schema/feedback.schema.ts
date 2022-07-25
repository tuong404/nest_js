import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type feedbackDocument = feedback & Document;
@Schema({ collection: 'feedback', timestamps: true })
export class feedback {
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

export const feedbackSchema = SchemaFactory.createForClass(feedback);
