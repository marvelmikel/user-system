import { Module } from '@nestjs/common';
import { AccreditationService } from './accreditation.service';
import { AccreditationResolver } from './accreditation.resolver';
import { Accreditation } from './entities/accreditation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { HelperModule } from 'src/helper/helper.module';
import { LogModule } from 'src/log/log.module';
import { CategoryModule } from 'src/category/category.module';
import { SubcategoryModule } from 'src/subcategory/subcategory.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accreditation]),
    MailModule,
    HelperModule,
    LogModule,
    CategoryModule,
    SubcategoryModule,
    UserModule,
  ],
  providers: [AccreditationResolver, AccreditationService],
  exports: [AccreditationService],
})
export class AccreditationModule {}
