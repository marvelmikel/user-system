import { CreateAdminInput } from './create-admin.input';
import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';
import { Upload } from 'src/scalar/upload.scalar';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateAdminInput extends PartialType(
  OmitType(CreateAdminInput, ['credential', 'token'] as const),
) {
  @IsOptional()
  @Field({ defaultValue: null })
  profilePic?: Upload;
}
