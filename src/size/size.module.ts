import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Size } from './model/size.model';

@Module({
  imports: [SequelizeModule.forFeature([Size])],
  controllers: [SizeController],
  providers: [SizeService],
  exports: [SizeService],
})
export class SizeModule {}
