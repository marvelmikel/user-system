'use strict';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthPayload } from 'src/auth/entities/auth.entity';
import { HelperService } from 'src/helper/helper.service';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { CreateAdminInput } from './dto/create-admin.input';
import { LoginAdminInput } from './dto/login-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { Admin } from './entities/admin.entity';
// import * as generator from 'generate-password';
import { LogService } from 'src/log/log.service';
import { ConfigService } from '@nestjs/config';
import { CustomQuery } from './dto/query.input';
import { ObjectId } from 'mongodb';
import { AdminStatusInput } from './dto/status-admin.input';
@Injectable()
export class AdminService implements OnModuleInit {
  @Inject(ConfigService)
  public config: ConfigService;
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private mailService: MailService,
    private helperService: HelperService,
    private logService: LogService,
  ) {}

  // done
  async onModuleInit() {
    // generate password
    // const generatePassword = generator.generate({
    //   length: 11,
    //   numbers: true,
    // });
    // create admin collection
    // await this.adminRepository.delete({});
    // create admin instance
    // const newAdmin = this.adminRepository.create({
    //   firstName: this.config.get('FIRST_NAME'),
    //   middleName: this.config.get('MIDDLE_NAME'),
    //   lastName: this.config.get('LAST_NAME'),
    //   email: this.config.get('ADMIN_EMAIL'),
    //   phoneNumber: this.config.get('PHONE_NUMBER'),
    //   isRoot: true,
    //   credential: await this.helperService.hashPassword(generatePassword),
    // });
    // Save Root Admin
    // const createdAdmin = await this.adminRepository.save(newAdmin);
    // send Email
    // this.mailService.sendMail({
    //   email: `${this.config.get('ADMIN_EMAIL')}`,
    //   subject: 'Root Login Credentials',
    //   template: 'credentials',
    //   context: {
    //     username: `${this.config.get('ADMIN_EMAIL')}`,
    //     password: generatePassword,
    //   },
    // });
    // create log
    // this.logService.create({
    //   info: 'Created a Root Admin',
    //   by: createdAdmin.id,
    //   isAdmin: true,
    // });
  }
  // done
  async createLoginToken(loginAdminInput: LoginAdminInput) {
    try {
      const { email, credential } = loginAdminInput;
      const checkAdminExist = await this.adminRepository.findOneBy({
        email,
      });
      if (!checkAdminExist) throw new Error('Invalid Credentials');
      const checkPasswordValid = await this.helperService.comparePassword(
        credential,
        checkAdminExist.credential,
      );
      if (!checkPasswordValid) throw new Error('Invalid Credentials');

      const tokenPayload: AuthPayload = {
        firstName: checkAdminExist.firstName,
        lastName: checkAdminExist.lastName,
        email: checkAdminExist.email,
        isAdmin: true,
        isRoot: checkAdminExist.isRoot,
        id: checkAdminExist.id,
      };

      return await this.helperService.generateToken({ payload: tokenPayload });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
  // done
  async inviteAdmin(admin: any, baseUrl: string, email: string) {
    try {
      // check if email exist
      const checkAdminExist = await this.adminRepository.findOneBy({
        email,
      });

      console.log(checkAdminExist);

      if (checkAdminExist) throw new Error('Email Already Exist');

      // generate registration token
      const tokenPayload: any = {
        email: email,
        isAdmin: true,
      };
      const token = await this.helperService.generateToken({
        payload: tokenPayload,
      });

      // create registration link
      const url = `${baseUrl}/register-admin?token=${token}`;

      // send Email
      this.mailService.sendMail({
        email: email,
        subject: 'Admin Invitations',
        template: 'invite',
        context: {
          url: `${url}`,
        },
      });

      // create log
      this.logService.create({
        info: 'Invited an Admin',
        by: admin.id,
        isAdmin: true,
      });

      return 'Invite Successfully Sent';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
  // done
  async create(createAdminInput: CreateAdminInput) {
    try {
      // verify token
      const data: any = await this.helperService.verifyToken(
        createAdminInput.token,
      );

      const checkAdminExist = await this.adminRepository.findOneBy({
        email: data['email'],
      });
      if (checkAdminExist) throw new Error('Email has already been taken');

      // create admin instance
      const newAdmin = this.adminRepository.create({
        ...createAdminInput,
        ...data,
        isRoot: false,
        credential: await this.helperService.hashPassword(
          createAdminInput['credential'],
        ),
      });

      // save admin
      const savedData = await this.adminRepository.save(newAdmin);

      // send Email
      this.mailService.sendMail({
        email: data.email,
        subject: 'Account Creation',
        template: 'creation',
        context: {
          message: `Account Successfully Created`,
        },
      });

      return savedData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  async findAll(customQuery: CustomQuery, data: any) {
    try {
      // get query params
      const { skip, size, search } = customQuery;
      // create root filter
      const primaryFilter: any = [{ isRoot: true }, { _id: { $ne: data.id } }];
      // check if search exist
      if (search) {
        primaryFilter.push({
          $or: [
            {
              firstName: { $regex: search, $options: 'i' },
            },
            {
              middlename: { $regex: search, $options: 'i' },
            },
            {
              email: { $regex: search, $options: 'i' },
            },
          ],
        });
      }
      // generate main query
      const query: any = {
        $and: primaryFilter,
      };
      // find all
      const result = await this.adminRepository.find({
        where: query,
        take: size,
        skip: skip,
        order: { firstName: 'DESC' },
      });

      // create log
      this.logService.create({
        info: 'Viewed all Admins',
        by: data.id,
        isAdmin: true,
      });

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  // done
  async findOne(id: string, data: any) {
    try {
      const query: any = { _id: new ObjectId(id) };
      const result = await this.adminRepository.findOne({
        where: query,
      });

      if (!result) throw new Error('Item not found');

      // create log
      this.logService.create({
        info: 'Viewed an Admin',
        by: data.id,
        isAdmin: true,
      });
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(
    id: string,
    updateAdminInput: UpdateAdminInput | AdminStatusInput,
    data: any,
  ) {
    try {
      const query: any = { _id: new ObjectId(id) };
      let result = await this.adminRepository.findOne({
        where: query,
      });

      if (!result) throw new Error('Item not found');
      const updatedData = await this.adminRepository.update(
        id,
        updateAdminInput,
      );

      if (!updatedData) throw new Error('Unable to Updated');
      // get updated data
      result = await this.adminRepository.findOne({
        where: query,
      });
      // create log
      this.logService.create({
        info: 'Updated an Admin',
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
      const query: any = { _id: new ObjectId(id), isRoot: false };
      const result = await this.adminRepository.findOne({
        where: query,
      });
      if (!result) throw new Error('Item not found');
      const deletedData = await this.adminRepository.remove(result);

      if (!deletedData) throw new Error('Unable to perform action');

      // create log
      this.logService.create({
        info: 'Deleted an Admin',
        by: data.id,
        isAdmin: true,
      });
      return deletedData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
