import { Injectable } from '@nestjs/common';

export type Role = 'hider' | 'seeker';

@Injectable()
export class GameService {}
