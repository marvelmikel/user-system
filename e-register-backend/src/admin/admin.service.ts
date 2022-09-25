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

  async createLoginToken(loginAdminInput: LoginAdminInput) {
    try {
      const { email, credential } = loginAdminInput;
      const checkAdminExist = await this.adminRepository.findOneByOrFail({
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
  async inviteAdmin(baseUrl: string, email: string) {
    try {
      console.log(baseUrl);
      const checkAdminExist = await this.adminRepository.findOneByOrFail({
        email,
      });
      if (checkAdminExist) throw new Error('Email Already Exist');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  create(createAdminInput: CreateAdminInput) {
    return createAdminInput;
  }

  findAll() {
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
