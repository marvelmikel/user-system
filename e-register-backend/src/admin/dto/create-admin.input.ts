import { InputType, Field } from '@nestjs/graphql';
import { MinLength, IsOptional, IsJWT, IsMobilePhone } from 'class-validator';

@InputType()
export class CreateAdminInput {
  // Signup token is expected
  @IsJWT()
  @Field()
  token: string;
  // firstName is Required
  @MinLength(1)
  @Field()
  firstName: string;
  // middleName is Required
  @IsOptional()
  @MinLength(1)
  @Field()
  middleName?: string;
  // lastName is Required
  @MinLength(1)
  @Field()
  lastName: string;
  // phoneNumber
  @IsMobilePhone()
  @Field()
  phoneNumber: string;
  // password required
  @MinLength(10)
  @Field()
  credential: string;
}
