import { Module } from '@nestjs/common';
import { AdditionalInformationService } from './additional_information.service';
import { AdditionalInformationController } from './additional_information.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdditionalInformation } from './model/additional_information.model';

@Module({
  imports: [SequelizeModule.forFeature([AdditionalInformation])],
  controllers: [AdditionalInformationController],
  providers: [AdditionalInformationService],
  exports: [AdditionalInformationService],
})
export class AdditionalInformationModule {}
