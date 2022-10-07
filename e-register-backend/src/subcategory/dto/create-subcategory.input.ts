import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubcategoryInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  categoryId: string;
}
