import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoticeDto, UpdateNoticeDto } from './dto/create-notice.dto';
import { NoticeAudience } from '@prisma/client';

@Injectable()
export class NoticesService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateNoticeDto, authorId: string) {
        return this.prisma.notice.create({
            data: {
                ...data,
                authorId,
            },
            include: {
                author: {
                    select: {
                        name: true,
                        role: true,
                    }
                }
            }
        });
    }

    async findAll(audience?: NoticeAudience) {
        const whereClause = audience ? {
            OR: [
                { audience: NoticeAudience.ALL },
                { audience },
            ]
        } : {};

        return this.prisma.notice.findMany({
            where: whereClause,
            orderBy: [
                { pinned: 'desc' },
                { createdAt: 'desc' },
            ],
            include: {
                author: {
                    select: {
                        name: true,
                        role: true,
                    }
                }
            }
        });
    }

    async findOne(id: string) {
        return this.prisma.notice.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        name: true,
                        role: true,
                    }
                }
            }
        });
    }

    async update(id: string, data: UpdateNoticeDto) {
        return this.prisma.notice.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.notice.delete({
            where: { id },
        });
    }

    async togglePin(id: string) {
        const notice = await this.prisma.notice.findUnique({ where: { id } });
        if (!notice) {
            throw new Error('Notice not found');
        }
        return this.prisma.notice.update({
            where: { id },
            data: { pinned: !notice.pinned }
        });
    }
}
