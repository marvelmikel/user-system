import { InputType, Field } from '@nestjs/graphql';
import { MinLength, IsNotEmptyObject, IsString } from 'class-validator';
import { Upload } from 'src/scalar/upload.scalar';

@InputType()
export class DocumentInput {
  @Field(() => Upload)
  @IsNotEmptyObject()
  photo: Upload;

  @Field()
  @IsString()
  @MinLength(2)
  title: string;
}
