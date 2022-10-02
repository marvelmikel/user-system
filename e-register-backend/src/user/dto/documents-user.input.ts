import { InputType, Field } from '@nestjs/graphql';
import { MinLength, IsString } from 'class-validator';
import { Upload } from 'src/scalar/upload.scalar';

@InputType()
export class DocumentInput {
  @Field(() => Upload)
  file: Upload;

  @Field()
  @IsString()
  @MinLength(2)
  title: string;
}
