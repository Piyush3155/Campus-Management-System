"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Video, Calendar, Clock, Users, Send, Loader2, CheckCircle, AlertCircle, Copy, ExternalLink, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { createMeetingAndNotify, previewStudents, StudentsPreviewResponse } from "@/app/actions/googlemeet/main"
import { ClassMeetingInfo, GoogleMeetResponse } from "@/types/googlemeet"

interface GoogleMeetDialogProps {
    classInfo: ClassMeetingInfo
    trigger?: React.ReactNode
}

export function GoogleMeetDialog({ classInfo, trigger }: GoogleMeetDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingPreview, setLoadingPreview] = useState(false)
    const [result, setResult] = useState<GoogleMeetResponse | null>(null)
    const [studentsPreview, setStudentsPreview] = useState<StudentsPreviewResponse | null>(null)
    const [scheduledDate, setScheduledDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [startTime, setStartTime] = useState(classInfo.startTime)
    const [endTime, setEndTime] = useState(classInfo.endTime)
    const [meetingTitle, setMeetingTitle] = useState(`Online Class: ${classInfo.subjectName}`)
    const [meetingDescription, setMeetingDescription] = useState("")

    // Fetch student preview when dialog opens
    useEffect(() => {
        async function fetchPreview() {
            if (open && classInfo.departmentId) {
                setLoadingPreview(true)
                const preview = await previewStudents(
                    classInfo.departmentId,
                    classInfo.semester,
                    classInfo.section
                )
                setStudentsPreview(preview)
                setLoadingPreview(false)
            }
        }
        fetchPreview()
    }, [open, classInfo.departmentId, classInfo.semester, classInfo.section])

    const handleCreateMeeting = async () => {
        setLoading(true)
        setResult(null)

        try {
            const response = await createMeetingAndNotify({
                timetableId: classInfo.timetableId,
                subjectId: classInfo.subjectId,
                subjectName: classInfo.subjectName,
                subjectCode: classInfo.subjectCode,
                staffId: classInfo.staffId,
                staffName: classInfo.staffName,
                semester: classInfo.semester,
                section: classInfo.section,
                departmentId: classInfo.departmentId,
                scheduledDate,
                startTime,
                endTime,
                meetingTitle,
                meetingDescription,
            })

            setResult(response)

            if (response.success) {
                toast.success("Meeting created successfully!", {
                    description: `${response.data?.emailsSent} invitation(s) sent to students.`,
                })
            } else {
                toast.error("Failed to create meeting", {
                    description: response.message,
                })
            }
        } catch {
            toast.error("An error occurred", {
                description: "Please try again later.",
            })
        } finally {
            setLoading(false)
        }
    }

    const copyMeetLink = () => {
        if (result?.data?.meetLink) {
            navigator.clipboard.writeText(result.data.meetLink)
            toast.success("Meeting link copied to clipboard!")
        }
    }

    const resetDialog = () => {
        setResult(null)
        setStudentsPreview(null)
        setMeetingTitle(`Online Class: ${classInfo.subjectName}`)
        setMeetingDescription("")
        setScheduledDate(format(new Date(), "yyyy-MM-dd"))
        setStartTime(classInfo.startTime)
        setEndTime(classInfo.endTime)
    }

    const hasStudents = studentsPreview && studentsPreview.count > 0

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen)
            if (!isOpen) resetDialog()
        }}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="sm" className="gap-2">
                        <Video className="h-4 w-4" />
                        Start Meet
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Video className="h-5 w-5 text-primary" />
                        Create Online Class Session
                    </DialogTitle>
                    <DialogDescription>
                        Generate a meeting link and send invitations to all students in this class.
                    </DialogDescription>
                </DialogHeader>

                {!result ? (
                    <>
                        <div className="space-y-4 py-4">
                            {/* Class Info Card */}
                            <Card className="bg-muted/50">
                                <CardContent className="pt-4">
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="text-muted-foreground">Subject:</span>
                                            <p className="font-medium">{classInfo.subjectName}</p>
                                            <Badge variant="secondary" className="mt-1">{classInfo.subjectCode}</Badge>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Class:</span>
                                            <p className="font-medium">Semester {classInfo.semester} - Section {classInfo.section}</p>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Faculty:</span>
                                            <p className="font-medium">{classInfo.staffName}</p>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Room:</span>
                                            <p className="font-medium">{classInfo.room || "Not specified"}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Student Count Info */}
                            {loadingPreview ? (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Loading students...</span>
                                </div>
                            ) : studentsPreview ? (
                                <div className={`p-3 rounded-lg border ${hasStudents ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' : 'bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800'}`}>
                                    <div className="flex items-center gap-2">
                                        <Users className={`h-4 w-4 ${hasStudents ? 'text-green-600' : 'text-amber-600'}`} />
                                        <span className={`text-sm font-medium ${hasStudents ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}`}>
                                            {hasStudents ? `${studentsPreview.count} student(s) will receive invitations` : 'No students found for this class'}
                                        </span>
                                    </div>
                                    {!hasStudents && studentsPreview.availableSemesters.length > 0 && (
                                        <div className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                                            <Info className="h-3 w-3 inline mr-1" />
                                            Available semesters in department: {studentsPreview.availableSemesters.join(', ')}
                                            {studentsPreview.availableSections.length > 0 && (
                                                <span> | Sections: {studentsPreview.availableSections.join(', ')}</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : null}

                            {/* Meeting Details Form */}
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="meetingTitle">Meeting Title</Label>
                                    <Input
                                        id="meetingTitle"
                                        value={meetingTitle}
                                        onChange={(e) => setMeetingTitle(e.target.value)}
                                        placeholder="Enter meeting title"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="meetingDescription">Description (Optional)</Label>
                                    <Textarea
                                        id="meetingDescription"
                                        value={meetingDescription}
                                        onChange={(e) => setMeetingDescription(e.target.value)}
                                        placeholder="Add any additional notes for students..."
                                        rows={2}
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <Label htmlFor="date">Date</Label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="date"
                                                type="date"
                                                value={scheduledDate}
                                                onChange={(e) => setScheduledDate(e.target.value)}
                                                className="pl-9"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="startTime">Start Time</Label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="startTime"
                                                type="time"
                                                value={startTime}
                                                onChange={(e) => setStartTime(e.target.value)}
                                                className="pl-9"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="endTime">End Time</Label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="endTime"
                                                type="time"
                                                value={endTime}
                                                onChange={(e) => setEndTime(e.target.value)}
                                                className="pl-9"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleCreateMeeting} disabled={loading} className="gap-2">
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        Create & Send Invitations
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </>
                ) : (
                    <div className="py-4">
                        {result.success ? (
                            <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                                        <CheckCircle className="h-5 w-5" />
                                        Meeting Ready!
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="rounded-lg bg-white dark:bg-gray-900 p-4 border">
                                        <Label className="text-xs text-muted-foreground">Meeting Link</Label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <code className="flex-1 text-sm bg-muted px-3 py-2 rounded">
                                                {result.data?.meetLink}
                                            </code>
                                            <Button variant="outline" size="icon" onClick={copyMeetLink}>
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" asChild>
                                                <a href={result.data?.meetLink} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-green-600" />
                                            <span><strong>{result.data?.emailsSent}</strong> invitations sent</span>
                                        </div>
                                        {result.data?.emailsFailed ? (
                                            <div className="flex items-center gap-2 text-amber-600">
                                                <AlertCircle className="h-4 w-4" />
                                                <span><strong>{result.data.emailsFailed}</strong> failed</span>
                                            </div>
                                        ) : null}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" onClick={() => setOpen(false)}>
                                        Done
                                    </Button>
                                </CardFooter>
                            </Card>
                        ) : (
                            <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                                        <AlertCircle className="h-5 w-5" />
                                        Failed to Create Meeting
                                    </CardTitle>
                                    <CardDescription className="text-red-600 dark:text-red-400">
                                        {result.message}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="gap-2">
                                    <Button variant="outline" onClick={() => setResult(null)}>
                                        Try Again
                                    </Button>
                                    <Button variant="secondary" onClick={() => setOpen(false)}>
                                        Close
                                    </Button>
                                </CardFooter>
                            </Card>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
