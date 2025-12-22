"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Megaphone, Calendar, User, Eye, Download, Info, Pin, Search, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import * as React from "react"
import { fetchNotices, type Notice } from "@/lib/notices-api"
import { toast } from "sonner"

export function AdminNotices() {
    const [notices, setNotices] = React.useState<Notice[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [searchQuery, setSearchQuery] = React.useState("");

    const loadNotices = React.useCallback(async () => {
        setIsLoading(true);
        setError(null);
        const result = await fetchNotices();
        if (result.success && result.data) {
            setNotices(result.data);
        } else {
            setError(result.error || "Failed to load notices");
            toast.error(result.error || "Failed to load notices");
        }
        setIsLoading(false);
    }, []);

    React.useEffect(() => {
        loadNotices();
    }, [loadNotices]);

    const filteredNotices = notices.filter(n => {
        const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    const pinnedNotices = filteredNotices.filter(n => n.pinned);
    const otherNotices = filteredNotices.filter(n => !n.pinned);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Loading notices...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
                <Button variant="ghost" size="sm" onClick={() => loadNotices()} className="ml-auto">Retry</Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
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
                <Button variant="ghost" size="icon" onClick={() => loadNotices()} disabled={isLoading}>
                    <Loader2 className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
            </div>

            {pinnedNotices.length > 0 && (
                <div className="space-y-4">
                    <h3 className="flex items-center gap-2 font-semibold text-sm text-muted-foreground">
                        <Pin className="h-4 w-4 rotate-45" /> Pinned Announcements
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {pinnedNotices.map(notice => (
                            <NoticeCard key={notice.id} notice={notice} />
                        ))}
                    </div>
                    <Separator />
                </div>
            )}

            <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground">Recent Notices</h3>
                <div className="grid gap-4 md:grid-cols-1">
                    {otherNotices.length > 0 ? (
                        otherNotices.map(notice => (
                            <NoticeCard key={notice.id} notice={notice} />
                        ))
                    ) : (
                        <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-lg">
                            {pinnedNotices.length === 0 && searchQuery === "" ? "No notices have been posted yet." : "No notices found matching your criteria."}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function NoticeCard({ notice }: { notice: Notice }) {
    const formattedDate = new Date(notice.createdAt).toLocaleDateString();

    return (
        <Card className="bg-card/40 backdrop-blur-sm border-none shadow-sm hover:shadow-md transition-all">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-white/5">General</Badge>
                        {notice.pinned && (
                            <Badge className="bg-blue-100 text-blue-700 border-none">Pinned</Badge>
                        )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formattedDate}
                    </div>
                </div>
                <CardTitle className="text-xl font-bold mt-2">{notice.title}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-xs">
                    <User className="h-3 w-3" /> Posted by: {notice.author.name}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-foreground/80 leading-relaxed">
                    {notice.content}
                </p>
                <div className="flex justify-between items-center pt-2 border-t">
                    <div className="flex gap-2">
                        {/* Placeholder for attachments */}
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs gap-2">
                        <Eye className="h-3.5 w-3.5" /> View Full Details
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
