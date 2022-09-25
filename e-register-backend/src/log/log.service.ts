import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLogInput } from './dto/create-log.input';
import { Log } from './entities/log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  create(createLogInput: CreateLogInput) {
    const newLog = this.logRepository.create({ ...createLogInput });
    this.logRepository.save(newLog);
  }

  findAll() {
    return `This action returns all log`;
  }

  findOne(id: number) {
    return `This action returns a #${id} log`;
  }

  remove(id: number) {
    return `This action removes a #${id} log`;
  }
}
