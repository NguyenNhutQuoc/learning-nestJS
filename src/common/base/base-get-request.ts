import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumberString } from 'class-validator';

@InputType()
export class BaseRequest {
  @IsNumberString()
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  pageSize: number;
  @IsNumberString()
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  pageIndex: number;

  @Field(() => String, { nullable: false, defaultValue: '+id' })
  orderBy: string;
}
