import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { CustomQuery } from 'src/admin/dto/query.input';
import { AdminStatusInput } from 'src/admin/dto/status-admin.input';
import { AuthPayload } from 'src/auth/entities/auth.entity';
import { HelperService } from 'src/helper/helper.service';
import { LogService } from 'src/log/log.service';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private mailService: MailService,
    private helperService: HelperService,
    private logService: LogService,
  ) {}

  async create(createUserInput: CreateUserInput, baseUrl: string) {
    try {
      const documentArray: any = [];
      // other documents
      if (createUserInput.uploadedDocument) {
        for (const iterator of createUserInput.uploadedDocument) {
          const fileUploaded = await this.helperService.uploadFile(
            baseUrl,
            iterator['photo'],
          );
          documentArray.push({
            title: iterator.title,
            photo: fileUploaded,
          });
        }
      }
      let evidenceOfPayment: any,
        applicationLetter: any,
        certificateOfIncorporation: any,
        certificateOfTaxClearance: any,
        collaborationCertificateWithForeignPartners: any,
        letterOfCredibilityFromBanks: any;

      // application letter
      if (createUserInput.applicationLetter) {
        applicationLetter = await this.helperService.uploadFile(
          baseUrl,
          createUserInput.applicationLetter['photo'],
        );
      }
      // Certificate of Incorporation
      if (createUserInput.certificateOfIncorporation) {
        certificateOfIncorporation = await this.helperService.uploadFile(
          baseUrl,
          createUserInput.certificateOfIncorporation,
        )['photo'];
      }
      // Certificate of Incorporation
      if (createUserInput.certificateOfTaxClearance) {
        certificateOfTaxClearance = await this.helperService.uploadFile(
          baseUrl,
          createUserInput.certificateOfTaxClearance,
        )['photo'];
      }
      // Certificate of Incorporation
      if (createUserInput.collaborationCertificateWithForeignPartners) {
        collaborationCertificateWithForeignPartners =
          await this.helperService.uploadFile(
            baseUrl,
            createUserInput.collaborationCertificateWithForeignPartners,
          )['photo'];
      }
      // Certificate of Incorporation
      if (createUserInput.evidenceOfPayment) {
        evidenceOfPayment = await this.helperService.uploadFile(
          baseUrl,
          createUserInput.evidenceOfPayment,
        )['photo'];
      }
      // Certificate of Incorporation
      if (createUserInput.letterOfCredibilityFromBanks) {
        letterOfCredibilityFromBanks = await this.helperService.uploadFile(
          baseUrl,
          createUserInput.letterOfCredibilityFromBanks,
        )['photo'];
      }

      createUserInput['document'] = documentArray;

      // create a query params
      const queryParam: any = { email: createUserInput.email };
      // check if email already existe
      const checkEmail = await this.userRepository.findOne({
        where: queryParam,
      });
      // check if user exist
      if (checkEmail) throw new Error('Email already Exist');

      // create admin instance
      const newUser = this.userRepository.create({
        evidenceOfPayment: evidenceOfPayment,
        applicationLetter: applicationLetter,
        certificateOfIncorporation: certificateOfIncorporation,
        letterOfCredibilityFromBanks: letterOfCredibilityFromBanks,
        collaborationCertificateWithForeignPartners:
          collaborationCertificateWithForeignPartners,
        certificateOfTaxClearance: certificateOfTaxClearance,
        credential: await this.helperService.hashPassword(
          createUserInput['credential'],
        ),
        isEmailActive: false,
        isActive: false,
      });

      // save admin
      const savedData = await this.userRepository.save(newUser);

      // generate registration token
      const tokenPayload: any = {
        email: this.create,
      };
      const token = await this.helperService.generateToken({
        payload: tokenPayload,
      });

      // create registration link
      const url = `${baseUrl}/verify-email?token=${token}`;

      // send Email
      this.mailService.sendMail({
        email: createUserInput.email,
        subject: 'User Account Creation',
        template: 'invite',
        context: {
          url: url,
        },
      });
      // create log
      this.logService.create({
        info: 'New User Created',
        by: savedData.id,
        isAdmin: false,
      });

      return savedData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  async resendEmailVerificationToken(email: string, baseUrl: string) {
    try {
      // create a query params
      const queryParam: any = { email: email };
      // check if email already existe
      const checkEmail = await this.userRepository.findOne({
        where: queryParam,
      });
      // check if user exist
      if (!checkEmail) throw new Error('Email is not attached to a user');

      // generate registration token
      const tokenPayload: any = {
        email: email,
      };
      const token = await this.helperService.generateToken({
        payload: tokenPayload,
      });

      // create registration link
      const url = `${baseUrl}/verify-email?token=${token}`;

      // send Email
      this.mailService.sendMail({
        email: email,
        subject: 'Resend Email Verification Email',
        template: 'invite',
        context: {
          url: url,
        },
      });
      // create log
      this.logService.create({
        info: 'Resend Email Verification',
        by: checkEmail.id,
        isAdmin: false,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  async verifyEmail(token: string) {
    try {
      // destructure token
      const data: any = await this.helperService.verifyToken(token);

      // fiind user by email
      // create a query params
      const queryParam: any = { email: data.email };
      // check if email already existe
      let checkEmail = await this.userRepository.findOne({
        where: queryParam,
      });
      // check if user exist
      if (!checkEmail) throw new Error('Email is not attached to a user');

      const updatedData = this.userRepository.update(checkEmail.id, {
        isEmailActive: true,
      });
      if (!updatedData) throw new Error('Unable to Updated');
      // get updated data
      checkEmail = await this.userRepository.findOne({
        where: queryParam,
      });
      return checkEmail;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  async forgottenPassword(email: string, baseUrl: string) {
    try {
      // create a query params
      const queryParam: any = { email: email };
      // check if email already existe
      const checkEmail = await this.userRepository.findOne({
        where: queryParam,
      });
      // check if user exist
      if (!checkEmail) throw new Error('Invalid Email Address');

      // generate registration token
      const tokenPayload: any = {
        email: email,
      };
      const token = await this.helperService.generateToken({
        payload: tokenPayload,
      });

      // create registration link
      const url = `${baseUrl}/reset-password?token=${token}`;

      // send Email
      this.mailService.sendMail({
        email: email,
        subject: 'Reset Password',
        template: 'invite',
        context: {
          url: url,
        },
      });
      // create log
      this.logService.create({
        info: 'Resend Email Verification',
        by: checkEmail.id,
        isAdmin: false,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  async resetPassword(token: string, credential: string) {
    try {
      // destructure token
      const data: any = await this.helperService.verifyToken(token);

      // fiind user by email
      // create a query params
      const queryParam: any = { email: data.email };
      // check if email already existe
      let checkEmail = await this.userRepository.findOne({
        where: queryParam,
      });
      // check if user exist
      if (!checkEmail) throw new Error('Invalid User Details');

      const updatedData = await this.userRepository.update(checkEmail.id, {
        credential: await this.helperService.hashPassword(credential),
      });
      if (!updatedData) throw new Error('Unable to Updated');
      // get updated data
      checkEmail = await this.userRepository.findOne({
        where: queryParam,
      });
      return checkEmail;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  async loginUser(loginUserInput: LoginUserInput) {
    try {
      const { email, credential } = loginUserInput;
      const checkAdminExist = await this.userRepository.findOneBy({
        email,
      });
      if (!checkAdminExist) throw new Error('Invalid Credentials');
      const checkPasswordValid = await this.helperService.comparePassword(
        credential,
        checkAdminExist.credential,
      );
      if (!checkPasswordValid) throw new Error('Invalid Credentials');

      const tokenPayload: AuthPayload = {
        firstName: checkAdminExist.nameOfCompany,
        lastName: checkAdminExist.phoneNumber,
        email: checkAdminExist.email,
        isAdmin: false,
        isRoot: false,
        id: checkAdminExist.id,
      };

      return await this.helperService.generateToken({
        payload: tokenPayload,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  async findAll(customQuery: CustomQuery) {
    try {
      // get query params
      const { skip, size, search } = customQuery;
      // generate main query
      let query: any = {};
      // check if search exist
      if (search) {
        query = {
          $or: [
            {
              nameOfCompany: { $regex: search, $options: 'i' },
            },
            {
              rcNumber: { $regex: search, $options: 'i' },
            },
            {
              email: { $regex: search, $options: 'i' },
            },
          ],
        };
      }

      // find all
      const result = await this.userRepository.find({
        where: query,
        take: size,
        skip: skip,
        order: { nameOfCompany: 'DESC' },
      });

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  async findOne(id: string, data: any) {
    try {
      const query: any = { _id: new ObjectId(id) };
      const result = await this.userRepository.findOne({
        where: query,
      });

      if (!result) throw new Error('Item not found');

      // create log
      this.logService.create({
        info: 'Viewed an Users',
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
    updateUserInput: UpdateUserInput | AdminStatusInput,
    data: any,
    baseUrl: string,
  ) {
    try {
      const query: any = { _id: new ObjectId(id) };
      let result = await this.userRepository.findOne({
        where: query,
      });
      if (!result) throw new Error('Item not found');

      const documentArray: any = [];
      let updatedPayload: any = { ...updateUserInput };
      // other documents
      if (updateUserInput['uploadedDocument']) {
        for (const iterator of updateUserInput['uploadedDocument']) {
          const fileUploaded = await this.helperService.uploadFile(
            baseUrl,
            iterator['photo'],
          );
          documentArray.push({
            title: iterator.title,
            photo: fileUploaded,
          });
        }
      }

      // application letter
      if (updateUserInput['applicationLetter']) {
        const applicationLetter = await this.helperService.uploadFile(
          baseUrl,
          updateUserInput['applicationLetter'],
        );
        updatedPayload = {
          ...updatedPayload,
          applicationLetter: applicationLetter,
        };
      }
      // Certificate of Incorporation
      if (updateUserInput['certificateOfIncorporation']) {
        const certificateOfIncorporation = await this.helperService.uploadFile(
          baseUrl,
          updateUserInput['certificateOfIncorporation'],
        )['photo'];
        updatedPayload = {
          ...updatedPayload,
          certificateOfIncorporation: certificateOfIncorporation,
        };
      }
      // Certificate of Incorporation
      if (updateUserInput['certificateOfTaxClearance']) {
        const certificateOfTaxClearance = await this.helperService.uploadFile(
          baseUrl,
          updateUserInput['certificateOfTaxClearance'],
        )['photo'];

        updatedPayload = {
          ...updatedPayload,
          certificateOfTaxClearance: certificateOfTaxClearance,
        };
      }
      // Certificate of Incorporation
      if (updateUserInput['collaborationCertificateWithForeignPartners']) {
        const collaborationCertificateWithForeignPartners =
          await this.helperService.uploadFile(
            baseUrl,
            updateUserInput['collaborationCertificateWithForeignPartners'],
          )['photo'];
        updatedPayload = {
          ...updatedPayload,
          collaborationCertificateWithForeignPartners:
            collaborationCertificateWithForeignPartners,
        };
      }
      // Certificate of Incorporation
      if (updateUserInput['evidenceOfPayment']) {
        const evidenceOfPayment = await this.helperService.uploadFile(
          baseUrl,
          updateUserInput['evidenceOfPayment'],
        )['photo'];
        updatedPayload = {
          ...updatedPayload,
          evidenceOfPayment: evidenceOfPayment,
        };
      }
      // Certificate of Incorporation
      if (updateUserInput['letterOfCredibilityFromBanks']) {
        const letterOfCredibilityFromBanks =
          await this.helperService.uploadFile(
            baseUrl,
            updateUserInput['letterOfCredibilityFromBanks'],
          )['photo'];
        updatedPayload = {
          ...updatedPayload,
          letterOfCredibilityFromBanks: letterOfCredibilityFromBanks,
        };
      }

      updateUserInput['document'] = documentArray;

      const updatedData = await this.userRepository.update(id, updatedPayload);

      if (!updatedData) throw new Error('Unable to Updated');
      // get updated data
      result = await this.userRepository.findOne({
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
      const query: any = { _id: new ObjectId(id) };
      const result = await this.userRepository.findOne({
        where: query,
      });
      if (!result) throw new Error('Item not found');
      const deletedData = await this.userRepository.remove(result);

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
