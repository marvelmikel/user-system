import { InputType, Field } from '@nestjs/graphql';
import { UpdateUserInput } from './update-user.input';

@InputType()
export class UpdateUserInputByAdmin extends UpdateUserInput {
  @Field({ defaultValue: false })
  isCertificateOfIncorporation: boolean;

  @Field({ defaultValue: false })
  isCertificateOfTaxClearance: boolean;

  @Field({ defaultValue: false })
  isApplicationLetter: boolean;

  @Field({ defaultValue: false })
  isEvidenceOfPayment: boolean;

  @Field({ defaultValue: false })
  isLetterOfCredibilityFromBanks: boolean;

  @Field({ defaultValue: false })
  isCollaborationCertificateWithForeignPartners: boolean;

  @Field({ defaultValue: false })
  isCurriculumVitae: boolean;

  @Field({ defaultValue: false })
  isBoardOfDirectorsInput: boolean;
}
