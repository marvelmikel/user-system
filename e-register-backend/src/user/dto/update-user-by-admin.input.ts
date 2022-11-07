import { InputType, Field } from '@nestjs/graphql';
import { UpdateUserInput } from './update-user.input';

@InputType()
export class UpdateUserInputByAdmin extends UpdateUserInput {
  @Field(() => Boolean, { nullable: true })
  isCertificateOfIncorporation: boolean;

  @Field(() => Boolean, { nullable: true })
  isCertificateOfTaxClearance: boolean;

  @Field(() => Boolean, { nullable: true })
  isApplicationLetter: boolean;

  @Field(() => Boolean, { nullable: true })
  isEvidenceOfPayment: boolean;

  @Field(() => Boolean, { nullable: true })
  isLetterOfCredibilityFromBanks: boolean;

  @Field(() => Boolean, { nullable: true })
  isCollaborationCertificateWithForeignPartners: boolean;

  @Field(() => Boolean, { nullable: true })
  isCurriculumVitae: boolean;

  @Field(() => Boolean, { nullable: true })
  isBoardOfDirectorsInput: boolean;
}
