import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { LoginAdminInput } from './dto/login-admin.input';
import { Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { HelperService } from 'src/helper/helper.service';
import { CustomQuery } from 'src/admin/dto/query.input';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(
    private readonly adminService: AdminService,
    private helperService: HelperService,
  ) {}
  // login admin
  @Mutation(() => String)
  loginAdmin(@Args('loginAdminInput') loginAdminInput: LoginAdminInput) {
    return this.adminService.createLoginToken(loginAdminInput);
  }

  // invite admin
  @UseGuards(AuthGuard)
  @Mutation(() => String)
  inviteAdmin(
    @Context('data')
    data: any,
    @Context()
    req: Request,
    @Args('email')
    email: string,
  ) {
    this.helperService.isARootAdmin(data);
    return this.adminService.inviteAdmin(data, req.headers['origin'], email);
  }

  @Mutation(() => Admin)
  createAdmin(@Args('createAdminInput') createAdminInput: CreateAdminInput) {
    return this.adminService.create(createAdminInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Admin], { name: 'admins' })
  findAll(
    @Args('args')
    args: CustomQuery,
    @Context('data')
    data: any,
  ) {
    this.helperService.isAnAdmin(data);
    return this.adminService.findAll(args, data);
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
