import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { SocketIoAdapter } from './socket-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.enableCors();
  app.use(cors({
    origin: true,
  }));
 // app.useWebSocketAdapter();
 app.useWebSocketAdapter(new SocketIoAdapter(app));


  await app.listen(3000);
}
bootstrap();
