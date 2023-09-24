import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { TodoModule } from './todo/todo.module';
import { ListModule } from './list/list.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { IntegrationModule } from './integration/integration.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DB_URL'),
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: true,
        playground: configService.get('GRAPHQL_PLAYGROUND') === 'true',
        fieldResolverEnhancers: ['guards'],
      }),
    }),
    TodoModule,
    ListModule,
    AuthModule,
    UserModule,
    IntegrationModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
