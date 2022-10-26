import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { HelperService } from 'src/helper/helper.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SoftCategoryInput } from './dto/soft-category.input';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import { SubcategoryService } from 'src/subcategory/subcategory.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private helperService: HelperService,
    private subcategoryService: SubcategoryService,
  ) {}

  // done
  @UseGuards(AuthGuard)
  @Mutation(() => Category)
  createCategory(
    @Context('data')
    data: any,
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    this.helperService.isAnAdmin(data);
    return this.categoryService.create(data, createCategoryInput);
  }

  // done
  @Query(() => [Category])
  findAllCategories(
    @Args({
      name: 'search',
      type: () => String,
      nullable: true,
    })
    search: string,
  ) {
    return this.categoryService.findAll(search);
  }

  // done
  @Query(() => Category)
  findOneCategory(@Args('id', { type: () => String }) id: string) {
    return this.categoryService.findOne(id);
  }

  // done
  @UseGuards(AuthGuard)
  @Mutation(() => Category)
  softDeleteAndRestoreCategory(
    @Context('data')
    data: any,
    @Args('id')
    id: string,
    @Args('softCategoryInput') softCategoryInput: SoftCategoryInput,
  ) {
    this.helperService.isAnAdmin(data);
    return this.categoryService.softDeleteAndRetore(
      data,
      id,
      softCategoryInput,
    );
  }

  // done
  @UseGuards(AuthGuard)
  @Mutation(() => Category)
  updateCategory(
    @Context('data')
    data: any,
    @Args('id')
    id: string,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    this.helperService.isAnAdmin(data);
    return this.categoryService.update(data, id, updateCategoryInput);
  }

  // done
  @UseGuards(AuthGuard)
  @Mutation(() => Category)
  removeCategory(
    @Context('data')
    data: any,
    @Args('id', { type: () => String })
    id: string,
  ) {
    this.helperService.isAnAdmin(data);
    return this.categoryService.remove(data, id);
  }

  @ResolveField(() => [Subcategory])
  subcategories(@Parent() category: Category) {
    this.subcategoryService.findAll(null, category._id);
  }
}
