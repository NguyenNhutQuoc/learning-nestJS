import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class BaseRequest {
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  pageSize: number;
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  pageIndex: number;
  @Field(() => String, { nullable: false, defaultValue: '+id' })
  orderBy: string;
}
