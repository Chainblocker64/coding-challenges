import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { randomUUID, UUID } from 'node:crypto';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
import type { Role } from './game.service';

type Room = Record<string, Role>;

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
  },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  rooms = new Map<UUID, Room>();

  constructor(private readonly gameService: GameService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    const roomId = this.freeRoom();
    client.join(roomId);

    const role = this.newRole(roomId);

    this.rooms.set(roomId, { ...room, [client.id]: role });

    ////
    void client.join(this.latestRoom.toString());
    console.log(`Client ${client.id} joined room ${this.latestRoom}`);

    console.log(
      `User count for room ${this.latestRoom}} is currently ${this.currentUserCount()}`,
    );
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  userCount(roomId: string): number {
    return this.server.sockets.adapter.rooms.get(roomId)?.size || 0;
  }

  freeRoom() {
    this.rooms.forEach((room, roomId) => {
      if (this.userCount(roomId) < 2) {
        return roomId;
      }
    });

    return randomUUID();
  }

  newRole(roomId: UUID): Role {
    const room = this.rooms.get(roomId);

    let role = '';

    if (room) {
      for (const [clientRole] of Object.values(room)) {
        if (clientRole === 'seeker') {
          role = 'hider';
        } else {
          role = 'seeker';
        }
      }
    } else {
      if (Math.random() >= 0.5) {
        role = 'seeker';
      } else {
        role = 'seeker';
      }
    }

    return role;
  }

  @SubscribeMessage('login')
  handleLogin(@MessageBody() data: { connected: boolean; test: number }) {
    console.log('user logged in');
    console.log(data);
    this.server.emit('login', { success: true, userId: Math.random() * 150 });
  }
}
