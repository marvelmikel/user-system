import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { AccreditationService } from 'src/accreditation/accreditation.service';
import { CustomQuery } from 'src/admin/dto/query-admin.input';
import { AuthPayload } from 'src/auth/entities/auth.entity';
import { HelperService } from 'src/helper/helper.service';
import { LogService } from 'src/log/log.service';
import { MailService } from 'src/mail/mail.service';
import { MongoRepository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { UpdateUserInputByAdmin } from './dto/update-user-by-admin.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UploadDocumentInput } from './dto/upload-document.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>,
    private mailService: MailService,
    private helperService: HelperService,
    private logService: LogService,
    private accreditationService: AccreditationService,
  ) {}

  // done
  async create(createUserInput: CreateUserInput, baseUrl: string) {
    try {
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
        ...createUserInput,
        credential: await this.helperService.hashPassword(
          createUserInput['credential'],
        ),
        isDeleted: false,
      });

      // save admin
      const savedData = await this.userRepository.save(newUser);

      // generate registration token
      const tokenPayload: any = {
        email: createUserInput.email,
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
        by: savedData._id,
        isAdmin: false,
      });

      return savedData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
  // done
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
        by: checkEmail._id,
        isAdmin: false,
      });

      return 'Email Sent Successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
  // done
  async verifyEmail(token: string) {
    try {
      // destructure token
      const data: any = await this.helperService.verifyToken(token);
      console.log(data);
      // fiind user by email
      // create a query params
      const queryParam: any = { email: data.email };
      // check if email already existe
      const checkEmail = await this.userRepository.findOne({
        where: queryParam,
      });
      // check if user exist
      if (!checkEmail) throw new Error('Email is not attached to a user');
      console.log(checkEmail);
      const updatedEmail = await this.userRepository.update(checkEmail._id, {
        isEmailActive: true,
      });
      console.log(updatedEmail);
      // get updated data
      return 'Email Verification successful';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  // done
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
        by: checkEmail._id,
        isAdmin: false,
      });

      return 'Password reset link has been sent to your email';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  // done
  async resetPassword(token: string, credential: string) {
    try {
      // destructure token
      const data: any = await this.helperService.verifyToken(token);

      // fiind user by email
      // create a query params
      const queryParam: any = { email: data.email };
      // check if email already existe
      const checkEmail = await this.userRepository.findOne({
        where: queryParam,
      });
      // check if user exist
      if (!checkEmail) throw new Error('Invalid User Details');

      const updatedData = await this.userRepository.update(checkEmail._id, {
        credential: await this.helperService.hashPassword(credential),
      });
      if (!updatedData) throw new Error('Unable to Updated');
      // get updated data
      // checkEmail = await this.userRepository.findOne({
      //   where: queryParam,
      // });
      return 'Password Successfully Changed';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
  // done
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
        id: checkAdminExist._id,
      };

      const token = await this.helperService.generateToken({
        payload: tokenPayload,
      });
      return {
        ...checkAdminExist,
        token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  async findAll(customQuery: CustomQuery) {
    try {
      const { categoryId, subcategoryId, search, skip, size, isDeleted } =
        customQuery;
      let result: any = [];
      if (categoryId || subcategoryId) {
        // get query params
        result = await this.accreditationService.findAllUsers(customQuery);
      } else {
        const queryParams = this.helperService.mongoObjectFilter({
          $and: this.helperService.mongoArrayFilter([
            this.helperService.mongoObjectFilter({
              $or: this.helperService.mongoArrayFilter([
                this.helperService.mongoQuery(
                  'nameOfCompany',
                  '$regex',
                  search ? search : null,
                ),
                this.helperService.mongoQuery(
                  'email',
                  '$regex',
                  search ? search : null,
                ),
              ]),
            }),
            this.helperService.mongoObjectFilter({ isDeleted: isDeleted }),
          ]),
        });
        result = this.userRepository
          .aggregate([
            { $match: queryParams },
            { $skip: (skip - 1) * size },
            { $limit: size },
          ])
          .toArray();
      }

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  async findOne(id: string, data: any) {
    try {
      console.log(id, data);
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
  async getVerifyStatus(id: string) {
    try {
      const query: any = { _id: new ObjectId(id) };
      const result = await this.userRepository.findOne({
        where: query,
      });

      if (!result) throw new Error('Item not found');

      return {
        stepOne: {
          nameOfCompany: result.nameOfCompany,
          location: result.location,
          address: result.address,
          rcNumber: result.rcNumber,
          dateOfIncorporation: result.dateOfIncorporation,
          tin: result.tin,
          phoneNumber: result.phoneNumber,
        },
        stepTwo: {
          certificateOfIncorporation: result.certificateOfIncorporation,
          certificateOfTaxClearance: result.certificateOfTaxClearance,
          applicationLetter: result.applicationLetter,
        },
        stepThree: {
          letterOfCredibilityFromBanks: result.letterOfCredibilityFromBanks,
          evidenceOfPayment: result.evidenceOfPayment,
          collaborationCertificateWithForeignPartners:
            result.collaborationCertificateWithForeignPartners,
        },
        stepFour: result.curriculumVitae,
        stepFive: result.boardOfDirectors,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(
    id: string,
    updateUserInput: UpdateUserInput | UpdateUserInputByAdmin,
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
            iterator['file'],
          );
          documentArray.push({
            title: iterator.title,
            file: fileUploaded,
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
        );
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
        );

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
          );
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
        );
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
          );
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
  async updateDocument(
    id: string,
    document: UploadDocumentInput,
    data: any,
    baseUrl: string,
  ) {
    try {
      const query: any = { _id: new ObjectId(id) };
      const result = await this.userRepository.findOne({
        where: query,
      });
      if (!result) throw new Error('Item not found');

      let updatedData: any = {
        title: document.title,
      };

      // application letter
      if (document['file']) {
        const cv = await this.helperService.uploadFile(
          baseUrl,
          document['file'],
        );
        console.log(cv);

        updatedData = {
          ...updatedData,
          uploadedFile: cv,
          _id: new ObjectId(),
        };
      }

      const updatePayload: any = {
        $push: { curriculumVitae: updatedData },
      };
      const updatedResult = await this.userRepository.findOneAndUpdate(
        { _id: new ObjectId(id) },
        updatePayload,
      );

      if (!updatedResult) throw new Error('Unable to Updated');

      // create log
      this.logService.create({
        info: 'Updated an Admin',
        by: data.id,
        isAdmin: true,
      });
      return 'Uploaded Successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  async updateBoardOfDirectors(
    id: string,
    document: UploadDocumentInput,
    data: any,
    baseUrl: string,
  ) {
    try {
      const query: any = { _id: new ObjectId(id) };
      const result = await this.userRepository.findOne({
        where: query,
      });
      if (!result) throw new Error('Item not found');

      let updatedData: any = {
        title: document.title,
      };

      // application letter
      if (document['file']) {
        const cv = await this.helperService.uploadFile(
          baseUrl,
          document['file'],
        );
        updatedData = {
          ...updatedData,
          uploadedFile: cv,
          _id: new ObjectId(),
        };
      }

      const updatePayload: any = {
        $push: { boardOfDirectors: updatedData },
      };
      const updatedResult = await this.userRepository.findOneAndUpdate(
        { _id: new ObjectId(id) },
        updatePayload,
      );

      if (!updatedResult) throw new Error('Unable to Updated');

      // create log
      this.logService.create({
        info: 'Updated an Admin',
        by: data.id,
        isAdmin: true,
      });
      return 'Uploaded Successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  async RemoveSingleDocument(data: any, type: string) {
    try {
      const query: any = { _id: new ObjectId(data.id) };
      const result = await this.userRepository.findOne({
        where: query,
      });
      if (!result) throw new Error('Item not found');

      if (result[type]) {
        this.helperService.deleteFile(result[type]);
      } else {
        throw new Error('Document has been deleted˝');
      }

      const updatePayload: any = { $set: { [type]: null } };

      const updatedResult = await this.userRepository.findOneAndUpdate(
        { _id: new ObjectId(data.id) },
        updatePayload,
      );

      if (!updatedResult) throw new Error('Unable to Updated');
      return 'Deleted Successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  async RemoveDocument(data: any, id: string) {
    try {
      const query: any = { _id: new ObjectId(data.id) };
      const result = await this.userRepository.findOne({
        where: query,
      });
      if (!result) throw new Error('Item not found');

      const getUrl = result.curriculumVitae.find((item) => item._id == id);

      if (getUrl?.uploadedFile) {
        this.helperService.deleteFile(getUrl.uploadedFile);
      }

      const updatePayload: any = {
        $pull: { curriculumVitae: { _id: new ObjectId(id) } },
      };
      const updatedResult = await this.userRepository.findOneAndUpdate(
        { _id: new ObjectId(id) },
        updatePayload,
      );

      if (!updatedResult) throw new Error('Unable to Updated');

      // create log
      this.logService.create({
        info: 'Updated an Admin',
        by: data.id,
        isAdmin: true,
      });
      return 'Deleted Successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  async RemoveBoardOfDirectorsDocument(data: any, id: string) {
    try {
      const query: any = { _id: new ObjectId(data.id) };
      const result = await this.userRepository.findOne({
        where: query,
      });
      if (!result) throw new Error('Item not found');

      const getUrl = result.curriculumVitae.find((item) => item._id == id);

      if (getUrl?.uploadedFile) {
        this.helperService.deleteFile(getUrl.uploadedFile);
      }

      const updatePayload: any = {
        $pull: { boardOfDirectors: { _id: new ObjectId(id) } },
      };
      const updatedResult = await this.userRepository.findOneAndUpdate(
        { _id: new ObjectId(id) },
        updatePayload,
      );

      if (!updatedResult) throw new Error('Unable to Updated');

      // create log
      this.logService.create({
        info: 'Updated an Admin',
        by: data.id,
        isAdmin: true,
      });
      return 'Deleted Successfully';
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

  // done
  async contactUs(email: string, subject: string, message: string) {
    try {
      // send Email
      this.mailService.sendMail({
        email: 'jediiry@gmail.com',
        subject: 'Notification',
        template: 'contact',
        context: {
          email: email,
          subject: subject,
          message: message,
        },
      });

      return 'Message Sent Successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
