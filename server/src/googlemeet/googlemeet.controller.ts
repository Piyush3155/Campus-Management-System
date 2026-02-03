import { Controller, Post, Get, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { GoogleMeetService } from './googlemeet.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Google Meet')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('googlemeet')
export class GoogleMeetController {
    constructor(private readonly googleMeetService: GoogleMeetService) {}

    @Post('create')
    @Roles('ADMIN', 'STAFF')
    @ApiOperation({ summary: 'Create a Google Meet and send invitations to students' })
    async createMeeting(@Body() dto: CreateMeetingDto) {
        return this.googleMeetService.createMeetingAndNotify(dto);
    }

    @Get('class/:timetableId')
    @Roles('ADMIN', 'STAFF')
    @ApiOperation({ summary: 'Get class details for meeting creation' })
    async getClassDetails(@Param('timetableId') timetableId: string) {
        return this.googleMeetService.getClassDetails(timetableId);
    }

    @Get('students')
    @Roles('ADMIN', 'STAFF')
    @ApiOperation({ summary: 'Preview students who will receive meeting invitations' })
    @ApiQuery({ name: 'departmentId', required: true })
    @ApiQuery({ name: 'semester', required: false })
    @ApiQuery({ name: 'section', required: false })
    async previewStudents(
        @Query('departmentId') departmentId: string,
        @Query('semester') semester?: string,
        @Query('section') section?: string,
    ) {
        return this.googleMeetService.getStudentsPreview(
            departmentId,
            semester ? parseInt(semester, 10) : undefined,
            section,
        );
    }
}
