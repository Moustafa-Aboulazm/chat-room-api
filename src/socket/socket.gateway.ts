// src/socket/socket.gateway.ts

import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageSentEvent } from 'src/eve/event';
@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly eventEmitter: EventEmitter2) {
    // Listen for the 'newMessage' event
    this.eventEmitter.on('newMessage', (event: MessageSentEvent) => {
      this.server.to(event.roomId).emit('newMessage', event.message);
    });

    this.eventEmitter.on('userJoined', (event: MessageSentEvent) => {
      this.server.to(event.roomId).emit('userJoined', event.message);
    });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    client: any,
    payload: { roomId: string; userId: string },
  ): void {
    const { roomId, userId } = payload;
    client.join(roomId);
    this.server.to(roomId).emit('userJoined', { roomId, userId });
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(payload: {
    roomId: string;
    message: { text: string; user: string };
  }): void {
    const { roomId, message } = payload;
    this.server.to(roomId).emit('newMessage', message);
  }
}
