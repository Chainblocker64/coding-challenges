import { Injectable } from '@nestjs/common';
import { ThreadRepository } from './thread.repository';

@Injectable()
export class ThreadService {
  constructor(private readonly threadRepository: ThreadRepository) {}
}
