import { Field, InputType, PartialType } from '@nestjs/graphql';
import { BaseRequest } from 'src/common/base/base-get-request';
import { IsEmail, IsUUID } from 'class-validator';

@InputType()
export class GetUserRequest extends PartialType(BaseRequest) {
  @IsUUID()
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string;

  @IsEmail()
  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  password: string;

  constructor() {
    super();
  }
}
