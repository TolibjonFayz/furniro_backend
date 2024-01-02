import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reviews } from './model/reviews.model';

@Module({
  imports: [SequelizeModule.forFeature([Reviews])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
