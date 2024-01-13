import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { OtpModule } from './otp/otp.module';
import { User } from './user/model/user.model';
import { Otp } from './otp/models/otp.model';
import { CategoryModule } from './category/category.module';
import { ColorModule } from './color/color.module';
import { SizeModule } from './size/size.module';
import { ProductModule } from './product/product.module';
import { ImageModule } from './image/image.module';
import { RatingModule } from './rating/rating.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ProductColorModule } from './product_color/product_color.module';
import { ProductSizeModule } from './product_size/product_size.module';
import { CartModule } from './cart/cart.module';
import { AdditionalInformationModule } from './additional_information/additional_information.module';
import { LikesModule } from './likes/likes.module';

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
    CategoryModule,
    ColorModule,
    SizeModule,
    ProductModule,
    ImageModule,
    RatingModule,
    ReviewsModule,
    ProductColorModule,
    ProductSizeModule,
    CartModule,
    AdditionalInformationModule,
    LikesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
