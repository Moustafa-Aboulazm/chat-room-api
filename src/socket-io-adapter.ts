// socket-io.adapter.ts
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketIo from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: socketIo.ServerOptions): any {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: true,
        credentials: true},
    });
    // No need to add CORS middleware here
    return server;
  }
}
