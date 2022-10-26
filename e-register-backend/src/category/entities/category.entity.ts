import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Category {
  @ObjectIdColumn()
  @Field(() => ID)
  _id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field({ defaultValue: false })
  isDeleted: boolean;
}
