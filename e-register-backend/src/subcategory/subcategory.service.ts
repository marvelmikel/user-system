import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubcategoryInput } from './dto/create-subcategory.input';
import { UpdateSubcategoryInput } from './dto/update-subcategory.input';
import { Subcategory } from './entities/subcategory.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { LogService } from 'src/log/log.service';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    private logService: LogService,
  ) {}

  // done
  async create(data: any, createSubcategoryInput: CreateSubcategoryInput) {
    try {
      const name = createSubcategoryInput.name.toLowerCase().trim();
      // create a query params
      const queryParam: any = {
        name: name,
        categoryId: createSubcategoryInput.categoryId,
      };
      // check if name already existe
      const checkCategory = await this.subcategoryRepository.findOne({
        where: queryParam,
      });
      // check if user exist
      if (checkCategory) throw new Error('Subcategory Already Exist');

      // create admin instance
      const newCategory = this.subcategoryRepository.create({
        categoryId: createSubcategoryInput.categoryId,
        name: name,
      });

      // save admin
      const savedData = await this.subcategoryRepository.save(newCategory);

      // create log
      this.logService.create({
        info: 'New SubCategory Created',
        by: data.id,
        isAdmin: true,
      });

      return savedData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
  // done
  async findAll(categoryId: string, search?: string) {
    try {
      console.log(categoryId);
      // create root filter
      let searchFilter: any = {};
      // check if search exist
      if (search) {
        searchFilter = {
          name: search,
        };
      }
      // create root filter
      let statusFilter: any = {};
      // check if search exist
      if (categoryId) {
        statusFilter = { categoryId: new ObjectId(categoryId) };
      }

      let primaryFilter: any = {};

      if (search && categoryId) {
        primaryFilter = {
          $and: [searchFilter, statusFilter],
        };
      } else if (categoryId) {
        primaryFilter = statusFilter;
      } else {
        primaryFilter = searchFilter;
      }

      // find all
      const result = await this.subcategoryRepository.find({
        where: primaryFilter,
        order: { name: 'DESC' },
      });

      console.log(result);

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
  // done
  async findOne(id: string) {
    try {
      const query: any = { _id: new ObjectId(id) };
      const result = await this.subcategoryRepository.findOne({
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
    updateSubcategoryInput: UpdateSubcategoryInput,
  ) {
    try {
      const query: any = { _id: new ObjectId(id) };
      let result = await this.subcategoryRepository.findOne({
        where: query,
      });

      if (!result) throw new Error('Item not found');
      const updatedData = await this.subcategoryRepository.update(
        id,
        updateSubcategoryInput,
      );

      if (!updatedData) throw new Error('Unable to Updated');
      // get updated data
      result = await this.subcategoryRepository.findOne({
        where: query,
      });
      // create log
      this.logService.create({
        info: 'Updated a Subcategory',
        by: data.id,
        isAdmin: true,
      });
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  // remaining accreditation reset
  async remove(data: any, id: string) {
    try {
      const query: any = { _id: new ObjectId(id) };
      const result = await this.subcategoryRepository.findOne({
        where: query,
      });
      if (!result) throw new Error('Item not found');
      // await this.accreditionService.resetDeletedSubcategory(data, id);

      const deletedData = await this.subcategoryRepository.remove(result);

      if (!deletedData) throw new Error('Unable to perform action');

      // create log
      this.logService.create({
        info: 'Deleted a SubCategory',
        by: data.id,
        isAdmin: true,
      });
      return deletedData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // done
  async softDeleteAndRetoreByCategoryId(
    data: any,
    id: string,
    status: boolean,
  ) {
    try {
      const query: any = { categoryId: new ObjectId(id) };
      const result = await this.subcategoryRepository.find({
        where: query,
      });
      if (result.length) {
        for (const iterator of result) {
          await this.subcategoryRepository.update(iterator._id, {
            isDeleted: status,
          });
        }
      }

      // create log
      this.logService.create({
        info: `${status ? 'Deleted' : 'Restored'} SubCategory`,
        by: data.id,
        isAdmin: true,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
