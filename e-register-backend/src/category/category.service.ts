import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { HelperService } from 'src/helper/helper.service';
import { LogService } from 'src/log/log.service';
import { MailService } from 'src/mail/mail.service';
import { SubcategoryService } from 'src/subcategory/subcategory.service';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { SoftCategoryInput } from './dto/soft-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private mailService: MailService,
    private helperService: HelperService,
    private logService: LogService,
    private subcategoryService: SubcategoryService,
  ) {}

  // done
  async create(data: any, createCategoryInput: CreateCategoryInput) {
    try {
      const name = createCategoryInput.name.toLowerCase().trim();
      // create a query params
      const queryParam: any = {
        name: name,
      };
      // check if email already existe
      const checkCategory = await this.categoryRepository.findOne({
        where: queryParam,
      });
      // check if user exist
      if (checkCategory) throw new Error('Category Already Exist');

      // create admin instance
      const newCategory = this.categoryRepository.create({
        name: name,
      });

      // save admin
      const savedData = await this.categoryRepository.save(newCategory);

      // send Email
      this.mailService.sendMail({
        email: data.email,
        subject: 'New Category Created by Admin',
        template: 'creation',
        context: {
          message: name,
        },
      });
      // create log
      this.logService.create({
        info: 'New Category Created',
        by: savedData._id,
        isAdmin: true,
      });

      return savedData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  // done
  async findAll(search: string) {
    try {
      // create root filter
      let primaryFilter: any = {};
      // check if search exist
      if (search) {
        primaryFilter = {
          name: search,
        };
      }

      // find all
      const result = await this.categoryRepository.find({
        where: primaryFilter,
        order: { name: 'DESC' },
      });

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  // done
  async findOne(id: string) {
    try {
      const query: any = { _id: new ObjectId(id) };
      const result = await this.categoryRepository.findOne({
        where: query,
      });

      if (!result) throw new Error('Item not found');

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // done
  async update(
    data: any,
    id: string,
    updateCategoryInput: UpdateCategoryInput,
  ) {
    try {
      const query: any = { _id: new ObjectId(id) };
      let result = await this.categoryRepository.findOne({
        where: query,
      });

      if (!result) throw new Error('Item not found');
      const updatedData = await this.categoryRepository.update(
        id,
        updateCategoryInput,
      );

      if (!updatedData) throw new Error('Unable to Updated');
      // get updated data
      result = await this.categoryRepository.findOne({
        where: query,
      });
      // create log
      this.logService.create({
        info: 'Updated an Category',
        by: data.id,
        isAdmin: true,
      });
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // done
  async softDeleteAndRetore(
    data: any,
    id: string,
    softCategoryInput: SoftCategoryInput,
  ) {
    try {
      const query: any = { _id: new ObjectId(id) };
      let result = await this.categoryRepository.findOne({
        where: query,
      });
      if (!result) throw new Error('Item not found');

      if (softCategoryInput.isDeleted) {
        await this.subcategoryService.softDeleteAndRetoreByCategoryId(
          data,
          id,
          softCategoryInput.isDeleted,
        );
      }

      const updatedData = await this.categoryRepository.update(
        id,
        softCategoryInput,
      );

      if (!updatedData) throw new Error('Unable to Updated');
      // get updated data
      result = await this.categoryRepository.findOne({
        where: query,
      });
      // create log
      this.logService.create({
        info: 'Updated an Category',
        by: data.id,
        isAdmin: true,
      });
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // done
  async remove(data: any, id: string) {
    try {
      const query: any = { _id: new ObjectId(id) };
      const result = await this.categoryRepository.findOne({
        where: query,
      });
      if (!result) throw new Error('Item not found');
      await this.subcategoryService.remove(data, id);

      const deletedData = await this.categoryRepository.remove(result);

      if (!deletedData) throw new Error('Unable to perform action');

      // create log
      this.logService.create({
        info: 'Deleted a Category',
        by: data.id,
        isAdmin: true,
      });
      return deletedData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
