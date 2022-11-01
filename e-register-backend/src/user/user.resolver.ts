import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { HelperService } from 'src/helper/helper.service';
import { LoginUserInput } from './dto/login-user.input';
import { Accreditation } from 'src/accreditation/entities/accreditation.entity';
import { AccreditationService } from 'src/accreditation/accreditation.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly helperService: HelperService,
    private readonly accreditationService: AccreditationService,
  ) {}

  // creating user resolver
  // the reslover if for regitering new users
  // it taskes in the create user input type
  // and returns a new user
  @Mutation(() => User)
  createUser(
    @Args('createUserInput')
    createUserInput: CreateUserInput,
    @Context('req')
    req: Request,
  ) {
    console.log(req);
    return this.userService.create(createUserInput, req.headers['origin']);
  }
  // creating user resolver
  // the reslover if for regitering new users
  // it taskes in the create user input type
  // and returns a new user
  @UseGuards(AuthGuard)
  @Mutation(() => User)
  createUserByAdmin(
    @Args('createUserInput')
    createUserInput: CreateUserInput,
    @Context('req')
    req: Request,
    @Context('data')
    data: any,
  ) {
    this.helperService.isAnAdmin(data);
    return this.userService.create(createUserInput, req.headers['origin']);
  }

  // Login Mutation
  // The login mutation handles the user login
  // The mutation takes the login user input as an argument
  // The login user input consist of email and credentails
  // The mutation returns a token
  @Mutation(() => User)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.userService.loginUser(loginUserInput);
  }

  // Resend email verification
  // The resolver takes the user token and send email verification link
  // returns a string
  @UseGuards(AuthGuard)
  @Mutation(() => String)
  resendEmailVerification(
    @Context('data')
    data: any,
    @Context('req')
    req: Request,
  ) {
    return this.userService.resendEmailVerificationToken(
      data.email,
      req.headers['origin'],
    );
  }

  // verify email token
  // The resolver takes the verification token and validate the token
  // returns a string
  @Mutation(() => String)
  validateEmailVerification(
    @Args('token')
    token: string,
  ) {
    return this.userService.verifyEmail(token);
  }

  // verify email token
  // The resolver takes the verification token and validate the token
  // returns a string
  @Mutation(() => String)
  forgottenPassword(
    @Args('email')
    email: string,
    @Context('req')
    req: Request,
  ) {
    return this.userService.forgottenPassword(email, req.headers['origin']);
  }
  // verify email token
  // The resolver takes the verification token and validate the token
  // returns a string
  @Mutation(() => String)
  resetPassword(
    @Args('token')
    token: string,
    @Args('credential')
    credential: string,
  ) {
    return this.userService.resetPassword(token, credential);
  }

  @Query(() => [User])
  getAllUsers() {
    // return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  getUser(
    @Context('data')
    data: any,
  ) {
    return this.userService.findOne(data.id, data);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  updateUser(
    @Context('data')
    data: any,
    @Args('updateUserInput')
    updateUserInput: UpdateUserInput,
    @Context('req')
    req: Request,
  ) {
    return this.userService.update(
      data.id,
      updateUserInput,
      data,
      req.headers['origin'],
    );
  }
  @UseGuards(AuthGuard)
  @Mutation(() => User)
  updateUserByAdmin(
    @Context('data')
    data: any,
    @Args('id')
    id: string,
    @Args('updateUserInput')
    updateUserInput: UpdateUserInput,
    @Context('req')
    req: Request,
  ) {
    this.helperService.isAnAdmin(data);
    return this.userService.update(
      id,
      updateUserInput,
      data,
      req.headers['origin'],
    );
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    console.log(id);

    // return this.userService.remove(id);
  }

  @ResolveField(() => [Accreditation])
  accreditation(@Parent() user: User) {
    return this.accreditationService.getUserAccreditaion(user._id);
  }
}
