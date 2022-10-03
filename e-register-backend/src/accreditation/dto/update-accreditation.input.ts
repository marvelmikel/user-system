import { CreateAccreditationInput } from './create-accreditation.input';
import { InputType, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateAccreditationInput extends PartialType(
  OmitType(CreateAccreditationInput, ['userId'] as const),
) {}
