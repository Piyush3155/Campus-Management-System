"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { getSubjects, assignSubjectToStaff, getDepartments } from "@/app/actions/acdemics/main"
import { Subject, ApiResponse, Department } from "@/types/academic"
import { Loader2, Plus } from "lucide-react"

const FormSchema = z.object({
    departmentId: z.string().min(1, {
        message: "Please select a department.",
    }),
    subjectId: z.string().min(1, {
        message: "Please select a subject.",
    }),
})

interface AssignSubjectDialogProps {
    staffId: string
    staffName: string
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

export function AssignSubjectDialog({ staffId, staffName, open, onOpenChange, onSuccess }: AssignSubjectDialogProps) {
    const [departments, setDepartments] = useState<Department[]>([])
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            departmentId: "",
            subjectId: ""
        }
    })

    const selectedDeptId = form.watch("departmentId")

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
        if (selectedDeptId) {
            async function fetchDeptOptions() {
                setLoading(true)
                try {
                    const subjectsData = await getSubjects(selectedDeptId)
                    setSubjects(subjectsData)
                    form.setValue("subjectId", "")
                } catch {
                    toast.error("Failed to fetch subjects")
                } finally {
                    setLoading(false)
                }
            }
            fetchDeptOptions()
        } else {
            setSubjects([])
        }
    }, [selectedDeptId, form])

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsSubmitting(true)
        try {
            const res: ApiResponse = await assignSubjectToStaff(staffId, data.subjectId)
            if (res.success) {
                toast.success(res.message)
                form.reset()
                onOpenChange(false)
                onSuccess?.()
            } else {
                toast.error(res.message)
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Assign Subject</DialogTitle>
                    <DialogDescription>
                        Assign a new subject to {staffName}.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <FormField
                            control={form.control}
                            name="departmentId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Department</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Department" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {departments.map((d) => (
                                                <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="subjectId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value} disabled={!selectedDeptId || loading}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={loading ? "Loading..." : "Select Subject"} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {subjects.map((s) => (
                                                <SelectItem key={s.id} value={s.id}>{s.name} ({s.code})</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                            <Button type="submit" disabled={isSubmitting || !selectedDeptId}>
                                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                                Assign Subject
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
