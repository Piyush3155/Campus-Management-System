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
    Building2,
    Eye
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
import Link from "next/link"

// --- Types ---
export type Department = {
  id: string
  name: string
  code: string
  hod: string
  studentCount: number
  staffCount: number
}

// --- Mock Data ---
export const initialDepartments: Department[] = [
  { id: "1", name: "Computer Science", code: "CS", hod: "Dr. Alan Turing", studentCount: 450, staffCount: 20 },
  { id: "2", name: "Information Technology", code: "IT", hod: "Dr. Grace Hopper", studentCount: 300, staffCount: 15 },
  { id: "3", name: "Human Resources", code: "HR", hod: "Jane Doe", studentCount: 0, staffCount: 5 },
  { id: "4", name: "Finance", code: "FIN", hod: "John Smith", studentCount: 0, staffCount: 8 },
  { id: "5", name: "Mechanical Engineering", code: "ME", hod: "Dr. Archimedes", studentCount: 200, staffCount: 12 },
]

export default function DepartmentsPage() {
  const [data, setData] = useState<Department[]>(initialDepartments)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [currentDept, setCurrentDept] = useState<Department | null>(null) // For editing

  // --- Form States for Add/Edit ---
  const [formData, setFormData] = useState({
      name: "",
      code: "",
      hod: ""
  })

  const resetForm = () => {
      setFormData({ name: "", code: "", hod: "" })
      setCurrentDept(null)
  }

  const handleSave = () => {
      if (currentDept) {
          // Edit logic
          setData(prev => prev.map(d => d.id === currentDept.id ? { ...d, ...formData } : d))
          toast.success("Department updated successfully")
      } else {
          // Create logic
          const newDept: Department = {
              id: Math.random().toString(36).substr(2, 9),
              ...formData,
              studentCount: 0,
              staffCount: 0
          }
           setData(prev => [...prev, newDept])
           toast.success("Department created successfully")
      }
      setIsSheetOpen(false)
      resetForm()
  }
  
  const handleEdit = (dept: Department) => {
      setCurrentDept(dept)
      setFormData({
          name: dept.name,
          code: dept.code,
          hod: dept.hod
      })
      setIsSheetOpen(true)
  }

  const handleDelete = (id: string) => {
      if(confirm("Are you sure you want to delete this department?")) {
          setData(prev => prev.filter(d => d.id !== id))
          toast.success("Department deleted successfully")
      }
  }

  // --- Columns Definition ---
  const columns: ColumnDef<Department>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium flex items-center gap-2"><Building2 className="h-4 w-4 text-muted-foreground" /> {row.getValue("name")}</div>,
    },
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => <div className="font-mono">{row.getValue("code")}</div>,
    },
    {
      accessorKey: "hod",
      header: "HOD",
      cell: ({ row }) => <div>{row.getValue("hod") || "Not Assigned"}</div>,
    },
    {
        accessorKey: "studentCount",
        header: "Students",
        cell: ({ row }) => <div>{row.getValue("studentCount")}</div>,
    },
    {
        accessorKey: "staffCount",
        header: "Staff",
        cell: ({ row }) => <div>{row.getValue("staffCount")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const dept = row.original
  
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
              <DropdownMenuItem asChild>
                <Link href={`/admin-dashboard/departments/${dept.id}`}>
                    <Eye className="mr-2 h-4 w-4" /> View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEdit(dept)}>
                <FileEdit className="mr-2 h-4 w-4" /> Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDelete(dept.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
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
                <h1 className="text-2xl font-bold tracking-tight">Department Management</h1>
                <p className="text-muted-foreground">Manage academic and administrative departments.</p>
            </div>
            
            <Sheet open={isSheetOpen} onOpenChange={(open) => {
                setIsSheetOpen(open)
                if(!open) resetForm()
            }}>
                <SheetTrigger asChild>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Department
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>{currentDept ? 'Edit Department' : 'Create New Department'}</SheetTitle>
                        <SheetDescription>
                            {currentDept ? 'Update department details below.' : 'Add a new department to the system.'}
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Department Name</Label>
                            <Input 
                                id="name" 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                placeholder="Computer Science" 
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="code">Department Code</Label>
                            <Input 
                                id="code" 
                                value={formData.code} 
                                onChange={(e) => setFormData({...formData, code: e.target.value})} 
                                placeholder="CS" 
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="hod">Head of Department (HOD)</Label>
                            <Select value={formData.hod} onValueChange={(val) => setFormData({...formData, hod: val})}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Assign HOD" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Dr. Alan Turing">Dr. Alan Turing</SelectItem>
                                    <SelectItem value="Dr. Grace Hopper">Dr. Grace Hopper</SelectItem>
                                    <SelectItem value="John Smith">John Smith</SelectItem>
                                    <SelectItem value="Jane Doe">Jane Doe</SelectItem>
                                    <SelectItem value="Unassigned">Unassigned</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <Button className="mt-4" onClick={handleSave}>
                            {currentDept ? 'Save Changes' : 'Create Department'}
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>

      <div className="flex items-center gap-4 py-4">
        <div className="relative flex-1 max-w-sm">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
            placeholder="Search departments..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="pl-8"
            />
        </div>
        
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
