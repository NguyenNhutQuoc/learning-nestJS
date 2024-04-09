import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('user_settings')
export class UserSetting {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Boolean, {
    defaultValue: true,
  })
  receiveEmails: boolean;

  @Column()
  @Field(() => Boolean, {
    defaultValue: true,
  })
  receivePushNotifications: boolean;

  @Column()
  @Field(() => Boolean, {
    defaultValue: true,
  })
  receiveSmsNotifications: boolean;

  @Column()
  @Field(() => Boolean, {
    defaultValue: true,
  })
  receiveTextMessages: boolean;

  @Column()
  @Field(() => Boolean, {
    defaultValue: true,
  })
  receiveVoiceMessages: boolean;

  @ManyToOne(() => User, (user) => user.userSettings)
  @JoinColumn()
  @Field(() => User)
  user: User;
}
