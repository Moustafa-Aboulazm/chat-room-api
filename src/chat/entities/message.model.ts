 

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
//import { User } from './user.model';
//import { Room } from './room.model';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ type: String, required: true })
  text: string;

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;

  @Prop({ type:  Types.ObjectId, ref: 'User' })
  user: string;

 
}

export const MessageSchema = SchemaFactory.createForClass(Message);

 