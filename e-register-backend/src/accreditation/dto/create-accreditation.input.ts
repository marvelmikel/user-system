import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { Upload } from 'src/scalar/upload.scalar';
import { Entity } from 'typeorm';

@Entity()
@InputType()
export class CreateAccreditationInput {
  @IsMongoId()
  @Field(() => String)
  categoryId: string;

  @IsMongoId()
  @Field(() => String)
  subcategoryId: string;

  @Field({ defaultValue: null })
  uploadProofOfDocument: Upload;

  @Field({ defaultValue: null })
  uploadSupportingDocument: Upload;
}
