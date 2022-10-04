import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { LoginAdminInput } from './dto/login-admin.input';
import { HttpException, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { HelperService } from 'src/helper/helper.service';
import { CustomQuery } from 'src/admin/dto/query-admin.input';
import { AdminStatusInput } from './dto/status-admin.input';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(
    private readonly adminService: AdminService,
    private helperService: HelperService,
  ) {}

  // Login Mutation
  // The login mutation handles the admin login
  // The mutation takes the login admin input as an argument
  // The login admin input consist of email and credentails
  // The mutation returns a token
  @Mutation(() => String)
  loginAdmin(@Args('loginAdminInput') loginAdminInput: LoginAdminInput) {
    return this.adminService.createLoginToken(loginAdminInput);
  }

  // Invite Admin Mutation
  // The invite admin mutation handles inviting new admins
  // The mutation takes in an email as input
  // The mutation sends a link to the new admin email
  // The mutation returns a string
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

  // Create Admin Mutation
  // The create admin mutation handles creating new admins
  // the mutation taken the invite token ands other parameters
  //  the mutation create a new admin instances
  // the  mutation returns the admin
  @Mutation(() => Admin)
  createAdmin(@Args('createAdminInput') createAdminInput: CreateAdminInput) {
    return this.adminService.create(createAdminInput);
  }

  // find all admin query
  // the query handles fetching all admins from the database
  // the query takes the pagination payload
  // the query returns an array of admins
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

  // Profile Query
  // The query get the current admin information
  @UseGuards(AuthGuard)
  @Query(() => Admin, { name: 'profile' })
  profile(
    @Context('data')
    data: any,
  ) {
    this.helperService.isAnAdmin(data);
    return this.adminService.findOne(data.id, data);
  }

  // The find One admin Query
  // The Query takes the admin id as a parameter
  // and returns an admin info
  @UseGuards(AuthGuard)
  @Query(() => Admin, { name: 'admin' })
  findOne(
    @Context('data')
    data: any,
    @Args('id', { type: () => String }) id: string,
  ) {
    this.helperService.isAnAdmin(data);
    return this.adminService.findOne(id, data);
  }

  // Update admin mutation
  // the mutation takes the update payload
  // and return the updated Admin
  @UseGuards(AuthGuard)
  @Mutation(() => Admin)
  updateAdmin(
    @Context('data')
    data: any,
    @Args('updateAdminInput')
    updateAdminInput: UpdateAdminInput,
  ) {
    this.helperService.isAnAdmin(data);
    return this.adminService.update(data.id, updateAdminInput, data);
  }

  // Update admin mutation by root admin
  // the mutation takes the update payload and admin id
  // and return the updated Admin
  @UseGuards(AuthGuard)
  @Mutation(() => Admin)
  updateAdminByRootAdmin(
    @Context('data')
    data: any,
    @Args('id')
    id: string,
    @Args('updateAdminInput')
    updateAdminInput: UpdateAdminInput,
  ) {
    this.helperService.isARootAdmin(data);
    return this.adminService.update(id, updateAdminInput, data);
  }

  // Deactivate admin mutation by root admin
  // the mutation takes the activate and deactivate admin
  // and return the updated Admin
  @UseGuards(AuthGuard)
  @Mutation(() => Admin)
  activateAndDeactivateAdminByRootAdmin(
    @Context('data')
    data: any,
    @Args('id')
    id: string,
    @Args('adminStatusInput')
    adminStatusInput: AdminStatusInput,
  ) {
    this.helperService.isARootAdmin(data);
    if (data.id == id)
      throw new HttpException(
        'Unable to delete yourself',
        HttpStatus.FORBIDDEN,
      );
    return this.adminService.update(id, adminStatusInput, data);
  }

  // Delete admin mutation
  // the mutation delete an admi  using the admin id
  // this action can only be perform by the root admin
  @UseGuards(AuthGuard)
  @Mutation(() => String)
  removeAdmin(
    @Context('data')
    data: any,
    @Args('id', { type: () => String })
    id: string,
  ) {
    this.helperService.isARootAdmin(data);
    return this.adminService.remove(id, data);
  }
}
