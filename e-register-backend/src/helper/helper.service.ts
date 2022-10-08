import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { join, parse } from 'path';

@Injectable()
export class HelperService {
  @Inject(ConfigService)
  public config: ConfigService;

  // done
  async onModuleInit() {
    const dir = './public';
    const fme = './public/fme';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      fs.mkdirSync(fme);
    }
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
    let url = join(process.cwd(), `./public/fme/${name}-${Date.now()}${ext}`);
    const imageStream = fs.createWriteStream(url);
    await stream.pipe(imageStream);
    url = `${baseUrl}${url.split('public')[1]}`;
    return url;
  }
  deleteFile(url: string) {
    const deleteUrl = url.split('fme')[1];
    fs.unlinkSync(join(process.cwd(), `./public/fme${deleteUrl}`));
  }
  mongoQuery(prop: string, queryProp: string, value: any) {
    return value === null ? null : { [prop]: { [queryProp]: value } };
  }
  mongoObjectFilter(data: any) {
    const item: any = { ...data };
    Object.keys(item).forEach((key) => {
      if (item[key] === '' || item[key] === null || item[key].length === 0) {
        delete item[key];
      }
    });
    return item;
  }
  mongoArrayFilter(data: any) {
    return data.filter((q: any) => q !== null);
  }
}
