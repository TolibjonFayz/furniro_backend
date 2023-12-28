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
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@ApiTags('Size')
@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}
  //Create sizes
  @ApiOperation({ summary: 'Create size' })
  @Post('create')
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizeService.create(createSizeDto);
  }

  //Find all sizes
  @ApiOperation({ summary: 'Find all sizes' })
  @Get('all')
  findAll() {
    return this.sizeService.findAll();
  }

  //Find size by id
  @ApiOperation({ summary: 'Find size by id' })
  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.sizeService.findById(id);
  }

  //Update size by id
  @ApiOperation({ summary: 'Update size by id' })
  @Put('update/:id')
  update(@Param('id') id: number, @Body() updateSizeDto: UpdateSizeDto) {
    return this.sizeService.update(id, updateSizeDto);
  }

  //Delete size by id
  @ApiOperation({ summary: 'Delete size by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.sizeService.remove(id);
  }
}
