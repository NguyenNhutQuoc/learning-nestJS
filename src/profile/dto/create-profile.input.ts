import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field(() => String)
  firstName: string;
  @Field(() => String)
  lastName: string;
  @Field(() => Int)
  age: number;
  @Field(() => String)
  gender: string;
  @Field(() => String)
  phoneNumber: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  address: string;
  @Field(() => ID)
  userId: string;
}
