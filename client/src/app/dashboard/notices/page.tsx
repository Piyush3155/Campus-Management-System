"use client"

import * as React from "react"
import {
  Bell,
  Megaphone,
  Pin,
  Trash2,
  Edit,
  Plus,
  Users,
  Search,
  Filter,
  Eye,
  MoreVertical,
  Calendar
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

// --- Types ---
type Notice = {
    id: string;
    title: string;
    content: string;
    date: string;
    audience: "All" | "Staff" | "Students";
    pinned: boolean;
    author: string;
};

// --- Mock Data ---
const initialNotices: Notice[] = [
    {
        id: "1",
        title: "Semester End Examination Schedule",
        content: "The final examination schedule for the Fall 2024 semester has been released. Please check the 'Exams' section for details.",
        date: "2024-12-18",
        audience: "All",
        pinned: true,
        author: "Admin"
    },
    {
        id: "2",
        title: "Faculty Meeting - Department of CS",
        content: "A mandatory meeting for all Computer Science faculty members is scheduled for Friday at 2 PM in the Conference Room.",
        date: "2024-12-19",
        audience: "Staff",
        pinned: false,
        author: "HOD CS"
    },
    {
        id: "3",
        title: "Holiday Announcement - Winter Break",
        content: "The university will remain closed for Winter Break from Dec 24th to Jan 2nd. Classes resume on Jan 3rd.",
        date: "2024-12-15",
        audience: "All",
        pinned: true,
        author: "Admin"
    },
    {
        id: "4",
        title: "Library Maintenance",
        content: "The central library will be undergoing maintenance this weekend and will be closed on Saturday.",
        date: "2024-12-10",
        audience: "Students",
        pinned: false,
        author: "Librarian"
    }
];

export default function NoticesPage() {
    const [notices, setNotices] = React.useState<Notice[]>(initialNotices);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [filterAudience, setFilterAudience] = React.useState("all");

    // Form State
    const [isCreateOpen, setIsCreateOpen] = React.useState(false);
    const [newTitle, setNewTitle] = React.useState("");
    const [newContent, setNewContent] = React.useState("");
    const [newAudience, setNewAudience] = React.useState("All");
    const [newPinned, setNewPinned] = React.useState(false);
    const [editingId, setEditingId] = React.useState<string | null>(null);

    const handleCreateNotice = () => {
        if (!newTitle || !newContent) return;

        if (editingId) {
            // Update existing
            setNotices(prev => prev.map(n => n.id === editingId ? {
                ...n,
                title: newTitle,
                content: newContent,
                audience: newAudience as any,
                pinned: newPinned
            } : n));
            setEditingId(null);
        } else {
            // Create new
            const newNotice: Notice = {
                id: Math.random().toString(36).substr(2, 9),
                title: newTitle,
                content: newContent,
                date: new Date().toISOString().split('T')[0],
                audience: newAudience as any,
                pinned: newPinned,
                author: "Admin" // Default for now
            };
            setNotices([newNotice, ...notices]);
        }

        // Reset and close
        setNewTitle("");
        setNewContent("");
        setNewAudience("All");
        setNewPinned(false);
        setIsCreateOpen(false);
    };

    const handleEditClick = (notice: Notice) => {
        setNewTitle(notice.title);
        setNewContent(notice.content);
        setNewAudience(notice.audience);
        setNewPinned(notice.pinned);
        setEditingId(notice.id);
        setIsCreateOpen(true);
    };

    const handleDelete = (id: string) => {
        setNotices(prev => prev.filter(n => n.id !== id));
    };

    const togglePin = (id: string) => {
        setNotices(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
    };

    // Derived state
    const filteredNotices = notices.filter(n => {
        const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAudience = filterAudience === "all" || n.audience.toLowerCase() === filterAudience.toLowerCase();
        return matchesSearch && matchesAudience;
    });

    const pinnedNotices = filteredNotices.filter(n => n.pinned);
    const otherNotices = filteredNotices.filter(n => !n.pinned);

    return (
        <div className="flex flex-col gap-6 p-6">
             <div className="flex items-center justify-between">
                <div>
                   <h1 className="text-2xl font-bold tracking-tight">Notices & Announcements</h1>
                   <p className="text-muted-foreground">Create and manage updates for staff and students.</p>
                </div>
                <Button onClick={() => {
                    setEditingId(null);
                    setNewTitle("");
                    setNewContent("");
                    setNewAudience("All");
                    setNewPinned(false);
                    setIsCreateOpen(true);
                }}>
                    <Plus className="mr-2 h-4 w-4" /> Create Notice
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search notices..."
                        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Select value={filterAudience} onValueChange={setFilterAudience}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Audience" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Audiences</SelectItem>
                        <SelectItem value="staff">Staff Only</SelectItem>
                        <SelectItem value="students">Students Only</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Pinned Section */}
            {pinnedNotices.length > 0 && (
                <div className="space-y-4">
                     <h3 className="flex items-center gap-2 font-semibold text-sm text-muted-foreground">
                         <Pin className="h-4 w-4 rotate-45" /> Pinned Announcements
                     </h3>
                     <div className="grid gap-4 md:grid-cols-2">
                         {pinnedNotices.map(notice => (
                             <NoticeCard 
                                key={notice.id} 
                                notice={notice} 
                                onEdit={handleEditClick} 
                                onDelete={handleDelete} 
                                onPin={togglePin} 
                            />
                         ))}
                     </div>
                     <Separator />
                </div>
            )}

            {/* Main List */}
            <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground">Recent Notices</h3>
                <div className="grid gap-4 md:grid-cols-1">
                    {otherNotices.length > 0 ? (
                        otherNotices.map(notice => (
                            <NoticeCard 
                                key={notice.id} 
                                notice={notice} 
                                onEdit={handleEditClick} 
                                onDelete={handleDelete} 
                                onPin={togglePin} 
                            />
                        ))
                    ) : (
                        <div className="text-center py-10 text-muted-foreground">
                            No notices found matching your criteria.
                        </div>
                    )}
                </div>
            </div>

            {/* Create/Edit Dialog */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingId ? "Edit Notice" : "Create New Notice"}</DialogTitle>
                        <DialogDescription>
                            Post a new announcement to the dashboard.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g., Exam Schedule Released" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="audience">Target Audience</Label>
                            <Select value={newAudience} onValueChange={setNewAudience}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Users</SelectItem>
                                    <SelectItem value="Staff">Staff Only</SelectItem>
                                    <SelectItem value="Students">Students Only</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea 
                                id="content" 
                                value={newContent} 
                                onChange={(e) => setNewContent(e.target.value)} 
                                placeholder="Type your message here..." 
                                className="min-h-[100px]"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch id="pinned" checked={newPinned} onCheckedChange={setNewPinned} />
                            <Label htmlFor="pinned">Pin to top</Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateNotice}>{editingId ? "Update" : "Post Notice"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

function NoticeCard({ notice, onEdit, onDelete, onPin }: { 
    notice: Notice, 
    onEdit: (n: Notice) => void, 
    onDelete: (id: string) => void,
    onPin: (id: string) => void
}) {
    return (
        <Card className={notice.pinned ? "border-primary/50 bg-primary/5" : ""}>
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                         <CardTitle className="text-base">{notice.title}</CardTitle>
                         {notice.pinned && <Pin className="h-3 w-3 text-primary rotate-45" />}
                    </div>
                    <CardDescription className="flex items-center gap-2 text-xs mt-1">
                        <span>{notice.author}</span>
                        <span>•</span>
                        <span>{notice.date}</span>
                        <span>•</span>
                        <Badge variant="secondary" className="text-[10px] h-5 px-1.5">{notice.audience}</Badge>
                    </CardDescription>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onPin(notice.id)}>
                            {notice.pinned ? "Unpin Notice" : "Pin Notice"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(notice)}>
                            Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => onDelete(notice.id)}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{notice.content}</p>
            </CardContent>
        </Card>
    )
}
