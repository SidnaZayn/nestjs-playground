import {
  Controller,
  UseGuards,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { JwtGuard } from '@/auth/guard';
import { BookmarkDto, editBookmarkDto } from './dto';
import { GetUser } from '@/auth/decorator';

@Controller('bookmark')
@UseGuards(JwtGuard)
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post()
  createBookmark(@GetUser('id') userId: number, @Body() dto: BookmarkDto) {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Get()
  getBookmark() {
    return this.bookmarkService.getBookmark();
  }

  @Get('/:id')
  getBookmarkById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
  ) {
    return this.bookmarkService.getBookmarkById(id, userId);
  }

  @Put('/:id')
  editBookmarkById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
    @Body() dto: editBookmarkDto,
  ) {
    return this.bookmarkService.editBookmarkById(id, userId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteBookmarkById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(id, userId);
  }
}
