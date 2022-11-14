import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { Accreditation } from 'src/accreditation/entities/accreditation.entity';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

enum DocumentEnum {
  certificateOfIncorporation = 'certificateOfIncorporation',
  certificateOfTaxClearance = 'certificateOfTaxClearance',
  applicationLetter = 'applicationLetter',
  evidenceOfPayment = 'evidenceOfPayment',
  letterOfCredibilityFromBanks = 'letterOfCredibilityFromBanks',
  collaborationCertificateWithForeignPartners = 'collaborationCertificateWithForeignPartners',
}
@ObjectType()
export class StepOneDocument {
  @Field(() => String, { nullable: true })
  nameOfCompany: string;
  @Field(() => String, { nullable: true })
  location: string;
  @Field(() => String, { nullable: true })
  address: string;
  @Field(() => String, { nullable: true })
  rcNumber: string;
  @Field(() => String, { nullable: true })
  dateOfIncorporation: string;
  @Field(() => String, { nullable: true })
  tin: string;
  @Field(() => String, { nullable: true })
  phoneNumber: string;
}
@ObjectType()
export class StepTwoDocument {
  @Field(() => String, { nullable: true })
  certificateOfIncorporation: string;
  @Field(() => String, { nullable: true })
  certificateOfTaxClearance: string;
  @Field(() => String, { nullable: true })
  applicationLetter: string;
}
@ObjectType()
export class StepThreeDocument {
  @Field(() => String, { nullable: true })
  letterOfCredibilityFromBanks: string;
  @Field(() => String, { nullable: true })
  evidenceOfPayment: string;
  @Field(() => String, { nullable: true })
  collaborationCertificateWithForeignPartners: string;
}

@Entity()
@ObjectType()
export class UserDocument {
  @ObjectIdColumn()
  @Field(() => ID)
  _id: string;

  @Column()
  @Field(() => String, { nullable: true })
  uploadedFile: string;

  @Column()
  @Field(() => String, { nullable: true })
  title: string;
}
@Entity()
@ObjectType()
export class User {
  @ObjectIdColumn()
  @Field(() => ID)
  _id: string;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  nameOfCompany: string;

  @Field(() => String, { defaultValue: null, nullable: true })
  token: string;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  location: string;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  address: string;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  rcNumber: string;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  dateOfIncorporation: string;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  tin: string;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  email: string;

  @Column()
  @Field({ defaultValue: false })
  isEmailActive: boolean;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  phoneNumber: string;

  @Column()
  @Field({ defaultValue: true })
  isActive: boolean;

  @Column()
  credential: string;

  // documents to upload
  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  certificateOfIncorporation: string;

  @Column()
  @Field({ defaultValue: false })
  isCertificateOfIncorporation: boolean;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  certificateOfTaxClearance: string;

  @Column()
  @Field({ defaultValue: false })
  isCertificateOfTaxClearance: boolean;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  applicationLetter: string;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  description: string;

  @Column()
  @Field({ defaultValue: false })
  isApplicationLetter: boolean;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  evidenceOfPayment: string;

  @Column()
  @Field({ defaultValue: false })
  isEvidenceOfPayment: boolean;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  letterOfCredibilityFromBanks: string;

  @Column()
  @Field({ defaultValue: false })
  isLetterOfCredibilityFromBanks: boolean;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  collaborationCertificateWithForeignPartners: string;

  @Column()
  @Field({ defaultValue: false })
  isCollaborationCertificateWithForeignPartners: boolean;

  @Column()
  @Field(() => [UserDocument], { defaultValue: [], nullable: true })
  @ValidateNested({ each: true })
  curriculumVitae: UserDocument[];

  @Column()
  @Field({ defaultValue: false, nullable: true })
  isCurriculumVitae: boolean;

  @Column()
  @Field(() => [UserDocument], { defaultValue: [], nullable: true })
  @ValidateNested({ each: true })
  boardOfDirectors: UserDocument[];

  @Column()
  @Field({ defaultValue: false })
  isBoardOfDirectorsInput: boolean;

  @Column()
  @Field({ defaultValue: false })
  isDeleted: boolean;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  profilePic: string;

  @Field(() => [Accreditation], { nullable: true })
  accreditation: Accreditation[];
}

@ObjectType()
export class StepDocument {
  @Field(() => StepOneDocument, { nullable: true })
  stepOne: StepOneDocument;
  @Field(() => StepTwoDocument, { nullable: true })
  stepTwo: StepTwoDocument;
  @Field(() => StepThreeDocument, { nullable: true })
  stepThree: StepThreeDocument;
  @Field(() => [UserDocument], { defaultValue: [] })
  stepFour: UserDocument[];
  @Field(() => [UserDocument], { defaultValue: [] })
  stepFive: UserDocument[];
}

@ObjectType()
export class DocumentMainType {
  @Field(() => DocumentEnum, {
    nullable: true,
  })
  type: string;
}
