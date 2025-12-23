"use client"

import * as React from "react"
import {
    CalendarDays,
    CheckCircle,
    Clock,
    BarChart3,
    Plus,
    MoreVertical,
    Download} from "lucide-react"

import {
    fetchExams,
    fetchExamStats,
    fetchResultOverview,
    updateExam
} from "@/app/actions/exams/main"
import { Exam, ExamStats, ResultOverview, ExamType } from "@/app/actions/exams/types"
import { format } from "date-fns"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const gradeDistribution = [
    { grade: 'A+', count: 12 },
    { grade: 'A', count: 18 },
    { grade: 'B+', count: 25 },
    { grade: 'B', count: 20 },
    { grade: 'C+', count: 15 },
    { grade: 'C', count: 8 },
    { grade: 'F', count: 5 },
];

export default function ExamsPage() {
    const [exams, setExams] = React.useState<Exam[]>([]);
    const [stats, setStats] = React.useState<ExamStats | null>(null);
    const [results, setResults] = React.useState<ResultOverview[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    // Form State
    const [isCreateOpen, setIsCreateOpen] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: "",
        code: "",
        type: "INTERNAL" as ExamType,
        date: "",
        startTime: "",
        endTime: "",
        room: "",
        description: ""
    });

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [examsRes, statsRes, resultsRes] = await Promise.all([
                fetchExams(),
                fetchExamStats(),
                fetchResultOverview()
            ]);

            if (examsRes.success) setExams(examsRes.data!);
            if (statsRes.success) setStats(statsRes.data!);
            if (resultsRes.success) setResults(resultsRes.data!);
        } catch (error) {
            console.error("Failed to load exam data:", error);
            toast.error("Failed to load exam data");
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        loadData();
    }, []);

    const handlePublishToggle = async (id: string, currentStatus: boolean) => {
        const res = await updateExam(id, { isResultPublished: !currentStatus });
        if (res.success) {
            toast.success(`Result ${!currentStatus ? 'published' : 'unpublished'} successfully`);
            loadData();
        } else {
            toast.error(res.error || "Failed to update publication status");
        }
    };

    const handleCreateExam = async () => {
        if (!formData.name || !formData.code || !formData.date || !formData.startTime || !formData.endTime || !formData.room) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsSubmitting(true);
        // Combine date and time
        const startDateTime = new Date(`${formData.date}T${formData.startTime}`);
        const endDateTime = new Date(`${formData.date}T${formData.endTime}`);

        const { createExam } = await import("@/app/actions/exams/main");

        const res = await createExam({
            ...formData,
            startTime: startDateTime.toISOString(),
            endTime: endDateTime.toISOString(),
            date: new Date(formData.date).toISOString()
        });

        if (res.success) {
            toast.success("Exam scheduled successfully");
            setIsCreateOpen(false);
            setFormData({
                name: "",
                code: "",
                type: "INTERNAL" as ExamType,
                date: "",
                startTime: "",
                endTime: "",
                room: "",
                description: ""
            });
            loadData();
        } else {
            toast.error(res.error || "Failed to schedule exam");
        }
        setIsSubmitting(false);
    };

    if (isLoading && !exams.length) {
        return <div className="p-6">Loading...</div>;
    }
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Exams & Results</h1>
                    <p className="text-muted-foreground">Manage examination schedules, grades, and result publication.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export Report
                    </Button>
                    <Button onClick={() => setIsCreateOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Schedule Exam
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
                        <CalendarDays className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.upcomingExams || 0}</div>
                        <p className="text-xs text-muted-foreground">Next 7 days</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Results Pending</CardTitle>
                        <Clock className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.resultsPending || 0}</div>
                        <p className="text-xs text-muted-foreground">Batches awaiting grades</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Published Results</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.publishedResults || 0}</div>
                        <p className="text-xs text-muted-foreground">This semester</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
                        <BarChart3 className="h-4 w-4 text-violet-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.avgPerformance || 0} GPA</div>
                        <p className="text-xs text-muted-foreground">+0.2 from last term</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="schedule" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
                    <TabsTrigger value="results">Result Overview</TabsTrigger>
                    <TabsTrigger value="analysis">Grade Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="schedule" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Select defaultValue="all">
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Exam Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="final">Final</SelectItem>
                                    <SelectItem value="internal">Internal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Exam Name</TableHead>
                                        <TableHead>Code</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Date & Time</TableHead>
                                        <TableHead>Room</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {exams.map(exam => (
                                        <TableRow key={exam.id}>
                                            <TableCell className="font-medium">{exam.name}</TableCell>
                                            <TableCell>{exam.code}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{exam.type}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div>{format(new Date(exam.date), 'MMM dd, yyyy')}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {format(new Date(exam.startTime), 'hh:mm a')} - {format(new Date(exam.endTime), 'hh:mm a')}
                                                </div>
                                            </TableCell>
                                            <TableCell>{exam.room}</TableCell>
                                            <TableCell>
                                                <Badge variant={exam.status === "SCHEDULED" ? "default" : "secondary"}>{exam.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {exams.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">No exams scheduled</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="results" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Result Publication</CardTitle>
                            <CardDescription>Manage visibility of exam results for students.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Code</TableHead>
                                        <TableHead>Performance (Pass/Fail)</TableHead>
                                        <TableHead>Avg Grade</TableHead>
                                        <TableHead>Publish Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {results.map(result => (
                                        <TableRow key={result.id}>
                                            <TableCell className="font-medium">{result.subject}</TableCell>
                                            <TableCell>{result.code}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-green-600 font-bold">{result.passed}</span>
                                                    <span>/</span>
                                                    <span className="text-red-600 font-bold">{result.failed}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{result.avgGrade}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        id={`publish-${result.id}`}
                                                        checked={result.published}
                                                        onCheckedChange={() => handlePublishToggle(result.id, result.published)}
                                                    />
                                                    <Label htmlFor={`publish-${result.id}`}>{result.published ? "Published" : "Draft"}</Label>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm">View Details</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {results.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">No results available</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analysis" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Grade Distribution</CardTitle>
                            <CardDescription>Overall student performance across all subjects.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={gradeDistribution}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="grade" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" fill="#3b82f6" name="Student Count" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Schedule New Exam</DialogTitle>
                        <DialogDescription>
                            Enter the details for the upcoming examination.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Exam Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Final Exam"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="code">Course Code</Label>
                                <Input
                                    id="code"
                                    value={formData.code}
                                    onChange={e => setFormData({ ...formData, code: e.target.value })}
                                    placeholder="e.g. CS101"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="type">Exam Type</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={v => setFormData({ ...formData, type: v as ExamType })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="INTERNAL">Internal</SelectItem>
                                        <SelectItem value="FINAL">Final</SelectItem>
                                        <SelectItem value="PRACTICAL">Practical</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="room">Room / Venue</Label>
                                <Input
                                    id="room"
                                    value={formData.room}
                                    onChange={e => setFormData({ ...formData, room: e.target.value })}
                                    placeholder="e.g. Hall A"
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="date">Exam Date</Label>
                            <Input
                                id="date"
                                type="date"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="startTime">Start Time</Label>
                                <Input
                                    id="startTime"
                                    type="time"
                                    value={formData.startTime}
                                    onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="endTime">End Time</Label>
                                <Input
                                    id="endTime"
                                    type="time"
                                    value={formData.endTime}
                                    onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Additional details..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateExam} disabled={isSubmitting}>
                            {isSubmitting ? "Scheduling..." : "Schedule Exam"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
