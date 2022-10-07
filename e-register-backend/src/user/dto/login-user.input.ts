import { InputType } from '@nestjs/graphql';
import { LoginInput } from 'src/global/login';

@InputType()
export class LoginUserInput extends LoginInput {}
