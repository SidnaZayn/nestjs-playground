import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BookmarkDto {
  @ApiProperty({
    example:'bookmark'
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example:'desc',
    required:false
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example:'www.link.com'
  })
  @IsNotEmpty()
  @IsString()
  link: string;
}
