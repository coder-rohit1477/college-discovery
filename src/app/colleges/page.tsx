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
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Loader2, Sparkles } from "lucide-react";

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

    if (!updates.hasOwnProperty("page") && searchParams.get("page") !== "1") {
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
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col gap-10">
        {/* Header Section */}
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase w-fit">
            <Sparkles className="h-3 w-3" />
            <span>Discover Excellence</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
            Explore <span className="text-primary">Colleges</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl font-medium">
            Discover the best colleges, universities, and institutions for your future with verified data and side-by-side comparison.
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-card p-6 rounded-[2rem] border-2 shadow-xl shadow-primary/5 animate-in fade-in zoom-in-95 duration-700">
          <div className="w-full lg:max-w-xl">
            <SearchBar defaultValue={queryParams.search} onSearch={handleSearch} />
          </div>
          
          <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-12 px-6 rounded-2xl border-2 font-black uppercase text-[10px] tracking-widest gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[90%] sm:max-w-[400px] p-0 border-r-0">
                  <SheetHeader className="p-6 border-b">
                    <SheetTitle className="text-xl font-black uppercase tracking-tight">Search Filters</SheetTitle>
                  </SheetHeader>
                  <div className="p-6">
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

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
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
          <main className="flex-1 min-h-[600px] animate-in fade-in duration-700 delay-300">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CollegeSkeleton key={i} />
                ))}
              </div>
            ) : isError ? (
              <EmptyState 
                title="Failed to fetch colleges" 
                description="Our servers are having a bit of a moment. Please try refreshing the page." 
                icon="error"
                actionText="Refresh Page"
                onAction={() => window.location.reload()}
              />
            ) : data?.data.length === 0 ? (
              <EmptyState 
                title="No colleges found"
                description="We couldn't find any colleges matching your current filters. Try broadening your search or clearing all filters."
                icon="search"
                actionText="Clear all filters"
                onAction={handleClearFilters}
              />
            ) : (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {data?.data.map((college) => (
                    <CollegeCard key={college.id} college={college} />
                  ))}
                </div>
                
                <div className="flex flex-col items-center gap-6 pt-8 border-t border-dashed">
                  <PaginationControls 
                    currentPage={data!.meta.page} 
                    totalPages={data!.meta.totalPages} 
                    onPageChange={handlePageChange} 
                  />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                    Showing {(data!.meta.page - 1) * data!.meta.limit + 1} to {Math.min(data!.meta.page * data!.meta.limit, data!.meta.total)} of {data!.meta.total} colleges
                  </p>
                </div>
              </div>
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
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    }>
      <CollegesContent />
    </Suspense>
  );
}
