"use server"

import { secureApiClient } from "@/lib/secure-api";
import { AttendanceSession, AttendanceRecord, StudentWithProfile, AttendanceResponse } from "./types";

export async function fetchTodaySessions(): Promise<AttendanceResponse<AttendanceSession[]>> {
    try {
        const res = await secureApiClient.get<AttendanceSession[]>('/attendance/sessions/today');
        if (res.error) return { success: false, error: res.error };
        return { success: true, data: res.data };
    } catch (err: any) {
        return { success: false, error: err.message || "Failed to fetch sessions" };
    }
}

export async function fetchSessionStudents(sessionId: string): Promise<AttendanceResponse<StudentWithProfile[]>> {
    try {
        const res = await secureApiClient.get<StudentWithProfile[]>(`/attendance/sessions/${sessionId}/students`);
        if (res.error) return { success: false, error: res.error };
        return { success: true, data: res.data };
    } catch (err: any) {
        return { success: false, error: err.message || "Failed to fetch students" };
    }
}

export async function markAttendance(sessionId: string, records: AttendanceRecord[]): Promise<AttendanceResponse> {
    try {
        const res = await secureApiClient.post(`/attendance/sessions/${sessionId}/mark`, records);
        if (res.error) return { success: false, error: res.error };
        return { success: true, data: res.data };
    } catch (err: any) {
        return { success: false, error: err.message || "Failed to mark attendance" };
    }
}

export async function lockAttendanceSession(sessionId: string): Promise<AttendanceResponse> {
    try {
        const res = await secureApiClient.post(`/attendance/sessions/${sessionId}/lock`, {});
        if (res.error) return { success: false, error: res.error };
        return { success: true, data: res.data };
    } catch (err: any) {
        return { success: false, error: err.message || "Failed to lock session" };
    }
}

export async function cancelAttendanceSession(sessionId: string): Promise<AttendanceResponse> {
    try {
        const res = await secureApiClient.post(`/attendance/sessions/${sessionId}/cancel`, {});
        if (res.error) return { success: false, error: res.error };
        return { success: true, data: res.data };
    } catch (err: any) {
        return { success: false, error: err.message || "Failed to cancel session" };
    }
}

export async function fetchSubjectAttendanceReport(subjectId: string): Promise<AttendanceResponse> {
    try {
        const res = await secureApiClient.get(`/attendance/report/subject/${subjectId}`);
        if (res.error) return { success: false, error: res.error };
        return { success: true, data: res.data };
    } catch (err: any) {
        return { success: false, error: err.message || "Failed to fetch subject report" };
    }
}

export async function fetchStaffAttendanceReport(staffId: string): Promise<AttendanceResponse> {
    try {
        const res = await secureApiClient.get(`/attendance/report/staff/${staffId}`);
        if (res.error) return { success: false, error: res.error };
        return { success: true, data: res.data };
    } catch (err: any) {
        return { success: false, error: err.message || "Failed to fetch staff report" };
    }
}

export async function fetchMyAttendanceReport(): Promise<AttendanceResponse> {
    try {
        const res = await secureApiClient.get(`/attendance/report/staff/me`);
        if (res.error) return { success: false, error: res.error };
        return { success: true, data: res.data };
    } catch (err: any) {
        return { success: false, error: err.message || "Failed to fetch your report" };
    }
}

export async function fetchStudentAttendance(studentId: string): Promise<AttendanceResponse> {
    try {
        const res = await secureApiClient.get(`/attendance/report/student/${studentId}`);
        if (res.error) return { success: false, error: res.error };
        return { success: true, data: res.data };
    } catch (err: any) {
        return { success: false, error: err.message || "Failed to fetch student attendance" };
    }
}
