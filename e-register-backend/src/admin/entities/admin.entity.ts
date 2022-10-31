import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Admin {
  @ObjectIdColumn()
  @Field(() => ID)
  _id: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  middleName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  phoneNumber: string;

  @Column({ type: 'boolean', default: false })
  @Field({ defaultValue: false })
  isRoot: boolean;

  @Column({ type: 'boolean', default: true })
  @Field({ defaultValue: true })
  isActive: boolean;

  @Column()
  credential: string;

  @Column()
  @Field({ defaultValue: false })
  isDeleted: boolean;
}
