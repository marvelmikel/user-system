import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Admin')
export class AdminType {
  @Field((type) => ID)
  id: string;
  @Field()
  firstname: string;
  @Field()
  middlename: string;
  @Field()
  lastname: string;
  @Field()
  email: string;
  @Field()
  credentials: string;
}
