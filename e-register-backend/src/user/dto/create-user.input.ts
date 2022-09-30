import { InputType, Field } from '@nestjs/graphql';
import {
  MinLength,
  IsMobilePhone,
  IsEmail,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';
import { Upload } from 'src/scalar/upload.scalar';
import { DocumentInput } from './documents-user.input';

@InputType()
export class CreateUserInput {
  // firstName is Required
  @MinLength(5)
  @Field()
  nameOfCompany: string;
  // location is Required
  @MinLength(3)
  @Field()
  location: string;
  // address is Required
  @MinLength(5)
  @Field()
  address: string;
  // RC Number is Required
  @MinLength(5)
  @Field()
  rcNumber: string;
  // lastName is Required
  @MinLength(5)
  @Field()
  dateOfIncorporation: string;
  // email is Required
  @IsEmail()
  @Field()
  email: string;

  // phoneNumber
  @IsMobilePhone()
  @Field({ defaultValue: null })
  phoneNumber: string;
  // password required
  @MinLength(10)
  @Field()
  credential: string;

  @IsNotEmptyObject()
  @Field({ defaultValue: null })
  certificateOfIncorporation: Upload;

  @IsNotEmptyObject()
  @Field({ defaultValue: null })
  certificateOfTaxClearance: Upload;

  @IsNotEmptyObject()
  @Field({ defaultValue: null })
  applicationLetter: Upload;

  @IsNotEmptyObject()
  @Field({ defaultValue: null })
  evidenceOfPayment: Upload;

  @IsNotEmptyObject()
  @Field({ defaultValue: null })
  letterOfCredibilityFromBanks: Upload;

  @IsNotEmptyObject()
  @Field({ defaultValue: null })
  collaborationCertificateWithForeignPartners: Upload;

  @Field(() => [DocumentInput], { defaultValue: [] })
  @ValidateNested({ each: true })
  uploadedDocument: DocumentInput[];
}
