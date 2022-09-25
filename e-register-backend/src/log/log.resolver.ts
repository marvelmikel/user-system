import { Resolver } from '@nestjs/graphql';
import { Log } from './entities/log.entity';
import { LogService } from './log.service';

@Resolver(() => Log)
export class LogResolver {
  constructor(private readonly logService: LogService) {}
}
