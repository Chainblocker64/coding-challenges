import { Controller, Get, Param, Delete } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { ApiOperation } from '@nestjs/swagger';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentRepository: CommentRepository) {}

  @ApiOperation({ summary: 'Get all comments' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentRepository.findOne(+id);
  }

  @ApiOperation({ summary: 'Delete a comment' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentRepository.remove(+id);
  }
}
