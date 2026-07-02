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
import { GameService, MAX_PLAYERS } from './game.service';
import type { Role, ClientId } from './game.service';

type ClientRoles = Record<ClientId, Role>;

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
  },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  rooms = new Map<UUID, ClientRoles>();

  constructor(private readonly gameService: GameService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    const roomId = this.freeRoom();
    const role = this.freeRole(roomId);

    const clients = this.getClients(roomId);

    if (clients) {
      this.rooms.set(roomId, { ...clients, [client.id]: role });
    } else {
      this.rooms.set(roomId, { [client.id]: role });
    }

    void client.join(roomId);

    if (this.userCount(roomId) === MAX_PLAYERS) {
      const game = this.startGame(roomId);
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
      const clients = this.getClients(roomId);

      if (!clients) {
        return;
      }

      delete clients[client.id];

      if (Object.keys(clients).length === 0) {
        this.rooms.delete(roomId);
      } else {
        this.rooms.set(roomId, clients);
      }
    });
  }

  emitUserRoles(roomId: UUID) {
    const clients = this.getClients(roomId);

    if (clients && this.userCount(roomId) == MAX_PLAYERS) {
      for (const [clientId, role] of Object.entries(clients)) {
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

  freeRole(roomId: UUID): Role {
    const clients = this.getClients(roomId);

    if (!clients) {
      return this.randomRole();
    }

    for (const [, clientRole] of Object.entries(clients)) {
      if (clientRole === 'seeker') {
        return 'hider';
      } else {
        return 'seeker';
      }
    }

    return this.randomRole();
  }

  randomRole(): Role {
    if (Math.random() >= 0.5) {
      return 'seeker';
    } else {
      return 'hider';
    }
  }

  startGame(roomId: UUID): void {
    const hiderId = this.getClientByRole(roomId, 'hider');
    const seekerId = this.getClientByRole(roomId, 'seeker');

    if (!hiderId || !seekerId) {
      return;
    }

    this.gameService.startNewGame(roomId, hiderId, seekerId);
    console.log(this.gameService.getGame(roomId));
  }

  getClientRole(roomId: UUID, clientId: ClientId) {
    const clientRoles = this.getClients(roomId);

    return clientRoles?.[clientId];
  }

  getClientByRole(roomId: UUID, role: Role): string | undefined {
    const clients = this.getClients(roomId);

    if (!clients) {
      return;
    }

    for (const [clientId, clientRole] of Object.entries(clients)) {
      if (clientRole === role) {
        return clientId;
      }
    }
  }

  getClients(roomId: UUID): ClientRoles | undefined {
    return this.rooms.get(roomId);
  }

  @SubscribeMessage('login')
  handleLogin(@MessageBody() data: { connected: boolean; test: number }) {
    console.log('user logged in');
    console.log(data);
    this.server.emit('login', { success: true, userId: Math.random() * 150 });
  }
}
