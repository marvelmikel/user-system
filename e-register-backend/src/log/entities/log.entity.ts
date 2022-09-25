import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Log {
  @ObjectIdColumn()
  @Field(() => ID)
  _id: string;

  @Column()
  @Field()
  info: string;

  @Column({ type: 'string', default: new Date().toISOString() })
  @Field()
  createdAt: string;

  @ObjectIdColumn()
  @Field()
  by: string;

  @Column({ type: 'boolean', default: false })
  @Field()
  isAdmin: boolean;
}
