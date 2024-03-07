 
import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Message } from './entities/message.model';
import { Room } from './entities/room.model';
import { User } from './entities/user.model';
import { SocketGateway } from 'src/socket/socket.gateway';
 
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly socketGateway: SocketGateway,
  ) {}

  @Get('users')
  async getUsers(): Promise<User[]> {
    return this.chatService.getUsers();
  }

  @Post('users')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() user: User): Promise<User> {
    return this.chatService.createUser(user);
  }

  @Get('rooms')
  async getRooms(): Promise<Room[]> {
    return this.chatService.getRooms();
  }

  @Post(':roomId/messages')
  async sendMessage(
    @Param('roomId') roomId: string,
    @Body() message: Message,
  ): Promise<Message> {
    const sentMessage = this.chatService.sendMessage(roomId, message);
  
  const  x:any=   this.socketGateway.handleSendMessage({
       roomId,
       message: { text: message.text, user: message.user },

     });
     console.log("x",x)

    return sentMessage;
  }

  @Post('rooms')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createRoom(@Body() room: Room): Promise<Room> {
    return this.chatService.createRoom(room);
  }

  @Post('rooms/:roomId/users/:userId')
  async joinRoom(@Param('roomId') roomId: string, @Param('userId') userId: string): Promise<void> {
   
    this.socketGateway.server.to(roomId).emit('userJoined', { roomId, userId });
    return await this.chatService.joinRoom(roomId, userId);
  }
 
  

  @Get('rooms/:roomId/messages')
  async getMessages(@Param('roomId') roomId: string): Promise<Message[]> {
    return this.chatService.getMessages(roomId);
  }
}
