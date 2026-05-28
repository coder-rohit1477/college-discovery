"use client";

import React, { useCallback, useMemo, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useColleges } from "@/features/colleges/hooks/use-colleges";
import { useFilterOptions } from "@/features/colleges/hooks/use-filter-options";
import { CollegeCard } from "@/features/colleges/components/college-card";
import { CollegeSkeleton } from "@/features/colleges/components/college-skeleton";
import { SearchBar } from "@/features/colleges/components/search-bar";
import { FiltersSidebar } from "@/features/colleges/components/filters-sidebar";
import { SortDropdown } from "@/features/colleges/components/sort-dropdown";
import { PaginationControls } from "@/features/colleges/components/pagination-controls";
import { EmptyState } from "@/features/colleges/components/empty-state";
import { CollegeType } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Loader2 } from "lucide-react";

function CollegesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse query params
  const queryParams = useMemo(() => {
    return {
      search: searchParams.get("search") || undefined,
      city: searchParams.get("city") || undefined,
      state: searchParams.get("state") || undefined,
      type: (searchParams.get("type") as CollegeType) || undefined,
      minRating: searchParams.get("minRating") ? parseFloat(searchParams.get("minRating")!) : undefined,
      sortBy: (searchParams.get("sortBy") as any) || "ranking",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "asc",
      page: parseInt(searchParams.get("page") || "1"),
      limit: 12,
    };
  }, [searchParams]);

  const { data, isLoading, isError } = useColleges(queryParams);
  const { data: filterOptions } = useFilterOptions();

  const updateQueryParams = useCallback((updates: Record<string, any>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    // Only reset to page 1 if we are changing filters/search, not when specifically changing page
    if (!updates.hasOwnProperty("page") && searchParams.get("page") !== "1") {
      // Check if any actual filter/search changed before resetting page
      const filterChanged = Object.keys(updates).some(key => key !== "page");
      if (filterChanged) {
        params.set("page", "1");
      }
    }

    const newQueryString = params.toString();
    const currentQueryString = searchParams.toString();

    if (newQueryString !== currentQueryString) {
      router.push(`${pathname}?${newQueryString}`, { scroll: false });
    }
  }, [searchParams, router, pathname]);

  const handleSearch = useCallback((search: string) => {
    updateQueryParams({ search });
  }, [updateQueryParams]);

  const handleFilterChange = useCallback((key: string, value: any) => {
    updateQueryParams({ [key]: value });
  }, [updateQueryParams]);

  const handleSortChange = useCallback((sortBy: string, sortOrder: "asc" | "desc") => {
    updateQueryParams({ sortBy, sortOrder });
  }, [updateQueryParams]);

  const handlePageChange = useCallback((page: number) => {
    updateQueryParams({ page });
  }, [updateQueryParams]);

  const handleClearFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Explore Colleges</h1>
          <p className="text-muted-foreground">
            Discover the best colleges, universities, and institutions for your future.
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
          <div className="w-full md:max-w-md">
            <SearchBar defaultValue={queryParams.search} onSearch={handleSearch} />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto justify-between">
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-10">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="py-4">
                    <FiltersSidebar 
                      filters={queryParams}
                      onFilterChange={handleFilterChange}
                      onClearFilters={handleClearFilters}
                      cities={filterOptions?.cities || []}
                      states={filterOptions?.states || []}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            <SortDropdown 
              value={queryParams.sortBy} 
              order={queryParams.sortOrder} 
              onSortChange={handleSortChange} 
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24">
              <FiltersSidebar 
                filters={queryParams}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                cities={filterOptions?.cities || []}
                states={filterOptions?.states || []}
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CollegeSkeleton key={i} />
                ))}
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-destructive font-semibold">Something went wrong while fetching colleges.</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
              </div>
            ) : data?.data.length === 0 ? (
              <EmptyState onClearFilters={handleClearFilters} />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data?.data.map((college) => (
                    <CollegeCard key={college.id} college={college} />
                  ))}
                </div>
                
                <PaginationControls 
                  currentPage={data!.meta.page} 
                  totalPages={data!.meta.totalPages} 
                  onPageChange={handlePageChange} 
                />

                <div className="mt-8 text-center text-sm text-muted-foreground">
                  Showing {(data!.meta.page - 1) * data!.meta.limit + 1} to {Math.min(data!.meta.page * data!.meta.limit, data!.meta.total)} of {data!.meta.total} colleges
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function CollegesPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <CollegesContent />
    </Suspense>
  );
}
