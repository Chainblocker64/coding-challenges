import {
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

const MAX_PLAYERS = 2;

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
    const role = this.newRole(roomId);

    const room = this.rooms.get(roomId);

    if (room) {
      this.rooms.set(roomId, { ...room, [client.id]: role });
    } else {
      this.rooms.set(roomId, { [client.id]: role });
    }

    void client.join(roomId);

    if (this.userCount(roomId) === MAX_PLAYERS) {
      this.emitUserRoles(roomId);
    }

    client.on('disconnecting', () => {
      this.handleDisconnecting(client);
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleDisconnecting(client: Socket) {
    const allRooms = Array.from(client.rooms) as UUID[];
    const gameRooms = allRooms.filter((room) => room !== client.id);

    gameRooms.forEach((roomId) => {
      const room = this.rooms.get(roomId);

      if (!room) {
        return;
      }

      delete room[client.id];

      if (Object.keys(room).length === 0) {
        this.rooms.delete(roomId);
      } else {
        this.rooms.set(roomId, room);
      }
    });
  }

  emitUserRoles(roomId: UUID) {
    const room = this.rooms.get(roomId);

    if (room && this.userCount(roomId) == MAX_PLAYERS) {
      for (const [clientId, role] of Object.entries(room)) {
        this.server.to(clientId).emit('roleAssigned', role);
      }
    }
  }

  userCount(roomId: string): number {
    return this.server.sockets.adapter.rooms.get(roomId)?.size || 0;
  }

  freeRoom(): UUID {
    for (const [roomId] of this.rooms) {
      if (this.userCount(roomId) < MAX_PLAYERS) {
        return roomId;
      }
    }
    return randomUUID();
  }

  newRole(roomId: UUID): Role {
    const room = this.rooms.get(roomId);

    if (room) {
      for (const [, clientRole] of Object.entries(room)) {
        if (clientRole === 'seeker') {
          return 'hider';
        } else {
          return 'seeker';
        }
      }
    }

    if (Math.random() >= 0.5) {
      return 'seeker';
    } else {
      return 'hider';
    }
  }

  initGame(roomId: UUID) {}

  @SubscribeMessage('login')
  handleLogin(@MessageBody() data: { connected: boolean; test: number }) {
    console.log('user logged in');
    console.log(data);
    this.server.emit('login', { success: true, userId: Math.random() * 150 });
  }
}
