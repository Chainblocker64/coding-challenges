import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ThreadRepository } from './thread.repository';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('threads')
export class ThreadController {
  constructor(private readonly threadRepository: ThreadRepository) {}

  @ApiOperation({ summary: 'Create a new thread' })
  @Post()
  create(@Body() createThreadDto: CreateThreadDto) {
    return this.threadRepository.create(createThreadDto);
  }

  @ApiOperation({ summary: 'Get all threads' })
  @Get()
  findAll() {
    return this.threadRepository.findAll();
  }

  @ApiOperation({ summary: 'Get a single thread by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.threadRepository.findOne(+id);
  }

  @ApiOperation({ summary: 'Create a comment for a thread' })
  @Post(':id/comments')
  createComment(
    @Param('id') id: string,
    @Body() updateThreadDto: UpdateThreadDto,
  ) {
    return this.threadRepository.update(+id, updateThreadDto);
  }

  @ApiOperation({ summary: 'Delete a thread' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.threadRepository.remove(+id);
  }
}
