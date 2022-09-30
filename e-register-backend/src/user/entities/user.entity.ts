import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { DocumentInput } from '../dto/documents-user.input';

@Entity()
@ObjectType()
export class User {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  nameOfCompany: string;

  @Column()
  @Field()
  location: string;

  @Column()
  @Field()
  address: string;

  @Column()
  @Field()
  rcNumber: string;

  @Column()
  @Field()
  dateOfIncorporation: string;

  @Column()
  @Field()
  tin: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  phoneNumber: string;

  @Column({ type: 'boolean', default: false })
  @Field({ defaultValue: false })
  isEmailActive: boolean;

  @Column({ type: 'boolean', default: true })
  @Field({ defaultValue: true })
  isActive: boolean;

  @Column()
  credential: string;

  // documents
  // to
  // upload
  @Column()
  @Field()
  certificateOfIncorporation: string;

  @Column()
  @Field()
  certificateOfTaxClearance: string;

  @Column()
  @Field()
  applicationLetter: string;

  @Column()
  @Field()
  evidenceOfPayment: string;

  @Column()
  @Field()
  letterOfCredibilityFromBanks: string;

  @Column()
  @Field()
  collaborationCertificateWithForeignPartners: string;

  @Field(() => [Document], { defaultValue: [] })
  @ValidateNested({ each: true })
  document: Document[];
}

@ObjectType()
export class Document {
  @Field(() => String)
  photo: string;

  @Field(() => String)
  title: string;
}
