import { CreateSubcategoryInput } from './create-subcategory.input';
import { InputType, OmitType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSubcategoryInput extends PartialType(
  OmitType(CreateSubcategoryInput, ['categoryId'] as const),
) {}
