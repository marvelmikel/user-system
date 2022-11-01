import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AfterLoad, Column, Entity, ObjectIdColumn } from 'typeorm';
import moment from 'moment';

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
  id: string;

  @ObjectIdColumn()
  @Field(() => ID, { defaultValue: null, nullable: true })
  categoryId: string;

  @ObjectIdColumn()
  @Field(() => ID, { defaultValue: null, nullable: true })
  subCategoryId: string;

  @ObjectIdColumn()
  @Field(() => ID, { defaultValue: null, nullable: true })
  userId: string;

  @ObjectIdColumn()
  @Field({ defaultValue: true })
  accredited: boolean;

  @ObjectIdColumn()
  @Field({ defaultValue: false })
  isDeleted: boolean;

  @Column()
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
  expiryDate: string;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  proofOfPayment: string;

  @Column()
  @Field(() => String, { defaultValue: null, nullable: true })
  supportingDocument: string;

  // test
  @AfterLoad()
  update() {
    if (
      this.status == 'ACTIVE' &&
      moment(Date.now()).isAfter(this.expiryDate)
    ) {
      this.status = 'EXPIRED';
    }
    if (this.dateAccredited) {
      this.expiryDate = moment().add(1, 'month').toISOString();
    }
  }
}
