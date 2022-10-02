import { CreateCategoryInput } from './create-category.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class SoftCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => Boolean)
  isDeleted: boolean;
}
