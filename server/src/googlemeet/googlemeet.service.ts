import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { v4 as uuidv4 } from 'uuid';
import { format, parseISO } from 'date-fns';

@Injectable()
export class GoogleMeetService {
    constructor(
        private prisma: PrismaService,
        private mailService: MailService,
    ) {}

    /**
     * Generate a Google Meet-style link
     * 
     * IMPORTANT: This generates a DEMO/PLACEHOLDER link.
     * For REAL Google Meet integration, you need to:
     * 1. Set up Google Cloud Console project
     * 2. Enable Google Calendar API
     * 3. Create OAuth2 credentials
     * 4. Use the Google Calendar API to create events with conferenceData
     * 
     * Example with real Google Calendar API:
     * const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
     * const event = await calendar.events.insert({
     *   calendarId: 'primary',
     *   conferenceDataVersion: 1,
     *   requestBody: {
     *     summary: 'Online Class',
     *     start: { dateTime: startTime },
     *     end: { dateTime: endTime },
     *     conferenceData: {
     *       createRequest: { requestId: uuid() }
     *     }
     *   }
     * });
     * const meetLink = event.data.conferenceData.entryPoints[0].uri;
     */
    private generateMeetLink(): { meetLink: string; meetingId: string } {
        // Generate a random meeting code in Google Meet format: xxx-yyyy-zzz (lowercase letters only)
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        const generateSegment = (length: number) => {
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        };
        
        const segment1 = generateSegment(3);  // xxx
        const segment2 = generateSegment(4);  // yyyy
        const segment3 = generateSegment(3);  // zzz
        const formattedId = `${segment1}-${segment2}-${segment3}`;
        
        // NOTE: This is a DEMO link. It won't work as a real Google Meet.
        // For production, integrate with Google Calendar API to create actual meetings.
        // 
        // Alternative options for production:
        // 1. Use Google Calendar API (recommended)
        // 2. Use Jitsi Meet (free, open-source): https://meet.jit.si/{formattedId}
        // For immediate functionality without API setup, we use Jitsi Meet
        // which allows random room names to work instantly.
        const meetLink = `https://meet.jit.si/${formattedId}`;
        
        return { meetLink, meetingId: formattedId };
    }

