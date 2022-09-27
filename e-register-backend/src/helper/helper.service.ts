import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class HelperService {
  @Inject(ConfigService)
  public config: ConfigService;
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
    return data.hasOwnProperty('isRoot') && data['isRoot'];
  }
  async isAnAdmin(data: any) {
    return data.hasOwnProperty('isAdmin') && data['isAdmin'];
  }
  async isAUser(data: any) {
    return data.hasOwnProperty('isUser') && data['isUser'];
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
}
