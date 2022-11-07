import { Field, InputType } from '@nestjs/graphql';
import { CustomQuery } from 'src/admin/dto/query-admin.input';

@InputType()
export class AccreditationQuery extends (CustomQuery as new () => Omit<
  CustomQuery,
  'search'
>) {
  //  search text
  @Field(() => String)
  userId = null;
}
