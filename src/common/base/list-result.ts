import { Field, ObjectType } from '@nestjs/graphql';
import { ClassType } from 'type-graphql';
@ObjectType()
export class ListResult<T> {
  data: T[];
  @Field(() => Number)
  totalCount: number;
  @Field(() => Number)
  pageSize: number;
  @Field(() => Number)
  pageNumber: number;
  @Field(() => String)
  orderBy: string;
  constructor() {
    this.data = [];
    this.totalCount = 0;
    this.pageSize = 10;
    this.pageNumber = 1;
    this.orderBy = '+id';
  }
}

// Create a function to dynamically generate ObjectType classes
export function ListResultGenerateClass<T extends object>(
  classRef: ClassType<T>,
): any {
  @ObjectType({ isAbstract: true })
  abstract class ListResultClass {
    @Field(() => [classRef], { nullable: 'itemsAndList' })
    data: T[];

    @Field(() => Number)
    totalCount: number;

    @Field(() => Number)
    pageSize: number;

    @Field(() => Number)
    pageNumber: number;

    @Field(() => String)
    orderBy: string;
  }
  return ListResultClass;
}
