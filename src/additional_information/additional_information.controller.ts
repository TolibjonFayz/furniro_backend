import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AdditionalInformationService } from './additional_information.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAddtionalInformationDto } from './dto/create-additional_information.dto';
import { UpdateAddtionalInformationDto } from './dto/update-additional_information.dto';

@ApiTags('Additional infotmation')
@Controller('additional-information')
export class AdditionalInformationController {
  constructor(
    private readonly additionalInformationService: AdditionalInformationService,
  ) {}

  @ApiOperation({ summary: 'Create AI' })
  @Post('create')
  create(@Body() createAIDto: CreateAddtionalInformationDto) {
    return this.additionalInformationService.create(createAIDto);
  }

  @ApiOperation({ summary: 'Get AIs' })
  @Get('all')
  findAll() {
    return this.additionalInformationService.findAll();
  }

  @ApiOperation({ summary: 'Get AI by id' })
  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.additionalInformationService.findOne(id);
  }

  @ApiOperation({ summary: 'Get AIs by product id' })
  @Get('user/:id')
  findByUserId(@Param('id') product_id: number) {
    return this.additionalInformationService.findByProduct(product_id);
  }

  @ApiOperation({ summary: 'Update AI by id' })
  @Put('update/:id')
  update(
    @Param('id') id: number,
    @Body() updateAIDto: UpdateAddtionalInformationDto,
  ) {
    return this.additionalInformationService.update(id, updateAIDto);
  }

  @ApiOperation({ summary: 'Delete AI by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.additionalInformationService.remove(id);
  }
}
