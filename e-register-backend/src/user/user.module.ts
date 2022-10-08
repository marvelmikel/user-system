import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { HelperModule } from 'src/helper/helper.module';
import { LogModule } from 'src/log/log.module';
import { AccreditationModule } from 'src/accreditation/accreditation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MailModule,
    HelperModule,
    LogModule,
    AccreditationModule,
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
