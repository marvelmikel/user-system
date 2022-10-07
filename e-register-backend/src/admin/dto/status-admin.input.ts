import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AdminStatusInput {
  @Field()
  isActive?: boolean;
}
