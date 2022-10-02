import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export abstract class LoginInput {
  @IsEmail()
  @Field()
  email: string;

  // password required
  @Field()
  credential: string;
}
