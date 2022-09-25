import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLogInput {
  @Field()
  info: string;
  @Field()
  by: string;
  @Field()
  isAdmin?: boolean;
}
