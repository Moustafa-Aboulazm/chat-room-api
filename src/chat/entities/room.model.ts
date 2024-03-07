// src/chat/models/room.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document , Types } from 'mongoose';
import { User } from './user.model';
import { Message } from './message.model';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop()
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  messages: Message[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
