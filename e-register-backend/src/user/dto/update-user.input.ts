import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { Upload } from 'src/scalar/upload.scalar';

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['email', 'credential'] as const),
) {
  @IsOptional()
  @Field({ defaultValue: null })
  profilePic?: Upload;
}
