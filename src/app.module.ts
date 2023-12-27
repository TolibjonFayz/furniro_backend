import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { OtpModule } from './otp/otp.module';
import { User } from './user/model/user.model';
import { Otp } from './otp/models/otp.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [User, Otp],
      autoLoadModels: true,
      logging: false,
    }),
    UserModule,
    OtpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
