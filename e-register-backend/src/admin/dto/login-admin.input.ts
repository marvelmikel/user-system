import { InputType } from '@nestjs/graphql';
import { LoginInput } from 'src/global/login';

@InputType()
export class LoginAdminInput extends LoginInput {}
