import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Mail } from './entities/mail.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendMail(mail: Mail) {
    await this.mailerService.sendMail({
      to: mail.email,
      subject: mail.subject,
      template: `./${mail.template}`,
      context: mail.context,
    });
  }
}
