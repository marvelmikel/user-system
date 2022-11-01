import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { Upload } from './scalar/upload.scalar';
import { MailModule } from './mail/mail.module';
import { HelperModule } from './helper/helper.module';
import { LogModule } from './log/log.module';
import { UserModule } from './user/user.module';
import { AccreditationModule } from './accreditation/accreditation.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvPath } from './utils/config/env.config';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { GlobalController } from './global/global.controller';

const envFilePath: string = getEnvPath(`${__dirname}/utils/env`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mongodb',
        url: config.get('DATABASE_URL'),
        synchronize: true,
        useUnifiedTopology: true,
        entities: ['dist/**/*.entity.js'],
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: false,
      playground: true,
      cors: {
        origin: '*',
        credentials: true,
      },
      context: ({ req }) => ({ headers: req.headers }),
    }),

    // test
    AdminModule,
    MailModule,
    HelperModule,
    LogModule,
    UserModule,
    AccreditationModule,
    CategoryModule,
    SubcategoryModule,
  ],
  providers: [Upload],
  controllers: [GlobalController],
})
export class AppModule {}
