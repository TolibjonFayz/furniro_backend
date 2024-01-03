import { Module } from '@nestjs/common';
import { ProductColorService } from './product_color.service';
import { ProductColorController } from './product_color.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product_color } from './model/product_color.model';

@Module({
  imports: [SequelizeModule.forFeature([Product_color])],
  controllers: [ProductColorController],
  providers: [ProductColorService],
  exports: [ProductColorService],
})
export class ProductColorModule {}
