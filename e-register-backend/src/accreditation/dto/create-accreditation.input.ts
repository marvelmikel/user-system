import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAccreditationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
