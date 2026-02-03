export interface GoogleMeetRequest {
    timetableId: string;
    subjectId: string;
    subjectName: string;
    subjectCode: string;
    staffId: string;
    staffName: string;
    semester: number;
    section: string;
    departmentId: string;
    scheduledDate: string;
    startTime: string;
    endTime: string;
    meetingTitle?: string;
    meetingDescription?: string;
}

export interface GoogleMeetResponse {
    success: boolean;
    message: string;
    data?: {
        meetLink: string;
        meetingId: string;
        scheduledDate: string;
        startTime: string;
        endTime: string;
        emailsSent: number;
        emailsFailed: number;
    };
}

export interface MeetingDetails {
    id: string;
    meetLink: string;
    subjectName: string;
    subjectCode: string;
    facultyName: string;
    semester: number;
    section: string;
    scheduledDate: string;
    startTime: string;
    endTime: string;
    createdAt: string;
}

export interface ClassMeetingInfo {
    timetableId: string;
    subjectId: string;
    subjectName: string;
    subjectCode: string;
    staffId: string;
    staffName: string;
    semester: number;
    section: string;
    departmentId: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    room?: string;
}
