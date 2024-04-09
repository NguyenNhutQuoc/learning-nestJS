import { CreateUserSettingInput } from './create-user-setting.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserSettingInput extends PartialType(
  CreateUserSettingInput,
) {
  @Field(() => ID)
  id: string;
}
