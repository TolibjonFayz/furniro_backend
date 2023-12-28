import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ColorService } from './color.service';
import { CreateColoryDto } from './dto/create-color.dto';
import { UpdateColoryDto } from './dto/update-color.dto';

@ApiTags('Color')
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}
  //Create color
  @ApiOperation({ summary: 'Create color' })
  @Post('create')
  create(@Body() createColorDto: CreateColoryDto) {
    return this.colorService.create(createColorDto);
  }

  //Find all colors
  @ApiOperation({ summary: 'Find all colors' })
  @Get('all')
  findAll() {
    return this.colorService.findAll();
  }

  //Find color by id
  @ApiOperation({ summary: 'Find color by id' })
  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.colorService.findById(id);
  }

  //Update color by id
  @ApiOperation({ summary: 'Update color by id' })
  @Put('update/:id')
  update(@Param('id') id: number, @Body() updateColoryDto: UpdateColoryDto) {
    return this.colorService.update(id, updateColoryDto);
  }

  //Delete color by id
  @ApiOperation({ summary: 'Delete color by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.colorService.remove(id);
  }
}
