"use server"

import { revalidatePath } from "next/cache"
import { getSession } from "../auth/main"
import { GoogleMeetRequest, GoogleMeetResponse } from "@/types/googlemeet"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

async function getHeaders() {
    const session = await getSession()
    const token = session.accessToken
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
}

export async function createMeetingAndNotify(data: GoogleMeetRequest): Promise<GoogleMeetResponse> {
    try {
        console.log("[GoogleMeet Action] Creating meeting with data:", JSON.stringify(data, null, 2))
        
        const res = await fetch(`${API_URL}/googlemeet/create`, {
            method: "POST",
            headers: await getHeaders(),
            body: JSON.stringify(data),
        })

        const responseData = await res.json()
        
        if (!res.ok) {
            console.error("[GoogleMeet Action] Server error:", responseData)
            return {
                success: false,
                message: responseData.message || "Failed to create meeting"
            }
        }

        revalidatePath("/staff/classes")
        return responseData
    } catch (error) {
        console.error("Failed to create meeting:", error)
        return {
            success: false,
            message: "Failed to create meeting. Please try again."
        }
    }
}

export async function getClassDetails(timetableId: string) {
    try {
        const res = await fetch(`${API_URL}/googlemeet/class/${timetableId}`, {
            headers: await getHeaders(),
            cache: "no-store"
        })

        if (!res.ok) {
            return null
        }

        return await res.json()
    } catch (error) {
        console.error("Failed to fetch class details:", error)
        return null
    }
}

export interface StudentPreview {
    id: string
    name: string
    email: string
    profile?: {
        regno?: string
        semester?: number
        section?: string
    }
}

export interface StudentsPreviewResponse {
    students: StudentPreview[]
    count: number
    availableSemesters: number[]
    availableSections: string[]
    query: {
        departmentId: string
        semester?: number
        section?: string
    }
}

export async function previewStudents(
    departmentId: string,
    semester?: number,
    section?: string
): Promise<StudentsPreviewResponse | null> {
    try {
        const params = new URLSearchParams({ departmentId })
        if (semester) params.append("semester", semester.toString())
        if (section) params.append("section", section)

        const res = await fetch(`${API_URL}/googlemeet/students?${params.toString()}`, {
            headers: await getHeaders(),
            cache: "no-store"
        })

        if (!res.ok) {
            return null
        }

        return await res.json()
    } catch (error) {
        console.error("Failed to preview students:", error)
        return null
    }
}