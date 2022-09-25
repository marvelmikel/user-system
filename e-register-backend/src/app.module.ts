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
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './utils/config/env.config';

const envFilePath: string = getEnvPath(`${__dirname}/utils/env`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DATABASE_URL,
      synchronize: true,
      useUnifiedTopology: true,
      entities: ['dist/**/*.entity.js'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: false,
      playground: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    AdminModule,
    MailModule,
    HelperModule,
    LogModule,
    UserModule,
    AccreditationModule,
  ],
  providers: [Upload],
})
export class AppModule {}
