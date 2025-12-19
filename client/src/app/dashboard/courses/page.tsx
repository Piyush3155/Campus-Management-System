"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { 
    MoreHorizontal, 
    ArrowUpDown, 
    Plus, 
    Search,
    FileEdit,
    Trash2,
    BookOpen,
    Filter
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

// --- Types ---
export type Course = {
  id: string
  name: string // e.g., Bachelor of Computer Applications
  code: string // e.g., BCA
  duration: string // e.g., 3 Years
  department: string
  type: "Undergraduate" | "Postgraduate" | "Diploma" | "Certificate"
  semesters: number
}

// --- Mock Data ---
export const initialCourses: Course[] = [
  { id: "1", name: "Bachelor of Computer Applications", code: "BCA", duration: "3 Years", department: "Computer Science", type: "Undergraduate", semesters: 6 },
  { id: "2", name: "Master of Computer Applications", code: "MCA", duration: "2 Years", department: "Computer Science", type: "Postgraduate", semesters: 4 },
  { id: "3", name: "Master of Business Administration", code: "MBA", duration: "2 Years", department: "Management", type: "Postgraduate", semesters: 4 },
  { id: "4", name: "Bachelor of Business Administration", code: "BBA", duration: "3 Years", department: "Management", type: "Undergraduate", semesters: 6 },
  { id: "5", name: "B.Tech in Mechanical Engineering", code: "B.Tech ME", duration: "4 Years", department: "Mechanical Engineering", type: "Undergraduate", semesters: 8 },
]

export default function CoursesPage() {
  const [data, setData] = useState<Course[]>(initialCourses)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null)

  // --- Form States ---
  const [formData, setFormData] = useState<Partial<Course>>({
      name: "",
      code: "",
      duration: "3 Years",
      department: "Computer Science",
      type: "Undergraduate",
      semesters: 6
  })

  const resetForm = () => {
      setFormData({ 
        name: "", 
        code: "", 
        duration: "3 Years",
        department: "Computer Science",
        type: "Undergraduate",
        semesters: 6
      })
      setCurrentCourse(null)
  }

  const handleSave = () => {
    if (!formData.name || !formData.code) {
        toast.error("Name and Code are required")
        return
    }

      if (currentCourse) {
          // Edit logic
          setData(prev => prev.map(c => c.id === currentCourse.id ? { ...c, ...formData } as Course : c))
          toast.success("Course updated successfully")
      } else {
          // Create logic
          const newCourse: Course = {
              ...formData as Course,
              id: Math.random().toString(36).substr(2, 9),
          }
           setData(prev => [...prev, newCourse])
           toast.success("Course created successfully")
      }
      setIsSheetOpen(false)
      resetForm()
  }
  
  const handleEdit = (course: Course) => {
      setCurrentCourse(course)
      setFormData({
          name: course.name,
          code: course.code,
          duration: course.duration,
          department: course.department,
          type: course.type,
          semesters: course.semesters
      })
      setIsSheetOpen(true)
  }

  const handleDelete = (id: string) => {
      if(confirm("Are you sure you want to delete this course?")) {
          setData(prev => prev.filter(c => c.id !== id))
          toast.success("Course deleted successfully")
      }
  }

  // --- Columns Definition ---
  const columns: ColumnDef<Course>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Course Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium flex items-center gap-2"><BookOpen className="h-4 w-4 text-muted-foreground" /> {row.getValue("name")}</div>,
    },
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("code")}</Badge>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <div>{row.getValue("type")}</div>,
    },
    {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => <div>{row.getValue("department")}</div>,
    },
    {
        accessorKey: "duration",
        header: "Duration",
        cell: ({ row }) => <div>{row.getValue("duration")}</div>,
    },
    {
        accessorKey: "semesters",
        header: "Semesters",
        cell: ({ row }) => <div className="text-center">{row.getValue("semesters")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const course = row.original
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleEdit(course)}>
                <FileEdit className="mr-2 h-4 w-4" /> Edit Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDelete(course.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete Course
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full p-6 space-y-6">
       <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Course Management</h1>
                <p className="text-muted-foreground">Manage academic programs, courses, and curriculum structures.</p>
            </div>
            
            <Sheet open={isSheetOpen} onOpenChange={(open) => {
                setIsSheetOpen(open)
                if(!open) resetForm()
            }}>
                <SheetTrigger asChild>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Course
                    </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>{currentCourse ? 'Edit Course' : 'Create New Course'}</SheetTitle>
                        <SheetDescription>
                            {currentCourse ? 'Update course details below.' : 'Add a new course to the system.'}
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Course Full Name</Label>
                            <Input 
                                id="name" 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                placeholder="Bachelor of Science in..." 
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="grid gap-2">
                                <Label htmlFor="code">Course Code</Label>
                                <Input 
                                    id="code" 
                                    value={formData.code} 
                                    onChange={(e) => setFormData({...formData, code: e.target.value})} 
                                    placeholder="B.Sc" 
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="type">Type</Label>
                                <Select value={formData.type} onValueChange={(val) => setFormData({...formData, type: val as any})}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                                        <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                                        <SelectItem value="Diploma">Diploma</SelectItem>
                                        <SelectItem value="Certificate">Certificate</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="department">Department</Label>
                             <Select value={formData.department} onValueChange={(val) => setFormData({...formData, department: val})}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Assign Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                                    <SelectItem value="Management">Management</SelectItem>
                                    <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                                    <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                                    <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="duration">Duration</Label>
                                <Select value={formData.duration} onValueChange={(val) => setFormData({...formData, duration: val})}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Duration" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="6 Months">6 Months</SelectItem>
                                        <SelectItem value="1 Year">1 Year</SelectItem>
                                        <SelectItem value="2 Years">2 Years</SelectItem>
                                        <SelectItem value="3 Years">3 Years</SelectItem>
                                        <SelectItem value="4 Years">4 Years</SelectItem>
                                        <SelectItem value="5 Years">5 Years</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="semesters">Total Semesters</Label>
                                <Input 
                                    id="semesters" 
                                    type="number"
                                    min={1}
                                    max={12}
                                    value={formData.semesters} 
                                    onChange={(e) => setFormData({...formData, semesters: parseInt(e.target.value) || 0})} 
                                />
                            </div>
                        </div>

                        
                        <Button className="mt-4" onClick={handleSave}>
                            {currentCourse ? 'Save Changes' : 'Create Course'}
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>

      <div className="flex items-center gap-4 py-4">
        <div className="relative flex-1 max-w-sm">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
            placeholder="Search courses..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="pl-8"
            />
        </div>

        <div className="flex items-center gap-2">
             <Select 
                 value={(table.getColumn("type")?.getFilterValue() as string) ?? "all"}
                 onValueChange={(val) => table.getColumn("type")?.setFilterValue(val === "all" ? "" : val)}
             >
                <SelectTrigger className="w-[140px]">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Type" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                    <SelectItem value="Diploma">Diploma</SelectItem>
                </SelectContent>
             </Select>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                    Columns <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                        return (
                        <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                            }
                        >
                            {column.id}
                        </DropdownMenuCheckboxItem>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
