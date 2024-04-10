import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { ProfileModule } from './profile/profile.module';
import { AppDataSource } from './data/data-source';
import { AuthModule } from './common/middleware/security/auth/auth.module';
import { Profile } from './profile/entities/profile.entity';
import { UserSetting } from './user-settings/entities/user-setting.entity';
import { User } from './user/entities/user.entity';

config();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
    UserModule,
    UserSettingsModule,
    ProfileModule,
    AuthModule,
    TypeOrmModule.forFeature([User, UserSetting, Profile]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
