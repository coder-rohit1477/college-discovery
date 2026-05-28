"use client";

import React, { Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCompareColleges } from "@/features/compare/hooks/use-compare-colleges";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Trash2, 
  Star, 
  TrendingUp, 
  GraduationCap, 
  MapPin, 
  Calendar,
  Building2,
  CheckCircle2,
  XCircle,
  Loader2,
  LayoutPanelLeft
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCompareStore } from "@/stores/use-compare-store";

function ComparePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slugs = useMemo(() => searchParams.get("colleges")?.split(",") || [], [searchParams]);
  const { clearComparison, removeCollege } = useCompareStore();

  const { data: colleges, isLoading, isError } = useCompareColleges(slugs);

  if (slugs.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">No colleges selected for comparison</h1>
        <p className="text-muted-foreground mb-8">Select at least 2 colleges to see a side-by-side comparison.</p>
        <Link href="/colleges">
          <Button>Browse Colleges</Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-[70vh] items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Gathering comparison data...</p>
      </div>
    );
  }

  if (isError || !colleges) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">Failed to load comparison data</h1>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  const comparisonRows = [
    { label: "Rating", key: "averageRating", icon: Star, highlight: "max" },
    { label: "Ranking", key: "ranking", icon: GraduationCap, highlight: "min" },
    { label: "Fees (Starting)", key: "fees", icon: Building2, highlight: "min" },
    { label: "Placements", key: "placementPercentage", icon: CheckCircle2, highlight: "max", suffix: "%" },
    { label: "Avg. Package", key: "averagePackage", icon: TrendingUp, highlight: "max", prefix: "₹", suffix: " LPA" },
    { label: "Established", key: "established", icon: Calendar },
    { label: "Type", key: "type", icon: Building2 },
    { label: "Location", key: "location", icon: MapPin },
  ];

  const getHighlightClass = (row: any, value: any, allValues: any[]) => {
    if (!row.highlight || allValues.length < 2) return "";
    
    const numericValues = allValues.map(v => typeof v === 'object' ? Number(v) : v).filter(v => v !== null && v !== undefined);
    if (numericValues.length < 2) return "";

    if (row.highlight === "max") {
      const max = Math.max(...numericValues);
      return value == max ? "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 font-bold" : "";
    } else {
      const min = Math.min(...numericValues);
      return value == min ? "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 font-bold" : "";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/colleges">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Compare Colleges</h1>
          <Badge variant="secondary" className="text-lg px-3">{colleges.length} selected</Badge>
        </div>
        <Button variant="outline" onClick={clearComparison} className="text-destructive hover:bg-destructive/10">
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Comparison
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="p-6 text-left min-w-[200px] font-semibold text-muted-foreground">Features</th>
              {colleges.map((college) => (
                <th key={college.id} className="p-6 min-w-[280px] vertical-align-top">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="relative h-24 w-full rounded-lg overflow-hidden bg-muted">
                      {college.bannerUrl ? (
                        <Image src={college.bannerUrl} alt={college.name} fill className="object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <GraduationCap className="h-10 w-10 text-primary/30" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-lg line-clamp-2 leading-tight h-12">
                        {college.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {college.city}, {college.state}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeCollege(college.slug)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => {
              const allValues = colleges.map(c => {
                if (row.key === "fees") {
                  return c.courses?.[0]?.fees ? Number(c.courses[0].fees) : null;
                }
                return c[row.key as keyof typeof c];
              });

              return (
                <tr key={row.label} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="p-6 bg-muted/10">
                    <div className="flex items-center gap-3">
                      <row.icon className="h-4 w-4 text-primary" />
                      <span className="font-medium">{row.label}</span>
                    </div>
                  </td>
                  {colleges.map((college) => {
                    let value: any = college[row.key as keyof typeof college];
                    
                    if (row.key === "fees") {
                      value = college.courses?.[0]?.fees ? Number(college.courses[0].fees) : "N/A";
                    } else if (row.key === "averageRating") {
                      value = value ? Number(value).toFixed(1) : "N/A";
                    }

                    const displayValue = value === null || value === undefined || value === "N/A" 
                      ? "N/A" 
                      : `${row.prefix || ""}${typeof value === 'number' ? value.toLocaleString() : value}${row.suffix || ""}`;

                    return (
                      <td 
                        key={`${college.id}-${row.key}`} 
                        className={cn("p-6 text-center transition-colors", getHighlightClass(row, value, allValues))}
                      >
                        {displayValue}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            
            {/* Courses Row */}
            <tr className="hover:bg-muted/50 transition-colors">
              <td className="p-6 bg-muted/10 align-top">
                <div className="flex items-center gap-3">
                  <LayoutPanelLeft className="h-4 w-4 text-primary" />
                  <span className="font-medium">Top Courses</span>
                </div>
              </td>
              {colleges.map((college) => (
                <td key={`${college.id}-courses`} className="p-6">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {college.courses?.slice(0, 3).map((course) => (
                      <Badge key={course.id} variant="outline" className="text-[10px] whitespace-nowrap">
                        {course.name}
                      </Badge>
                    ))}
                    {college._count.courses > 3 && (
                      <Badge variant="ghost" className="text-[10px]">
                        +{college._count.courses - 3} more
                      </Badge>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-12 bg-primary/5 rounded-2xl p-8 border border-primary/10">
         <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="bg-primary/10 p-4 rounded-full">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-bold mb-2">Need a more detailed comparison?</h2>
              <p className="text-muted-foreground">Download the full comparison report or talk to our educational experts for a personalized consultation.</p>
            </div>
            <div className="flex gap-4">
              <Button size="lg">Download PDF</Button>
              <Button variant="outline" size="lg">Consult Expert</Button>
            </div>
         </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <ComparePageContent />
    </Suspense>
  );
}
