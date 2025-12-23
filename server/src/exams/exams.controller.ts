import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto, UpdateExamDto } from './dto/exam.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Exams')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('exams')
export class ExamsController {
    constructor(private readonly examsService: ExamsService) { }

    @Post()
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Create a new exam' })
    create(@Body() createExamDto: CreateExamDto) {
        return this.examsService.create(createExamDto);
    }

    @Get()
    @Roles('ADMIN', 'STAFF', 'STUDENT')
    @ApiOperation({ summary: 'Get all exams' })
    findAll() {
        return this.examsService.findAll();
    }

    @Get('stats')
    @Roles('ADMIN', 'STAFF')
    @ApiOperation({ summary: 'Get exam dashboard statistics' })
    getDashboardStats() {
        return this.examsService.getDashboardStats();
    }

    @Get('results-overview')
    @Roles('ADMIN', 'STAFF')
    @ApiOperation({ summary: 'Get result overview for all subjects' })
    getResultOverview() {
        return this.examsService.getResultOverview();
    }

    @Get(':id')
    @Roles('ADMIN', 'STAFF', 'STUDENT')
    @ApiOperation({ summary: 'Get a specific exam' })
    findOne(@Param('id') id: string) {
        return this.examsService.findOne(id);
    }

    @Patch(':id')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Update an exam' })
    update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
        return this.examsService.update(id, updateExamDto);
    }

    @Delete(':id')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Delete an exam' })
    remove(@Param('id') id: string) {
        return this.examsService.remove(id);
    }
}
