import { Injectable } from '@nestjs/common';
import { randomUUID, UUID } from 'node:crypto';

export type Role = 'hider' | 'seeker';

export type GameStatus = 'waiting' | 'running' | 'finished';

export type ClientId = string;

export type Player = {
  position: Position;
  role: Role;
};

export type Position = {
  x: number;
  y: number;
};

export type NewGame = {
  status: 'waiting';
  timer: number;
};

export type Game = {
  status: GameStatus;
  timer: number;
  players: Record<ClientId, Player>;
};

export const MAX_PLAYERS = 2;
export const ROUND_TIME = 60;
export const HIDER_START_POSITION = { x: 1, y: 1 };
export const SEEKER_START_POSITION = { x: 10, y: 10 };

@Injectable()
export class GameService {
  games: Map<UUID, Game>;

  constructor() {
    this.games = new Map<UUID, Game>();
  }

  startNewGame(roomId: UUID, hiderId: ClientId, seekerId: ClientId): Game {
    const game = this.initNewGame(roomId, hiderId, seekerId);
    this.games.set(roomId, game);
    return game;
  }

  getGame(roomId: UUID): Game | undefined {
    return this.games?.get(roomId);
  }

  freeGame(): Game | undefined {
    //Check if an existing game has a free slot
    for (const [, game] of this.games) {
      if (game.status === 'waiting') {
        return game;
      }
    }
  }

  addPlayer(clientId: ClientId) {
    const game = this.freeGame();

    if (!game) {
      this.initNewGame(clientId);
      return;
    }

    for (const [clientId, player] of Object.entries(game.players)) {
    }
  }

  initFirstPlayer(): Player {
    const role = this.randomRole();
    const position =
      role === 'hider' ? HIDER_START_POSITION : SEEKER_START_POSITION;

    return {
      position: position,
      role: role,
    };
  }

  initNewGame(clientId: ClientId): Game {
    const player = this.initFirstPlayer();

    return {
      status: 'waiting',
      timer: ROUND_TIME,
      players: { [clientId]: player },
    };
  }

  playerCount(game: Game): number {
    return Object.keys(game).length;
  }

  randomRole(): Role {
    if (Math.random() >= 0.5) {
      return 'seeker';
    } else {
      return 'hider';
    }
  }
}
