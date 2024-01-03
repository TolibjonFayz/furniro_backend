import { Module } from '@nestjs/common';
import { ProductSizeService } from './product_size.service';
import { ProductSizeController } from './product_size.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product_size } from './model/product_size.model';

@Module({
  imports: [SequelizeModule.forFeature([Product_size])],
  controllers: [ProductSizeController],
  providers: [ProductSizeService],
  exports: [ProductSizeService],
})
export class ProductSizeModule {}
