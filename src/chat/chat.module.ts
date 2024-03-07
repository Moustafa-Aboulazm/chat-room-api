// src/chat/chat.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
 
import { ChatService } from './chat.service';
import { Message, MessageSchema } from './entities/message.model';
import { Room, RoomSchema } from './entities/room.model';
import { User, UserSchema } from './entities/user.model';
import { ChatController } from './chat.controller';
import { SocketGateway } from 'src/socket/socket.gateway';
 
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService, SocketGateway],
})
export class ChatModule {}
