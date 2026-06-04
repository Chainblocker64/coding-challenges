import { Module } from '@nestjs/common';
import { ThreadRepository } from './thread.repository';
import { ThreadController } from './thread.controller';
import { ThreadService } from './thread.service';

@Module({
  controllers: [ThreadController],
  providers: [ThreadRepository, ThreadService],
})
export class ThreadModule {}
