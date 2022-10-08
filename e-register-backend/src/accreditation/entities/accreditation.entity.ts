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
  @Field({ nullable: false })
  categoryId: string;

  @ObjectIdColumn()
  @Field({ nullable: false })
  subCategoryId: string;

  @ObjectIdColumn()
  @Field({ nullable: false })
  userId: string;

  @ObjectIdColumn()
  @Field({ defaultValue: false })
  accredited: boolean;

  @ObjectIdColumn()
  @Field({ defaultValue: false })
  isDeleted: boolean;

  @Column()
  @Field(() => String, {
    defaultValue: StatusEnum.PENDING,
    nullable: false,
  })
  status: string;

  @Column()
  @Field({ nullable: false })
  dateAccredited: string;

  @Column()
  @Field({ nullable: false })
  expiryDate: string;

  @Column()
  @Field({ nullable: false })
  proofOfPayment: string;

  @Column()
  @Field({ nullable: false })
  supportingDocument: string;

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
