import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export interface PaginationProps extends React.ComponentProps<"nav"> {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({
  className,
  currentPage,
  totalPages,
  onPageChange,
  ...props
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = []
    const showMax = 5

    if (totalPages <= showMax) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push("...")
      
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i)
      }
      
      if (currentPage < totalPages - 2) pages.push("...")
      if (!pages.includes(totalPages)) pages.push(totalPages)
    }
    return pages
  }

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    >
      <ul className="flex flex-row items-center gap-1">
        <li>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Go to previous page"
            className="gap-1"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
        </li>
        {getPageNumbers().map((page, i) => (
          <li key={i}>
            {page === "..." ? (
              <span className="flex h-9 w-9 items-center justify-center">
                <MoreHorizontal className="h-4 w-4" />
              </span>
            ) : (
              <Button
                variant={currentPage === page ? "outline" : "ghost"}
                size="icon"
                aria-current={currentPage === page ? "page" : undefined}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </Button>
            )}
          </li>
        ))}
        <li>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Go to next page"
            className="gap-1"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </li>
      </ul>
    </nav>
  )
}
Pagination.displayName = "Pagination"

export { Pagination }
