import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CustomQuery } from 'src/admin/dto/query-admin.input';

@InputType()
export class AccreditationQuery extends (CustomQuery as new () => Omit<
  CustomQuery,
  'search'
>) {
  //  search text
  @IsMongoId()
  @Field(() => String)
  userId = null;
}
