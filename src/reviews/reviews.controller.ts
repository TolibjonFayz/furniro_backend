import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @ApiOperation({ summary: 'Create review' })
  @Post('create')
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @ApiOperation({ summary: 'Get all reviews' })
  @Get('all')
  findAll() {
    return this.reviewsService.findAll();
  }

  @ApiOperation({ summary: 'Get review by id' })
  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.reviewsService.findOne(id);
  }

  @ApiOperation({ summary: 'Get reviews by product id' })
  @Get('product/:id')
  findByProductId(@Param('id') product_id: number) {
    return this.reviewsService.findByProductId(product_id);
  }

  @ApiOperation({ summary: 'Update review by id' })
  @Put('update/:id')
  update(@Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @ApiOperation({ summary: 'Delete review by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.reviewsService.remove(id);
  }
}
