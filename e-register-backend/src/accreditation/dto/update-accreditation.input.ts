import { CreateAccreditationInput } from './create-accreditation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccreditationInput extends PartialType(CreateAccreditationInput) {
  @Field(() => Int)
  id: number;
}
