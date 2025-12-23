import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamDto, UpdateExamDto } from './dto/exam.dto';
import { ExamStatus } from '@prisma/client';

@Injectable()
export class ExamsService {
    constructor(private prisma: PrismaService) { }

    async create(createExamDto: CreateExamDto) {
        return this.prisma.exam.create({
            data: {
                ...createExamDto,
                date: new Date(createExamDto.date),
                startTime: new Date(createExamDto.startTime),
                endTime: new Date(createExamDto.endTime),
            },
        });
    }

    async findAll() {
        return this.prisma.exam.findMany({
            orderBy: { date: 'asc' },
        });
    }

    async findOne(id: string) {
        const exam = await this.prisma.exam.findUnique({
            where: { id },
        });
        if (!exam) {
            throw new NotFoundException(`Exam with ID ${id} not found`);
        }
        return exam;
    }

    async update(id: string, updateExamDto: UpdateExamDto) {
        const data: any = { ...updateExamDto };
        if (updateExamDto.date) data.date = new Date(updateExamDto.date);
        if (updateExamDto.startTime) data.startTime = new Date(updateExamDto.startTime);
        if (updateExamDto.endTime) data.endTime = new Date(updateExamDto.endTime);

        if (updateExamDto.isResultPublished === true) {
            data.resultsPublishedAt = new Date();
        }

        try {
            return await this.prisma.exam.update({
                where: { id },
                data,
            });
        } catch (e) {
            throw new NotFoundException(`Exam with ID ${id} not found`);
        }
    }

    async remove(id: string) {
        try {
            return await this.prisma.exam.delete({
                where: { id },
            });
        } catch (e) {
            throw new NotFoundException(`Exam with ID ${id} not found`);
        }
    }

    async getDashboardStats() {
        const now = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(now.getDate() + 7);

        const [upcomingExams, resultsPending, publishedResults] = await Promise.all([
            this.prisma.exam.count({
                where: {
                    date: {
                        gte: now,
                        lte: nextWeek,
                    },
                    status: ExamStatus.SCHEDULED,
                },
            }),
            this.prisma.exam.count({
                where: {
                    status: ExamStatus.COMPLETED,
                    isResultPublished: false,
                },
            }),
            this.prisma.exam.count({
                where: {
                    isResultPublished: true,
                    // You might want to filter by current semester/year here
                },
            }),
        ]);

        // Average performance calculation would ideally come from Internal/External marks
        // For now, returning a static or simplified aggregate if possible
        // This is just a placeholder to match the UI's need
        const avgPerformance = 3.2; // Placeholder

        return {
            upcomingExams,
            resultsPending,
            publishedResults,
            avgPerformance,
        };
    }

    async getResultOverview() {
        // This should ideally aggregate data from ExternalMark and InternalMark
        // Similar to internal-marks.service.ts getStudentResults but subject-wise for all students

        const subjects = await this.prisma.subject.findMany({
            include: {
                externalMarks: true,
                internalMarks: true,
            }
        });

        return subjects.map(subject => {
            const allMarks = [...subject.externalMarks, ...subject.internalMarks];
            if (allMarks.length === 0) return null;

            const totalStudents = new Set([...subject.externalMarks.map(m => m.studentId), ...subject.internalMarks.map(m => m.studentId)]).size;

            // Simplified pass/fail logic for overview
            // In a real app, this would be more complex
            const passed = subject.externalMarks.filter(m => (m.marks / m.maxMarks) >= 0.4).length;
            const failed = totalStudents - passed;

            return {
                id: subject.id,
                subject: subject.name,
                code: subject.code,
                totalStudents,
                passed,
                failed,
                avgGrade: 'B+', // Placeholder
                published: true, // Placeholder - should come from Exam model if linked
            };
        }).filter(s => s !== null);
    }
}
