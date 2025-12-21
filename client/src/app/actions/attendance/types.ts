export interface AttendanceSession {
    id: string;
    date: string;
    timetableId: string;
    staffId: string;
    subjectId: string;
    departmentId: string;
    semester: number;
    section: string | null;
    startTime: string;
    endTime: string;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    isLocked: boolean;
    timetable?: {
        subject: {
            name: string;
            code: string;
        };
        department: {
            name: string;
        };
    };
}

export interface AttendanceRecord {
    studentId: string;
    status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
    remarks?: string;
}

export interface StudentWithProfile {
    id: string;
    name: string;
    profile?: {
        regno: string | null;
    };
}

export interface AttendanceResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}
