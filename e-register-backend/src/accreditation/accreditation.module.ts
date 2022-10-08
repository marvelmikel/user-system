import { Module } from '@nestjs/common';
import { AccreditationService } from './accreditation.service';
import { AccreditationResolver } from './accreditation.resolver';
import { Accreditation } from './entities/accreditation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { HelperModule } from 'src/helper/helper.module';
import { LogModule } from 'src/log/log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accreditation]),
    MailModule,
    HelperModule,
    LogModule,
  ],
  providers: [AccreditationResolver, AccreditationService],
  exports: [AccreditationService],
})
export class AccreditationModule {}
