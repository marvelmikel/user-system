import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { SubcategoryService } from './subcategory.service';
import { Subcategory } from './entities/subcategory.entity';
import { CreateSubcategoryInput } from './dto/create-subcategory.input';
import { UpdateSubcategoryInput } from './dto/update-subcategory.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { HelperService } from 'src/helper/helper.service';

@Resolver(() => Subcategory)
export class SubcategoryResolver {
  constructor(
    private readonly subcategoryService: SubcategoryService,
    private helperService: HelperService,
  ) {}

  // done
  @UseGuards(AuthGuard)
  @Mutation(() => Subcategory)
  createSubcategory(
    @Context('data')
    data: any,
    @Args('createSubcategoryInput')
    createSubcategoryInput: CreateSubcategoryInput,
  ) {
    this.helperService.isAnAdmin(data);
    return this.subcategoryService.create(data, createSubcategoryInput);
  }
  // done
  @Query(() => [Subcategory], { name: 'subcategory' })
  findAll(
    @Args({
      name: 'search',
      type: () => String,
      nullable: true,
    })
    search: string,
    @Args({
      name: 'categoryId',
      type: () => String,
      nullable: true,
    })
    categoryId: string,
  ) {
    return this.subcategoryService.findAll(search, categoryId);
  }

  // done
  @Query(() => Subcategory, { name: 'subcategory' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.subcategoryService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Subcategory)
  updateSubcategory(
    @Context('data')
    data: any,
    @Args('id')
    id: string,
    @Args('updateSubcategoryInput')
    updateSubcategoryInput: UpdateSubcategoryInput,
  ) {
    this.helperService.isAnAdmin(data);
    return this.subcategoryService.update(data, id, updateSubcategoryInput);
  }

  // done
  @UseGuards(AuthGuard)
  @Mutation(() => Subcategory)
  softDeleteAndRestoreSubcategory(
    @Context('data')
    data: any,
    @Args('id')
    id: string,
    @Args('status', { type: () => Boolean }) status: boolean,
  ) {
    this.helperService.isAnAdmin(data);
    return this.subcategoryService.softDeleteAndRetoreByCategoryId(
      data,
      id,
      status,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Subcategory)
  removeSubcategory(
    @Context('data')
    data: any,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.subcategoryService.remove(data, id);
  }
}
