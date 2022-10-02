import { CreateSubcategoryInput } from './create-subcategory.input';
import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class SoftSubcategoryInput extends PartialType(
  OmitType(CreateSubcategoryInput, ['categoryId'] as const),
) {
  @Field(() => Boolean)
  isDeleted: boolean;
}
