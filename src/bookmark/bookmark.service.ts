import { PrismaService } from '@/prisma/prisma.service';
import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { BookmarkDto, editBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async createBookmark(userId: number, dto: BookmarkDto) {
    try {
      const bookmark = await this.prisma.bookmark.create({
        data: {
          userId: userId,
          ...dto,
        },
      });
      return bookmark;
    } catch (error) {
      throw new BadRequestException('Bad Request Exception');
    }
  }

  async getBookmark() {
    const allBookmark = await this.prisma.bookmark.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            _count: true,
          },
        },
      },
    });

    return allBookmark;
  }

  async getBookmarkById(id: number, userId: number) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: { id: id, userId },
    });

    return bookmark;
  }

  async editBookmarkById(id: number, userId: number, dto: editBookmarkDto) {
    const newBookmark = await this.prisma.bookmark.update({
      where: { id: id, userId: userId },
      data: { ...dto },
    });

    return newBookmark;
  }

  async deleteBookmarkById(id: number, userId: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: id },
    });

    if (!bookmark) {
      throw new BadRequestException('Bookmark Not Found');
    }

    if (bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }

    await this.prisma.bookmark.delete({
      where: { id: id },
    });
  }
}
