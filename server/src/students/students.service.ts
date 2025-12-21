import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto, UpdateStudentDto, BulkPromoteDto } from './dto/student.dto';
import { CMSUserRole } from '@prisma/client';

@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService) { }

    async findAll(page: number = 1, limit: number = 10, search?: string, courseId?: string) {
        console.log(`[StudentsService] findAll - page: ${page}, limit: ${limit}, search: ${search}, courseId: ${courseId}`);
        const skip = (page - 1) * limit;
        const where: any = {
            role: CMSUserRole.STUDENT,
        };

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                {
                    profile: {
                        regno: { contains: search, mode: 'insensitive' }
                    }
                }
            ];
        }

        if (courseId) {
            where.courses = {
                some: {
                    courseId,
                },
            };
        }

        const [students, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                include: {
                    profile: true,
                    department: true,
                    courses: {
                        include: {
                            course: true,
                        },
                    },
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.user.count({ where }),
        ]);

        return {
            students,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findById(id: string) {
        const student = await this.prisma.user.findUnique({
            where: { id },
            include: {
                profile: true,
                department: true,
                courses: {
                    include: {
                        course: true,
                    },
                },
            },
        });

        if (!student || student.role !== 'STUDENT') {
            throw new NotFoundException('Student not found');
        }

        return student;
    }

    async getStats() {
        const [totalStudents, activeStudents, courses] = await Promise.all([
            this.prisma.user.count({ where: { role: 'STUDENT' } }),
            this.prisma.user.count({ where: { role: 'STUDENT', isActive: true } }),
            this.prisma.course.findMany({
                where: { status: 'ACTIVE' },
                include: {
                    _count: {
                        select: { enrollments: true },
                    },
                },
            }),
        ]);

        return {
            totalStudents,
            activeStudents,
            activeBatches: courses.length,
            courseDistribution: courses.map(c => ({
                course: c.title,
                count: c._count.enrollments,
            })),
        };
    }

    async create(dto: CreateStudentDto) {
        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existing) {
            throw new ConflictException('Email already exists');
        }

        return this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                departmentId: dto.departmentId,
                role: 'STUDENT',
                isActive: true,
                isVerified: true,
                profile: {
                    create: {
                        semester: dto.semester,
                        section: dto.section,
                        regno: dto.regno,
                        cgpa: dto.cgpa,
                    },
                },
            },
            include: {
                profile: true,
            },
        });
    }

    async update(id: string, dto: UpdateStudentDto) {
        await this.findById(id); // Ensure student exists

        return this.prisma.user.update({
            where: { id },
            data: {
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                departmentId: dto.departmentId,
                isActive: dto.isActive,
                profile: {
                    upsert: {
                        create: {
                            semester: dto.semester,
                            section: dto.section,
                            regno: dto.regno,
                            cgpa: dto.cgpa,
                        },
                        update: {
                            semester: dto.semester,
                            section: dto.section,
                            regno: dto.regno,
                            cgpa: dto.cgpa,
                        },
                    },
                },
            },
            include: {
                profile: true,
            },
        });
    }

    async bulkPromote(dto: BulkPromoteDto) {
        return this.prisma.profile.updateMany({
            where: {
                userId: { in: dto.studentIds },
            },
            data: {
                semester: dto.targetSemester,
                section: dto.section,
            },
        });
    }

    async updateSection(id: string, section: string, semester?: number) {
        const student = await this.findById(id);

        return this.prisma.profile.upsert({
            where: { userId: id },
            create: {
                userId: id,
                section,
                semester: semester ?? 1,
            },
            update: {
                section,
                semester: semester ?? student.profile?.semester,
            },
        });
    }
}
