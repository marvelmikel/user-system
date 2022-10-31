import { InputType, PartialType, OmitType } from '@nestjs/graphql';
import { CreateAccreditationByAdminInput } from './create-accreditation-admin.input';

@InputType()
export class UpdateAccreditationInput extends PartialType(
  OmitType(CreateAccreditationByAdminInput, ['userId'] as const),
) {}
