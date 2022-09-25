import { CreateAdminInput } from './create-admin.input';
import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';
import { Upload } from 'src/scalar/upload.scalar';

@InputType()
export class UpdateAdminInput extends PartialType(
  OmitType(CreateAdminInput, ['credential', 'token'] as const),
) {
  @Field()
  profilePic: Upload;

  @Field()
  id: number;
}
