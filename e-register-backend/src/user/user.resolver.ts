import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // creating user resolver
  // the reslover if for regitering new users
  // it taskes in the create user input type
  // and returns a new user
  @Mutation(() => User)
  createUser(
    @Args('createUserInput')
    createUserInput: CreateUserInput,
    @Context()
    req: Request,
  ) {
    return this.userService.create(createUserInput, req.headers['origin']);
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

  @Query(() => [User], { name: 'user' })
  findAll() {
    // return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    console.log(id);

    // return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id')
    id: number,
    @Args('updateUserInput')
    updateUserInput: UpdateUserInput,
  ) {
    // return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    // return this.userService.remove(id);
  }
}
