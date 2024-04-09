import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateUserSettingInput {
  @Field(() => String)
  name: string;

  @Field(() => Boolean, {
    defaultValue: true,
  })
  receiveEmails: boolean;

  @Field(() => Boolean, {
    defaultValue: true,
  })
  receivePushNotifications: boolean;

  @Field(() => Boolean, {
    defaultValue: true,
  })
  receiveSmsNotifications: boolean;

  @Field(() => Boolean, {
    defaultValue: true,
  })
  receiveTextMessages: boolean;

  @Field(() => Boolean, {
    defaultValue: true,
  })
  receiveVoiceMessages: boolean;

  @Field(() => ID)
  userId: string;
}
