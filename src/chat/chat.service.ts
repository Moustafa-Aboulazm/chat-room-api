// src/chat/services/chat.service.ts
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './entities/message.model';
import { Room, RoomDocument } from './entities/room.model';
import { User, UserDocument } from './entities/user.model';
import { MessageSentEvent, UserJoinedEvent } from 'src/eve/event';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private eventEmitter: EventEmitter2
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async getRooms(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async createRoom(room: Room): Promise<Room> {
    const createdRoom = new this.roomModel(room);
    return createdRoom.save();
  }

  async joinRoom(roomId: string, userId: string): Promise<void> {
    const room = await this.roomModel.findById(roomId).exec();
    const user = await this.userModel.findById(userId).exec();

    if (room && user) {
 
    
        room.users.push(user);
      //  user.rooms.push(room._id);
        await room.save();
        await user.save();

        // Emit UserJoinedEvent
    const r: any=    this.eventEmitter.emit('userJoined', new UserJoinedEvent(roomId, userId));
    console.log(r);

      
    }
  }

  

  async sendMessage(roomId: string, message: Message): Promise<Message> {
    const room = await this.roomModel.findById(roomId).exec();
    const user = await this.userModel.findById(message.user).exec();

    if (room && user) {

      const createdMessage = new this.messageModel({ ...message, user });
      room.messages.push(createdMessage);
      await room.save();
      const savedMessage = await createdMessage.save();

      // Emit MessageSentEvent
   const y:any=   this.eventEmitter.emit('newMessage', new MessageSentEvent(roomId, savedMessage, user));

   console.log(y);
      return savedMessage;
    }
  }

  async getMessages(roomId: string): Promise<Message[]> {
    return this.messageModel.find({ room: roomId }).exec();
  }
}
