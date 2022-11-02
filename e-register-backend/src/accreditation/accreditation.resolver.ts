import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AccreditationService } from './accreditation.service';
import { Accreditation } from './entities/accreditation.entity';
import { CreateAccreditationInput } from './dto/create-accreditation.input';
import { UpdateAccreditationInput } from './dto/update-accreditation.input';
import { UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { HelperService } from 'src/helper/helper.service';
import { AccreditationQuery } from './dto/query-accreditation.input';
import { AdminUpdateAccreditationInput } from './dto/admin-accreditation.input';
import { CreateAccreditationByAdminInput } from './dto/create-accreditation-admin.input';
import { Category } from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/category.service';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import { SubcategoryService } from 'src/subcategory/subcategory.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Resolver(() => Accreditation)
export class AccreditationResolver {
  constructor(
    private readonly accreditationService: AccreditationService,
    private readonly categoryService: CategoryService,
    private readonly subcategoryService: SubcategoryService,
    private readonly userService: UserService,
    private helperService: HelperService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Accreditation)
  createAccreditationByAdmin(
    @Context('data')
    data: any,
    @Context('req')
    req: Request,
    @Args('createAccreditationByAdminInput')
    createAccreditationByAdminInput: CreateAccreditationByAdminInput,
  ) {
    this.helperService.isAUser(data);
    return this.accreditationService.create(
      createAccreditationByAdminInput.userId,
      data,
      createAccreditationByAdminInput,
      req.headers['host'],
    );
  }
  @UseGuards(AuthGuard)
  @Mutation(() => String)
  createAccreditation(
    @Context('data')
    data: any,
    @Context('req')
    req: Request,
    @Args('createAccreditationInput')
    createAccreditationInput: CreateAccreditationInput,
  ) {
    this.helperService.isAUser(data);
    return this.accreditationService.create(
      data.id,
      data,
      createAccreditationInput,
      req.headers['host'],
    );
  }

  @UseGuards(AuthGuard)
  @Query(() => [Accreditation], { name: 'accreditation' })
  findAll(
    @Context('data')
    data: any,
    @Args('accreditationQuery')
    accreditationQuery: AccreditationQuery,
  ) {
    this.helperService.isAnAdmin(data);
    return this.accreditationService.findAll(accreditationQuery);
  }

  @UseGuards(AuthGuard)
  @Query(() => Accreditation)
  findOne(
    @Context('data')
    data: any,
    @Args('id', { type: () => String })
    id: string,
  ) {
    this.helperService.isAnAdminOrAUser(data);
    return this.accreditationService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Accreditation)
  updateAccreditation(
    @Context('data')
    data: any,
    @Context('req')
    req: Request,
    @Args('id')
    id: string,
    @Args('updateAccreditationInput')
    updateAccreditationInput: UpdateAccreditationInput,
  ) {
    this.helperService.isAUser(data);
    return this.accreditationService.update(
      data,
      id,
      req.headers['host'],
      updateAccreditationInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Accreditation)
  updateAccreditationByAdmin(
    @Context('data')
    data: any,
    @Context('req')
    req: Request,
    @Args('id')
    id: string,
    @Args('adminUpdateAccreditationInput')
    adminUpdateAccreditationInput: AdminUpdateAccreditationInput,
  ) {
    this.helperService.isAnAdmin(data);
    return this.accreditationService.updateAccreditationByAdmin(
      data,
      id,
      req.headers['host'],
      adminUpdateAccreditationInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Accreditation)
  removeAccreditation(
    @Context('data')
    data: any,
    @Args('id', { type: () => String }) id: string,
  ) {
    this.helperService.isAnAdmin(data);
    return this.accreditationService.remove(id, data);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Accreditation)
  softRemoveAccreditation(
    @Context('data')
    data: any,
    @Args('id', { type: () => String }) id: string,
    @Args('status', { type: () => Boolean })
    status: boolean,
  ) {
    this.helperService.isAnAdmin(data);
    return this.accreditationService.softDeleteAndRetoreByAccreditionId(
      data,
      id,
      status,
    );
  }

  @ResolveField(() => [Category])
  category(@Parent() accreditation: Accreditation) {
    return this.categoryService.findOne(accreditation.categoryId);
  }
  @ResolveField(() => [Subcategory])
  subcategory(@Parent() accreditation: Accreditation) {
    return this.subcategoryService.findOne(accreditation.subcategoryId);
  }
  @ResolveField(() => [User])
  user(
    @Context('data')
    data: any,
    @Parent() accreditation: Accreditation,
  ) {
    return this.userService.findOne(accreditation.userId, data);
  }
}
