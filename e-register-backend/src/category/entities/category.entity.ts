import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';

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

  @Field(() => [Subcategory], { nullable: true })
  subcategories: Subcategory[];
}
