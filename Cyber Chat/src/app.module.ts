import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentModule } from './comment/comment.module';
import { ThreadModule } from './thread/thread.module';

@Module({
  imports: [CommentModule, ThreadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
