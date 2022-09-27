import { Field, Int, InputType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class CustomQuery {
  //  search text
  @Field(() => String)
  search = null;

  //  page
  @Field(() => Int)
  @Min(0)
  skip = 0;

  //  size
  @Field(() => Int)
  @Min(1)
  @Max(50)
  size = 25;
}
