import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { Accreditation } from 'src/accreditation/entities/accreditation.entity';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

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
  @Field(() => String, { defaultValue: false })
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
  @Field(() => String, { defaultValue: null, nullable: true })
  profilePic: string;

  @Field(() => [Accreditation], { nullable: true })
  accreditation: Accreditation[];
}

@ObjectType()
export class Document {
  @Field(() => String, { nullable: true })
  file: string;

  @Field(() => String, { nullable: true })
  title: string;
}
