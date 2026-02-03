import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateMeetingDto {
    @ApiProperty({ description: 'Timetable entry ID' })
    @IsString()
    timetableId: string;

    @ApiProperty({ description: 'Subject ID' })
    @IsString()
    subjectId: string;

    @ApiProperty({ description: 'Subject name' })
    @IsString()
    subjectName: string;

    @ApiProperty({ description: 'Subject code' })
    @IsString()
    subjectCode: string;

    @ApiProperty({ description: 'Staff/Faculty ID' })
    @IsString()
    staffId: string;

    @ApiProperty({ description: 'Staff/Faculty name' })
    @IsString()
    staffName: string;

    @ApiProperty({ description: 'Semester number' })
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    semester: number;

    @ApiProperty({ description: 'Section' })
    @IsString()
    section: string;

    @ApiProperty({ description: 'Department ID' })
    @IsOptional()
    @IsString()
    departmentId?: string;

    @ApiProperty({ description: 'Scheduled date for the meeting' })
    @IsDateString()
    scheduledDate: string;

    @ApiProperty({ description: 'Meeting start time' })
    @IsString()
    startTime: string;

    @ApiProperty({ description: 'Meeting end time' })
    @IsString()
    endTime: string;

    @ApiPropertyOptional({ description: 'Custom meeting title' })
    @IsOptional()
    @IsString()
    meetingTitle?: string;

    @ApiPropertyOptional({ description: 'Custom meeting description' })
    @IsOptional()
    @IsString()
    meetingDescription?: string;
}
