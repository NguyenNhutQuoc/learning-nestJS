import { Field, InputType } from '@nestjs/graphql';
import { BaseRequest } from 'src/common/base/base-get-request';
import { IsEmail, IsUUID } from 'class-validator';

@InputType()
export class GetUserRequest extends BaseRequest {
  @IsUUID()
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string;

  @IsEmail()
  @Field(() => String, { nullable: true })
  email: string;

  constructor() {
    super();
  }
}
