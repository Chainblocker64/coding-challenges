import { Test, TestingModule } from '@nestjs/testing';
import { ThreadRepository } from './thread.repository';

describe('ThreadService', () => {
  let service: ThreadRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreadRepository],
    }).compile();

    service = module.get<ThreadRepository>(ThreadRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
