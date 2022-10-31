import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @ObjectIdColumn()
  @Field(() => ID)
  _id: string;

  @Column()
  @Field({ nullable: true })
  nameOfCompany: string;

  @Field({ nullable: true })
  token: string;

  @Column()
  @Field({ nullable: true })
  location: string;

  @Column()
  @Field({ nullable: true })
  address: string;

  @Column()
  @Field({ nullable: true })
  rcNumber: string;

  @Column()
  @Field({ nullable: true })
  dateOfIncorporation: string;

  @Column()
  @Field({ nullable: true })
  tin: string;

  @Column()
  @Field({ nullable: true })
  email: string;

  @Column()
  @Field({ defaultValue: false })
  isEmailActive: boolean;

  @Column()
  @Field({ nullable: true })
  phoneNumber: string;

  @Column()
  @Field({ defaultValue: true })
  isActive: boolean;

  @Column()
  credential: string;

  // documents to upload
  @Column()
  @Field({ nullable: true })
  certificateOfIncorporation: string;

  @Column()
  @Field({ defaultValue: false })
  isCertificateOfIncorporation: boolean;

  @Column()
  @Field({ nullable: true })
  certificateOfTaxClearance: string;

  @Column()
  @Field({ defaultValue: false })
  isCertificateOfTaxClearance: boolean;

  @Column()
  @Field({ nullable: true })
  applicationLetter: string;

  @Column()
  @Field({ defaultValue: false })
  isApplicationLetter: boolean;

  @Column()
  @Field({ nullable: true })
  evidenceOfPayment: string;

  @Column()
  @Field({ defaultValue: false })
  isEvidenceOfPayment: boolean;

  @Column()
  @Field({ nullable: true })
  letterOfCredibilityFromBanks: string;

  @Column()
  @Field({ defaultValue: false })
  isLetterOfCredibilityFromBanks: boolean;

  @Column()
  @Field({ nullable: true })
  collaborationCertificateWithForeignPartners: string;

  @Column()
  @Field({ defaultValue: false })
  isCollaborationCertificateWithForeignPartners: boolean;

  @Column()
  @Field(() => [Document], { defaultValue: [], nullable: true })
  @ValidateNested({ each: true })
  curriculumVitae: Document[];

  @Column()
  @Field({ defaultValue: false, nullable: true })
  isCurriculumVitae: boolean;

  @Column()
  @Field(() => [Document], { defaultValue: [], nullable: true })
  @ValidateNested({ each: true })
  boardOfDirectors: Document[];

  @Column()
  @Field({ defaultValue: false })
  isBoardOfDirectorsInput: boolean;

  @Column()
  @Field({ defaultValue: false })
  isDeleted: boolean;

  @Column()
  @Field({ nullable: true })
  profilePic: string;
}

@ObjectType()
export class Document {
  @Field(() => String, { nullable: true })
  file: string;

  @Field(() => String, { nullable: true })
  title: string;
}
