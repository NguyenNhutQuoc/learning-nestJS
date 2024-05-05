import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './common/middleware/security/auth/auth.module';
import { Profile } from './profile/entities/profile.entity';
import { UserSetting } from './user-settings/entities/user-setting.entity';
import { User } from './user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import MongooseAutoPopulate from 'mongoose-autopopulate';
import { MSSQL_SERVER_DATA_SOURCE } from './data/data-source';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }) => ({ req, res }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (service: ConfigService) => ({
        uri: service.get<string>('MONGO_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectionFactory: (connection: Connection) => {
          connection.on('error', (err) => {
            console.error('Error', err);
          });
          connection.on('connected', () => {
            console.log('Mongoose default connection open');
          });
          connection.plugin(MongooseAutoPopulate);
          return connection;
        },
      }),
      connectionName: 'default',
      inject: [ConfigService],
    }),

    UserModule,
    UserSettingsModule,
    ProfileModule,
    AuthModule,
    TypeOrmModule.forRoot({
      ...MSSQL_SERVER_DATA_SOURCE.options,
    }),
    TypeOrmModule.forFeature([User, UserSetting, Profile]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