    /**
     * Get students enrolled in a specific class (semester, section, department)
     */
    private async getStudentsForClass(departmentId: string, semester: number, section: string) {
        console.log(`[GoogleMeetService] Looking for students with departmentId: ${departmentId}, semester: ${semester}, section: ${section}`);
        
        const students = await this.prisma.user.findMany({
            where: {
                role: 'STUDENT',
                departmentId,
                isActive: true,
                profile: {
                    semester,
                    section: {
                        equals: section,
                        mode: 'insensitive',
                    },
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
                profile: {
                    select: {
                        regno: true,
                        semester: true,
                        section: true,
                    },
                },
            },
        });

        console.log(`[GoogleMeetService] Found ${students.length} students`);
        return students;
    }

    /**
     * Get students for a class - more flexible query that handles missing data
     */
    private async getStudentsForClassFlexible(departmentId: string, semester?: number, section?: string) {
        const whereClause: any = {
            role: 'STUDENT',
            departmentId,
            isActive: true,
        };

        // Build profile conditions only if semester or section are provided
        if (semester || section) {
            whereClause.profile = {};
            if (semester) {
                whereClause.profile.semester = semester;
            }
            if (section) {
                whereClause.profile.section = {
                    equals: section,
                    mode: 'insensitive',
                };
            }
        }

        console.log(`[GoogleMeetService] Flexible query with:`, JSON.stringify(whereClause, null, 2));

        const students = await this.prisma.user.findMany({
            where: whereClause,
            select: {
                id: true,
                name: true,
                email: true,
                profile: {
                    select: {
                        regno: true,
                        semester: true,
                        section: true,
                    },
                },
            },
        });

        console.log(`[GoogleMeetService] Flexible query found ${students.length} students`);
        return students;
    }

    /**
     * Create a meeting and send emails to all students in the class
     */
    async createMeetingAndNotify(dto: CreateMeetingDto) {
        // If departmentId is not provided, fetch it from timetable
        let departmentId = dto.departmentId;
        let timetableSemester = dto.semester;
        let timetableSection = dto.section;
        
        if (dto.timetableId) {
            const timetable = await this.prisma.timeTable.findUnique({
                where: { id: dto.timetableId },
                select: { departmentId: true, semester: true, section: true },
            });
            
            if (timetable) {
                if (!departmentId) {
                    departmentId = timetable.departmentId;
                }
                // Use timetable values if dto values are missing
                if (!timetableSemester && timetable.semester) {
                    timetableSemester = timetable.semester;
                }
                if (!timetableSection && timetable.section) {
                    timetableSection = timetable.section;
                }
                console.log(`[GoogleMeetService] From timetable - departmentId: ${departmentId}, semester: ${timetable.semester}, section: ${timetable.section}`);
            }
        }

        if (!departmentId) {
            throw new BadRequestException('Department ID is required');
        }

        console.log(`[GoogleMeetService] Creating meeting with - departmentId: ${departmentId}, semester: ${timetableSemester}, section: ${timetableSection}`);

        // Generate meeting link
        const { meetLink, meetingId } = this.generateMeetLink();

        // Get all students in the class - try strict match first, then flexible
        let students = await this.getStudentsForClass(
            departmentId,
            timetableSemester,
            timetableSection,
        );

        // If no students found with strict match, try flexible matching
        if (students.length === 0) {
            console.log(`[GoogleMeetService] Strict match failed, trying flexible matching...`);
            students = await this.getStudentsForClassFlexible(departmentId, timetableSemester, timetableSection);
        }

        if (students.length === 0) {
            // Log more details for debugging
            const allStudentsInDept = await this.prisma.user.count({
                where: {
                    role: 'STUDENT',
                    departmentId,
                    isActive: true,
                },
            });
            
            const allStudentsWithProfile = await this.prisma.user.findMany({
                where: {
                    role: 'STUDENT',
                    departmentId,
                    isActive: true,
                },
                include: {
                    profile: {
                        select: { semester: true, section: true },
                    },
                },
                take: 10,
            });
            
            console.log(`[GoogleMeetService] Total students in department: ${allStudentsInDept}`);
            console.log(`[GoogleMeetService] Sample students:`, JSON.stringify(allStudentsWithProfile.map(s => ({
                name: s.name,
                semester: s.profile?.semester,
                section: s.profile?.section,
            })), null, 2));
            
            throw new BadRequestException(
                `No students found for Semester ${timetableSemester}, Section ${timetableSection}. ` +
                `Total students in department: ${allStudentsInDept}. ` +
                `Please ensure students are enrolled in this class.`
            );
        }

        // Format date and time for email
        const scheduledDate = format(parseISO(dto.scheduledDate), 'EEEE, MMMM do, yyyy');
        const startTime = dto.startTime;
        const endTime = dto.endTime;

        // Send emails to all students
        const emailResults = await Promise.allSettled(
            students.map((student) =>
                this.mailService.sendMeetingInvitation({
                    to: student.email,
                    studentName: student.name,
                    facultyName: dto.staffName,
                    subjectName: dto.subjectName,
                    subjectCode: dto.subjectCode,
                    meetLink,
                    scheduledDate,
                    startTime,
                    endTime,
                    meetingTitle: dto.meetingTitle,
                    meetingDescription: dto.meetingDescription,
                }),
            ),
        );

        // Count successes and failures
        const emailsSent = emailResults.filter((r) => r.status === 'fulfilled').length;
        const emailsFailed = emailResults.filter((r) => r.status === 'rejected').length;

        // Log any failures
        emailResults.forEach((result, index) => {
            if (result.status === 'rejected') {
                console.error(`Failed to send email to ${students[index].email}:`, result.reason);
            }
        });

        return {
            success: true,
            message: `Meeting created and ${emailsSent} invitation(s) sent successfully`,
            data: {
                meetLink,
                meetingId,
                scheduledDate: dto.scheduledDate,
                startTime,
                endTime,
                emailsSent,
                emailsFailed,
                totalStudents: students.length,
            },
        };
    }

    /**
     * Get class details for meeting creation
     */
    async getClassDetails(timetableId: string) {
        const timetable = await this.prisma.timeTable.findUnique({
            where: { id: timetableId },
            include: {
                subject: true,
                staff: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                department: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        if (!timetable) {
            throw new BadRequestException('Timetable entry not found');
        }

        // Get student count
        const studentCount = await this.prisma.user.count({
            where: {
                role: 'STUDENT',
                departmentId: timetable.departmentId,
                isActive: true,
                profile: {
                    semester: timetable.semester ?? undefined,
                    section: timetable.section ?? undefined,
                },
            },
        });

        return {
            timetableId: timetable.id,
            subjectId: timetable.subject.id,
            subjectName: timetable.subject.name,
            subjectCode: timetable.subject.code,
            staffId: timetable.staff.id,
            staffName: timetable.staff.name,
            staffEmail: timetable.staff.email,
            departmentId: timetable.department.id,
            departmentName: timetable.department.name,
            semester: timetable.semester,
            section: timetable.section,
            dayOfWeek: timetable.dayOfWeek,
            startTime: format(timetable.startTime, 'HH:mm'),
            endTime: format(timetable.endTime, 'HH:mm'),
            room: timetable.room,
            studentCount,
        };
    }

    /**
     * Preview students who will receive meeting invitations
     */
    async getStudentsPreview(departmentId: string, semester?: number, section?: string) {
        const whereClause: any = {
            role: 'STUDENT',
            departmentId,
            isActive: true,
        };

        if (semester || section) {
            whereClause.profile = {};
            if (semester) {
                whereClause.profile.semester = semester;
            }
            if (section) {
                whereClause.profile.section = {
                    equals: section,
                    mode: 'insensitive',
                };
            }
        }

        const students = await this.prisma.user.findMany({
            where: whereClause,
            select: {
                id: true,
                name: true,
                email: true,
                profile: {
                    select: {
                        regno: true,
                        semester: true,
                        section: true,
                    },
                },
            },
            orderBy: { name: 'asc' },
        });

        // Also get available semesters and sections for this department
        const allProfiles = await this.prisma.profile.findMany({
            where: {
                user: {
                    role: 'STUDENT',
                    departmentId,
                    isActive: true,
                },
            },
            select: {
                semester: true,
                section: true,
            },
            distinct: ['semester', 'section'],
        });

        const availableSemesters = [...new Set(allProfiles.map(p => p.semester).filter(Boolean))].sort();
        const availableSections = [...new Set(allProfiles.map(p => p.section).filter(Boolean))].sort();

        return {
            students,
            count: students.length,
            availableSemesters,
            availableSections,
            query: {
                departmentId,
                semester,
                section,
            },
        };
    }
}
