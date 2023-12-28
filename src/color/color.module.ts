import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Color } from './model/color.model';

@Module({
  imports: [SequelizeModule.forFeature([Color])],
  controllers: [ColorController],
  providers: [ColorService],
  exports: [ColorService],
})
export class ColorModule {}
