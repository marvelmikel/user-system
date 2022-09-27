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
import * as generator from 'generate-password';
import { LogService } from 'src/log/log.service';
import { ConfigService } from '@nestjs/config';
import { CustomQuery } from './dto/query.input';
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
    const generatePassword = generator.generate({
      length: 11,
      numbers: true,
    });
    // create admin collection
    await this.adminRepository.delete({});

    // create admin instance
    const newAdmin = this.adminRepository.create({
      firstName: this.config.get('FIRST_NAME'),
      middleName: this.config.get('MIDDLE_NAME'),
      lastName: this.config.get('LAST_NAME'),
      email: this.config.get('ADMIN_EMAIL'),
      phoneNumber: this.config.get('PHONE_NUMBER'),
      isRoot: true,
      credential: await this.helperService.hashPassword(generatePassword),
    });

    // Save Root Admin
    const createdAdmin = await this.adminRepository.save(newAdmin);

    // send Email
    this.mailService.sendMail({
      email: `${this.config.get('ADMIN_EMAIL')}`,
      subject: 'Root Login Credentials',
      template: 'credentials',
      context: {
        username: `${this.config.get('ADMIN_EMAIL')}`,
        password: generatePassword,
      },
    });

    // create log
    this.logService.create({
      info: 'Created a Root Admin',
      by: createdAdmin.id,
      isAdmin: true,
    });
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
    console.log(customQuery, data);
    const { skip, size, search } = customQuery;
    let query = {};
    if (search) {
      query = this.helperService.filter(
        ['firstName', 'middleName', 'lastName', 'email'],
        search,
      );
    }
    const [result, total] = await this.adminRepository.findAndCount({
      where: query,
      order: { firstName: 'DESC' },
      take: size,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };

    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminInput: UpdateAdminInput) {
    return updateAdminInput;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
