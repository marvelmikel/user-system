import { InputType, Field } from '@nestjs/graphql';
import { Upload } from 'src/scalar/upload.scalar';
@InputType()
export class UploadDocumentInput {
  @Field(() => Upload, { nullable: true })
  file: Upload;

  @Field(() => String, { nullable: true })
  title: string;
}
