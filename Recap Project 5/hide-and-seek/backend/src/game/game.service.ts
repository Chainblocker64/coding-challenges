import { Injectable } from '@nestjs/common';

export type Role = 'hider' | 'seeker';

export type GameStatus = 'waiting' | 'running' | 'finished';

export type Player = {
  clientId: string;
  position: Position;
  role: Role;
};

export type Position = {
  x: number;
  y: number;
};

export type Game = {
  players: Player[];
  status: GameStatus;
  timer: number;
};

@Injectable()
export class GameService {}
