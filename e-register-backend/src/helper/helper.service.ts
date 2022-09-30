import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { createWriteStream } from 'fs';
import * as jwt from 'jsonwebtoken';
import { join, parse } from 'path';
import { DocumentInput } from 'src/user/dto/documents-user.input';

@Injectable()
export class HelperService {
  @Inject(ConfigService)
  public config: ConfigService;

  // done
  async onModuleInit() {
    // const test = this.httpServer;
    // console.log(test);
  }

  async hashPassword(payload: string) {
    return bcrypt.hashSync(payload, parseInt(`${this.config.get('SALT')}`));
  }
  async comparePassword(password: string, hashPassword: string) {
    return bcrypt.compare(password, hashPassword);
  }
  async generateToken({
    payload,
    time = '1h',
  }: {
    payload: any;
    time?: string;
  }) {
    return jwt.sign({ ...payload }, `${this.config.get('SECRET')}`, {
      expiresIn: time,
    });
  }
  async verifyToken(payload: string) {
    return jwt.verify(payload, `${this.config.get('SECRET')}`);
  }
  async isARootAdmin(data: any) {
    return (
      data.hasOwnProperty('isRoot') &&
      data['isRoot'] &&
      data.hasOwnProperty('isActive') &&
      data['isActive']
    );
  }
  async isAnAdmin(data: any) {
    return (
      data.hasOwnProperty('isAdmin') &&
      data['isAdmin'] &&
      data.hasOwnProperty('isActive') &&
      data['isActive']
    );
  }
  async isAUser(data: any) {
    return (
      data.hasOwnProperty('isUser') &&
      data['isUser'] &&
      data.hasOwnProperty('isActive') &&
      data['isActive']
    );
  }
  async isAnAdminOrAUser(data: any) {
    return this.isAUser(data) || this.isAnAdmin(data);
  }
  filter(fields: any, search?: string) {
    return {
      $or: fields.map(function (item: string) {
        return { [item]: { $regex: search, $options: 'i' } };
      }),
    };
  }
  async uploadFile(baseUrl: string, file: any): Promise<string> {
    const { createReadStream, filename } = await file;
    const stream = createReadStream();
    let { name } = parse(filename);
    const { ext } = parse(filename);
    name = `file${Math.floor(Math.random() * 1000) + 1}`;
    let url = join(process.cwd(), `./src/upload/${name}${Date.now()}${ext}`);
    const imageStream = createWriteStream(url);
    await stream.pipe(imageStream);
    url = `${baseUrl}${url.split('upload')[1]}`;
    return url;
  }
}
