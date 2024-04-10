import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Profile } from 'src/profile/entities/profile.entity';
import { UserSetting } from 'src/user-settings/entities/user-setting.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @OneToMany(() => UserSetting, (userSetting) => userSetting.user)
  @Field(() => [UserSetting])
  userSettings: UserSetting[];

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  @Field(() => Profile, { nullable: true })
  profile: Profile;

  @Column({ default: true })
  @Field(() => Boolean)
  isActive: boolean;

  @Column({ default: false })
  @Field(() => Boolean)
  isAdmin: boolean;

  @Field(() => String)
  access_token: string;
}
