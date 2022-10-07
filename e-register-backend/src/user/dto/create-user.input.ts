import { InputType, Field } from '@nestjs/graphql';
import { MinLength, IsEmail } from 'class-validator';
@InputType()
export class CreateUserInput {
  // email is Required
  @IsEmail()
  @Field()
  email: string;

  // password required
  @MinLength(10)
  @Field()
  credential: string;
}
