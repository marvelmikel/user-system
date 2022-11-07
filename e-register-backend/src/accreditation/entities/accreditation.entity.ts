import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import { User } from 'src/user/entities/user.entity';

enum StatusEnum {
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
  ACTIVE = 'ACTIVE',
}
@Entity()
@ObjectType()
export class Accreditation {
  @ObjectIdColumn()
  @Field(() => ID)
  _id: string;

  @Column()
  @Field(() => ID, { defaultValue: null, nullable: true })
  categoryId: string;

  @Column()
  @Field(() => ID, { defaultValue: null, nullable: true })
  subcategoryId: string;

  @Column()
  @Field(() => ID, { defaultValue: null, nullable: true })
  userId: string;

  @Column()
  @Field({ defaultValue: false })
  accredited: boolean;

  @Column()
  @Field({ defaultValue: false })
  isDeleted: boolean;

  @Field(() => String, {
    defaultValue: StatusEnum.PENDING,
    nullable: true,
  })
  status: string;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  dateAccredited: string;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  dateCreated: string;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  expiryDate: string;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  proofOfPayment: string;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  supportingDocument: string;

  @Field(() => Category, { nullable: true })
  category: Category;

  @Field(() => Subcategory, { nullable: true })
  subcategory: Subcategory;

  @Field(() => User, { nullable: true })
  user: User;
}
