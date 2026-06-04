import { Module } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentController],
  providers: [CommentRepository, CommentService],
})
export class CommentModule {}
