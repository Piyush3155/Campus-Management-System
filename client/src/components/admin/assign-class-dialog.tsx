"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, Plus } from "lucide-react"
import { getDepartments, getSubjects, createTimetableEntry } from "@/app/actions/acdemics/main"
import { Department, Subject, ApiResponse } from "@/types/academic"

const weekDays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

interface AssignClassDialogProps {
    staffId: string
    staffName: string
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

export function AssignClassDialog({ staffId, staffName, open, onOpenChange, onSuccess }: AssignClassDialogProps) {
    const [departments, setDepartments] = useState<Department[]>([])
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    // Form State
    const [departmentId, setDepartmentId] = useState<string>("")
    const [day, setDay] = useState<string>("MONDAY")
    const [startTime, setStartTime] = useState<string>("09:00")
    const [endTime, setEndTime] = useState<string>("10:00")
    const [subjectId, setSubjectId] = useState<string>("")
    const [room, setRoom] = useState<string>("")
    const [semester, setSemester] = useState<string>("")
    const [section, setSection] = useState<string>("")

    useEffect(() => {
        if (open) {
            async function fetchDepts() {
                try {
                    const depts = await getDepartments()
                    setDepartments(depts)
                } catch {
                    toast.error("Failed to fetch departments")
                }
            }
            fetchDepts()
        }
    }, [open])

    useEffect(() => {
        if (departmentId) {
            async function fetchSubjectsData() {
                setLoading(true)
                try {
                    const subs = await getSubjects(departmentId)
                    setSubjects(subs)
                    setSubjectId("")
                } catch {
                    toast.error("Failed to fetch subjects")
                } finally {
                    setLoading(false)
                }
            }
            fetchSubjectsData()
        } else {
            setSubjects([])
        }
    }, [departmentId])

    const handleSubmit = async () => {
        if (!departmentId || !subjectId || !day || !startTime || !endTime) {
            toast.error("Please fill all required fields")
            return
        }

        setIsSubmitting(true)
        try {
            const date = new Date()
            const start = new Date(date)
            const [sH, sM] = startTime.split(":").map(Number)
            start.setHours(sH, sM, 0, 0)

            const end = new Date(date)
            const [eH, eM] = endTime.split(":").map(Number)
            end.setHours(eH, eM, 0, 0)

            const payload = {
                departmentId,
                subjectId,
                staffId,
                dayOfWeek: day as any,
                startTime: start,
                endTime: end,
                room,
                semester: semester ? Number(semester) : undefined,
                section: section || undefined
            }

            const res: ApiResponse = await createTimetableEntry(payload)

            if (res.success) {
                toast.success(res.message)
                setDepartmentId("")
                setSubjectId("")
                setRoom("")
                setSemester("")
                setSection("")
                onOpenChange(false)
                onSuccess?.()
            } else {
                toast.error(res.message)
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Assign Class Slot</DialogTitle>
                    <DialogDescription>
                        Create a timetable entry for {staffName}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Department</Label>
                            <Select value={departmentId} onValueChange={setDepartmentId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Dept" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Subject</Label>
                            <Select value={subjectId} onValueChange={setSubjectId} disabled={!departmentId || loading}>
                                <SelectTrigger>
                                    <SelectValue placeholder={loading ? "Loading..." : "Select Subject"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {subjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Day</Label>
                            <Select value={day} onValueChange={setDay}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {weekDays.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Start</Label>
                            <Input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>End</Label>
                            <Input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Semester</Label>
                            <Input type="number" placeholder="5" value={semester} onChange={e => setSemester(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Section</Label>
                            <Input placeholder="A" value={section} onChange={e => setSection(e.target.value.toUpperCase())} />
                        </div>
                        <div className="space-y-2">
                            <Label>Room</Label>
                            <Input placeholder="101" value={room} onChange={e => setRoom(e.target.value)} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                        Assign Slot
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
