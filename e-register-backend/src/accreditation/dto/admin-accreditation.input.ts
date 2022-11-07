import { CreateAccreditationInput } from './create-accreditation.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class AdminUpdateAccreditationInput extends PartialType(
  CreateAccreditationInput,
) {
  @Field(() => Boolean, { nullable: true })
  accredited: boolean;
}
