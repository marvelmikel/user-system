'use strict';
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { MailModule } from 'src/mail/mail.module';
import { HelperModule } from 'src/helper/helper.module';
import { LogModule } from 'src/log/log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    MailModule,
    HelperModule,
    LogModule,
  ],
  providers: [AdminResolver, AdminService],
})
export class AdminModule {}
