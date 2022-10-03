import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CustomQuery } from 'src/admin/dto/query.input';

@InputType()
export class AccreditationQuery extends (CustomQuery as new () => Omit<
  CustomQuery,
  'search'
>) {
  //  search text
  @IsMongoId()
  @Field(() => String)
  categoryId = null;

  //  search text
  @IsMongoId()
  @Field(() => String)
  subcategoryId = null;

  //  search text
  @IsMongoId()
  @Field(() => String)
  userId = null;

  //  search text
  @Field(() => Boolean)
  isDeleted = false;
}
