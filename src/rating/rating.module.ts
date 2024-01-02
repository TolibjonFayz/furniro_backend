import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rating } from './model/rating.model';

@Module({
  imports: [SequelizeModule.forFeature([Rating])],
  controllers: [RatingController],
  providers: [RatingService],
  exports: [RatingService],
})
export class RatingModule {}
