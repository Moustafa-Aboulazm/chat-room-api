 

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//mport { Types } from 'mongoose';
// import { Document, Types } from 'mongoose';
// import { Room } from './room.model';

export type UserDocument = User & Document;

@Schema()
export class User {
  

  @Prop()
  username: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
