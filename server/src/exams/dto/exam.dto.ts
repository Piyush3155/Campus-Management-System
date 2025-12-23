import { IsString, IsEnum, IsDateString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExamType, ExamStatus } from '@prisma/client';

export class CreateExamDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    code: string;

    @ApiProperty({ enum: ExamType })
    @IsEnum(ExamType)
    type: ExamType;

    @ApiProperty({ enum: ExamStatus, required: false })
    @IsOptional()
    @IsEnum(ExamStatus)
    status?: ExamStatus;

    @ApiProperty()
    @IsDateString()
    date: string;

    @ApiProperty()
    @IsDateString()
    startTime: string;

    @ApiProperty()
    @IsDateString()
    endTime: string;

    @ApiProperty()
    @IsString()
    room: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;
}

export class UpdateExamDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    code?: string;

    @ApiProperty({ enum: ExamType, required: false })
    @IsOptional()
    @IsEnum(ExamType)
    type?: ExamType;

    @ApiProperty({ enum: ExamStatus, required: false })
    @IsOptional()
    @IsEnum(ExamStatus)
    status?: ExamStatus;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    date?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    startTime?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    endTime?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    room?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    isResultPublished?: boolean;
}
