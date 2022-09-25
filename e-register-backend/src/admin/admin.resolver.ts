import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { LoginAdminInput } from './dto/login-admin.input';
import { Request } from '@nestjs/common';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => String)
  loginAdmin(@Args('loginAdminInput') loginAdminInput: LoginAdminInput) {
    return this.adminService.createLoginToken(loginAdminInput);
  }

  @Mutation(() => String)
  inviteAdmin(
    @Context('req')
    req: Request,
    @Args('email')
    email: string,
  ) {
    console.log(req);
    return this.adminService.inviteAdmin(req.headers['referer'], email);
  }

  @Mutation(() => Admin)
  createAdmin(@Args('createAdminInput') createAdminInput: CreateAdminInput) {
    return this.adminService.create(createAdminInput);
  }

  @Query(() => [Admin], { name: 'admin' })
  findAll() {
    return this.adminService.findAll();
  }

  @Query(() => Admin, { name: 'admin' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.adminService.findOne(id);
  }

  @Mutation(() => Admin)
  updateAdmin(@Args('updateAdminInput') updateAdminInput: UpdateAdminInput) {
    return this.adminService.update(updateAdminInput.id, updateAdminInput);
  }

  @Mutation(() => Admin)
  removeAdmin(@Args('id', { type: () => Int }) id: number) {
    return this.adminService.remove(id);
  }
}
