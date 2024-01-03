import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AdditionalInformation } from './model/additional_information.model';
import { CreateAddtionalInformationDto } from './dto/create-additional_information.dto';
import { UpdateAddtionalInformationDto } from './dto/update-additional_information.dto';

@Injectable()
export class AdditionalInformationService {
  constructor(
    @InjectModel(AdditionalInformation)
    private readonly AIRepository: typeof AdditionalInformation,
  ) {}

  async create(createAIDto: CreateAddtionalInformationDto) {
    const newAI = await this.AIRepository.create(createAIDto);
    return newAI;
  }

  async findAll() {
    return await this.AIRepository.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    return await this.AIRepository.findByPk(id);
  }

  async findByProduct(product_id: number) {
    return await this.AIRepository.findAll({
      where: { product_id: product_id },
    });
  }

  async update(id: number, updateAIDto: UpdateAddtionalInformationDto) {
    const updating = await this.AIRepository.update(updateAIDto, {
      where: { id: id },
    });
    return updating;
  }

  async remove(id: number) {
    const deleting = await this.AIRepository.destroy({
      where: { id: id },
    });
    return deleting;
  }
}
