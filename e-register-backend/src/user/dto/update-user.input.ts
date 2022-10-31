import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';
import {
  ArrayMaxSize,
  ArrayMinSize,
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
  @Field({ defaultValue: null })
  nameOfCompany: string;

  // location is Required
  @IsOptional()
  @MinLength(3)
  @Field({ defaultValue: null })
  location: string;

  // address is Required
  @IsOptional()
  @MinLength(5)
  @Field({ defaultValue: null })
  address: string;

  // RC Number is Required
  @IsOptional()
  @MinLength(5)
  @Field({ defaultValue: null })
  rcNumber: string;

  // TIN is Required
  @IsOptional()
  @MinLength(5)
  @Field({ defaultValue: null })
  tin: string;

  // lastName is Required
  @IsOptional()
  @IsDateString()
  @Field({ defaultValue: null })
  dateOfIncorporation: string;

  // phoneNumber
  @IsOptional()
  @IsMobilePhone()
  @Field({ defaultValue: null })
  phoneNumber: string;

  @IsOptional()
  @Field({ defaultValue: null })
  certificateOfIncorporation: Upload;

  @IsOptional()
  @Field({ defaultValue: null })
  certificateOfTaxClearance: Upload;

  @IsOptional()
  @Field({ defaultValue: null })
  applicationLetter: Upload;

  @IsOptional()
  @Field({ defaultValue: null })
  evidenceOfPayment: Upload;

  @IsOptional()
  @Field({ defaultValue: null })
  letterOfCredibilityFromBanks: Upload;

  @IsOptional()
  @Field({ defaultValue: null })
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
  @Field({ defaultValue: null })
  uploadProfilePic: Upload;
}
