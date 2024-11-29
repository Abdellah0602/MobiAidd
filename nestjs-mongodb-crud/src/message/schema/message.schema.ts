import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export enum MessageStatus {
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
}

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ required: true })
  sender: string;

  @Prop({ required: true })
  recipient: string;

  @Prop({ required: true, minlength: 1, maxlength: 500 })
  content: string; 

  @Prop({ enum: Object.values(MessageStatus), default: MessageStatus.SENT })
  status: MessageStatus;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

MessageSchema.index({ sender: 1, recipient: 1, createdAt: -1 });
