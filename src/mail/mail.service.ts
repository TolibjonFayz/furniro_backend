import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMessageDto } from '../user/dto/send-message.dto';

@Injectable()
export class MailService {
  constructor(private mailerservice: MailerService) {}
  async sendUserMail(sendMessageDto: SendMessageDto): Promise<void> {
    await this.mailerservice.sendMail({
      to: 'tolibjonfayz@gmail.com',
      subject: 'Purchase message from Furniro uz website',
      template: './confirmation',
      context: {
        name: JSON.stringify(sendMessageDto.userinfo),
        things: JSON.stringify(sendMessageDto.products),
      },
    });
  }
}
