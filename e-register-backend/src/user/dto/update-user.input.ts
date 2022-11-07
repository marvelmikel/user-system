import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';
import {
  ArrayMaxSize,
  IsDateString,
  IsMobilePhone,
  IsOptional,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Upload } from 'src/scalar/upload.scalar';
import { DocumentInput } from './documents-user.input';

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['email', 'credential'] as const),
) {
  // firstName is Required
  @IsOptional()
  @MinLength(5)
  @Field(() => String, { nullable: true })
  nameOfCompany: string;

  // location is Required
  @IsOptional()
  @MinLength(3)
  @Field(() => String, { nullable: true })
  location: string;

  // address is Required
  @IsOptional()
  @MinLength(5)
  @Field(() => String, { nullable: true })
  address: string;

  // RC Number is Required
  @IsOptional()
  @MinLength(5)
  @Field(() => String, { nullable: true })
  rcNumber: string;

  // TIN is Required
  @IsOptional()
  @MinLength(5)
  @Field(() => String, { nullable: true })
  tin: string;

  // lastName is Required
  @IsOptional()
  @IsDateString()
  @Field(() => String, { nullable: true })
  dateOfIncorporation: string;

  // phoneNumber
  @IsOptional()
  @IsMobilePhone()
  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @IsOptional()
  @Field(() => Upload, { nullable: true })
  certificateOfIncorporation: Upload;

  @IsOptional()
  @Field(() => Upload, { nullable: true })
  certificateOfTaxClearance: Upload;

  @IsOptional()
  @Field(() => Upload, { nullable: true })
  applicationLetter: Upload;

  @IsOptional()
  @Field(() => Upload, { nullable: true })
  evidenceOfPayment: Upload;

  @IsOptional()
  @Field(() => Upload, { nullable: true })
  letterOfCredibilityFromBanks: Upload;

  @IsOptional()
  @Field(() => Upload, { nullable: true })
  collaborationCertificateWithForeignPartners: Upload;

  @IsOptional()
  @Field(() => [DocumentInput], { defaultValue: [] })
  @ArrayMaxSize(2)
  @ValidateNested({ each: true })
  curriculumVitaeInput: DocumentInput[];

  @IsOptional()
  @Field(() => [DocumentInput], { defaultValue: [] })
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  boardOfDirectorsInput: DocumentInput[];

  @IsOptional()
  @Field(() => Upload, { nullable: true })
  uploadProfilePic: Upload;
}
