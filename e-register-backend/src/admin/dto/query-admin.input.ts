import { Field, Int, InputType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class CustomQuery {
  //  search text
  @Field(() => String)
  search = null;

  //  page
  @Field(() => Int)
  @Min(1)
  skip = 1;

  //  size
  @Field(() => Int)
  @Min(1)
  @Max(50)
  size = 25;

  //  search text
  @Field(() => String)
  categoryId = null;

  //  search text
  @Field(() => String)
  subcategoryId = null;

  //  search text
  @Field(() => Boolean)
  isDeleted = false;
}
