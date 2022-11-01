import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { HelperService } from 'src/helper/helper.service';
import { LogService } from 'src/log/log.service';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { AccreditationQuery } from './dto/query-accreditation.input';
import { CreateAccreditationInput } from './dto/create-accreditation.input';
import { UpdateAccreditationInput } from './dto/update-accreditation.input';
import { Accreditation } from './entities/accreditation.entity';
import { AdminUpdateAccreditationInput } from './dto/admin-accreditation.input';
import moment from 'moment';
import { CustomQuery } from 'src/admin/dto/query-admin.input';

@Injectable()
export class AccreditationService {
  constructor(
    @InjectRepository(Accreditation)
    private accreditationRepository: Repository<Accreditation>,
    private mailService: MailService,
    private helperService: HelperService,
    private logService: LogService,
  ) {}
  async create(
    userId: string,
    data: any,
    createAccreditationInput: CreateAccreditationInput,
    baseUrl: string,
  ) {
    try {
      let filter: any = {};

      filter = {
        $and: [
          { isDeleted: false },
          {
            categoryId: new ObjectId(createAccreditationInput.categoryId),
          },
          {
            userId: new ObjectId(userId),
          },
        ],
      };

      const result = await this.accreditationRepository.find({
        where: filter,
      });
      if (result.length > 3)
        throw new Error(
          'You have Exceded the number of accreditation a user can have',
        );

      // create a new instance;
      let newPayload: any = {
        categoryId: new ObjectId(createAccreditationInput.categoryId),
        subcategoryId: new ObjectId(createAccreditationInput.subcategoryId),
        isDeleted: false,
        userId: new ObjectId(userId),
      };
      // proof of payment document
      if (createAccreditationInput.uploadProofOfDocument) {
        const uploadUrl = await this.helperService.uploadFile(
          baseUrl,
          createAccreditationInput.uploadProofOfDocument,
        );
        newPayload = { ...newPayload, proofOfPayment: uploadUrl };
      }
      // proof of supporting document
      if (createAccreditationInput.uploadSupportingDocument) {
        const uploadUrl = await this.helperService.uploadFile(
          baseUrl,
          createAccreditationInput.uploadSupportingDocument,
        );
        newPayload = { ...newPayload, supportingDocument: uploadUrl };
      }

      // create admin instance
      const newAccreditation = this.accreditationRepository.create(newPayload);

      // save admin
      await this.accreditationRepository.save(newAccreditation);

      // send Email
      this.mailService.sendMail({
        email: data.email,
        subject: 'Application for a new Accreditation',
        template: 'creation',
        context: {
          message: `Application for a new accreditation`,
        },
      });

      // create log
      this.logService.create({
        info: 'Accreditation Application',
        by: data.id,
        isAdmin: false,
      });

      return 'Accreditation created Successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findAll(accreditationQuery: AccreditationQuery) {
    try {
      // create root filter
      let categoryFilter: any = {};
      // check if search exist
      if (accreditationQuery.categoryId) {
        categoryFilter = {
          categoryId: new ObjectId(accreditationQuery.categoryId),
        };
      }
      // create root filter
      let subcategoryFilter: any = {};
      // check if search exist
      if (accreditationQuery.subcategoryId) {
        subcategoryFilter = {
          categoryId: new ObjectId(accreditationQuery.subcategoryId),
        };
      }

      // create root filter
      let userFilter: any = {};
      // check if search exist
      if (accreditationQuery.userId) {
        userFilter = {
          userId: new ObjectId(accreditationQuery.userId),
        };
      }

      let primaryFilter: any = {};

      primaryFilter = {
        $and: [
          { isDeleted: accreditationQuery.isDeleted },
          categoryFilter,
          subcategoryFilter,
          userFilter,
        ],
      };

      // find all
      const result = await this.accreditationRepository.find({
        where: primaryFilter,
      });

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
  async getUserAccreditaion(userId: any) {
    try {
      console.log(userId);

      // create root filter
      let userFilter: any = {};
      // check if search exist
      if (userId) {
        userFilter = {
          userId: userId,
        };
      }

      let primaryFilter: any = {};

      primaryFilter = {
        $and: [{ isDeleted: false }, userFilter],
      };

      // find all
      const result = await this.accreditationRepository.find({
        where: primaryFilter,
      });

      console.log(result);

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  async findOne(id: string) {
    try {
      const query: any = { _id: new ObjectId(id) };
      const result = await this.accreditationRepository.findOne({
        where: query,
      });

      if (!result) throw new Error('Item not found');

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(
    data: any,
    id: string,
    baseUrl: string,
    updateAccreditationInput: UpdateAccreditationInput,
  ) {
    try {
      const query: any = { _id: new ObjectId(id) };
      let result = await this.accreditationRepository.findOne({
        where: query,
      });

      if (!result) throw new Error('Item not found');
      if (result.status != 'PENDING')
        throw new Error('Item can not be updated');

      // create a new instance;
      let newPayload: any = {};
      // proof of payment document
      if (updateAccreditationInput.uploadProofOfDocument) {
        const uploadUrl = await this.helperService.uploadFile(
          baseUrl,
          updateAccreditationInput.uploadProofOfDocument,
        );
        newPayload = { ...newPayload, proofOfPayment: uploadUrl };
      }
      // proof of supporting document
      if (updateAccreditationInput.uploadSupportingDocument) {
        const uploadUrl = await this.helperService.uploadFile(
          baseUrl,
          updateAccreditationInput.uploadSupportingDocument,
        );
        newPayload = { ...newPayload, supportingDocument: uploadUrl };
      }

      if (updateAccreditationInput.categoryId) {
        newPayload = {
          ...newPayload,
          categoryId: updateAccreditationInput.categoryId,
        };
      }
      if (updateAccreditationInput.subcategoryId) {
        newPayload = {
          ...newPayload,
          subcategoryId: updateAccreditationInput.subcategoryId,
        };
      }

      const updatedData = await this.accreditationRepository.update(
        id,
        newPayload,
      );

      if (!updatedData) throw new Error('Unable to Updated');
      // get updated data
      result = await this.accreditationRepository.findOne({
        where: query,
      });
      // create log
      this.logService.create({
        info: 'Updated an accreditation',
        by: data.id,
        isAdmin: true,
      });
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  async updateAccreditationByAdmin(
    data: any,
    id: string,
    baseUrl: string,
    adminUpdateAccreditationInput: AdminUpdateAccreditationInput,
  ) {
    try {
      const query: any = {
        _id: new ObjectId(id),
      };
      let result = await this.accreditationRepository.findOne({
        where: query,
      });

      if (!result) throw new Error('Item not found');
      if (result.status != 'PENDING')
        throw new Error('Item can not be updated');

      // create a new instance;
      let newPayload: any = {};
      // proof of payment document
      if (adminUpdateAccreditationInput.uploadProofOfDocument) {
        const uploadUrl = await this.helperService.uploadFile(
          baseUrl,
          adminUpdateAccreditationInput.uploadProofOfDocument,
        );
        newPayload = { ...newPayload, proofOfPayment: uploadUrl };
      }
      // proof of supporting document
      if (adminUpdateAccreditationInput.uploadSupportingDocument) {
        const uploadUrl = await this.helperService.uploadFile(
          baseUrl,
          adminUpdateAccreditationInput.uploadSupportingDocument,
        );
        newPayload = { ...newPayload, supportingDocument: uploadUrl };
      }

      if (adminUpdateAccreditationInput.categoryId) {
        newPayload = {
          ...newPayload,
          categoryId: adminUpdateAccreditationInput.categoryId,
        };
      }
      if (adminUpdateAccreditationInput.subcategoryId) {
        newPayload = {
          ...newPayload,
          subcategoryId: adminUpdateAccreditationInput.subcategoryId,
        };
      }
      if (adminUpdateAccreditationInput.accredited) {
        newPayload = {
          ...newPayload,
          accredited: adminUpdateAccreditationInput.accredited,
          dateAccredited: moment().toISOString(),
          expiryDate: moment().add(1, 'months').toISOString(),
        };
      }

      const updatedData = await this.accreditationRepository.update(
        id,
        newPayload,
      );

      if (!updatedData) throw new Error('Unable to Updated');
      // get updated data
      result = await this.accreditationRepository.findOne({
        where: query,
      });
      // create log
      this.logService.create({
        info: 'Updated an accreditation',
        by: data.id,
        isAdmin: true,
      });
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string, data: any) {
    try {
      const query: any = { _id: new ObjectId(id) };
      const result = await this.accreditationRepository.findOne({
        where: query,
      });
      if (!result) throw new Error('Item not found');
      // await this.accreditionService.resetDeletedSubcategory(data, id);

      const deletedData = await this.accreditationRepository.remove(result);

      if (!deletedData) throw new Error('Unable to perform action');

      // create log
      this.logService.create({
        info: 'Deleted a Accreditation',
        by: data.id,
        isAdmin: true,
      });
      return deletedData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // done
  async softDeleteAndRetoreByAccreditionId(
    data: any,
    id: string,
    status: boolean,
  ) {
    const query: any = {
      $and: [{ id: new ObjectId(id) }, { isDeleted: false }],
    };
    const result = await this.accreditationRepository.findOne({
      where: query,
    });
    if (!result) throw new Error('No Item found');
    await this.accreditationRepository.update(id, {
      isDeleted: status,
    });

    // create log
    this.logService.create({
      info: `${status ? 'Deleted' : 'Restored'} Accreditation`,
      by: data.id,
      isAdmin: true,
    });
  }

  async findAllUsers(customQuery: CustomQuery) {
    try {
      // const { categoryId, subcategoryId } = customQuery;

      // // filter
      // const accreditationFilter: any = this.helperService.mongoObjectFilter({
      //   $and: this.helperService.mongoArrayFilter([
      //     this.helperService.mongoQuery(
      //       'categoryId',
      //       '$eq',
      //       categoryId ? new ObjectId(categoryId) : null,
      //     ),
      //     this.helperService.mongoQuery(
      //       'subcategoryId',
      //       '$eq',
      //       subcategoryId ? new ObjectId(subcategoryId) : null,
      //     ),
      //   ]),
      // });

      // // create a pipeline
      // const result = this.accreditationRepository.aggregate([
      //   accreditationFilter,
      //   this.helperService.mongoObjectFilter({
      //     $group: { _id: '$userId' },
      //   }),
      //   this.helperService.mongoObjectFilter({
      //     $lookup: {
      //       from: 'user',
      //       localField: '_id',
      //       foreignField: 'userId',
      //       as: 'user',
      //     },
      //   }),
      // ]);
      return customQuery;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
