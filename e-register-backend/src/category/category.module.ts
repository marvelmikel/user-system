import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { HelperModule } from 'src/helper/helper.module';
import { LogModule } from 'src/log/log.module';
import { SubcategoryModule } from 'src/subcategory/subcategory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    MailModule,
    HelperModule,
    LogModule,
    SubcategoryModule,
  ],
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
