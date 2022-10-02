import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryResolver } from './subcategory.resolver';
import { Subcategory } from './entities/subcategory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModule } from 'src/log/log.module';
import { MailModule } from 'src/mail/mail.module';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subcategory]),
    LogModule,
    MailModule,
    HelperModule,
  ],
  providers: [SubcategoryResolver, SubcategoryService],
  exports: ['SubcategoryService'],
})
export class SubcategoryModule {}
