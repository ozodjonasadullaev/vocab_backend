import {
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {}

  handleDisconnect(client: any) {}

  handleResourceChange(@MessageBody() { data, source }) {
    this.server.emit('resource-changed', { data, source });
  }
}
