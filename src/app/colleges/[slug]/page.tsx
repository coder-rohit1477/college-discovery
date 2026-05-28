"use client";

import React, { Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CollegeWithDetails } from "@/features/colleges/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  MapPin, 
  GraduationCap, 
  Star, 
  TrendingUp, 
  Building2, 
  Calendar,
  Globe,
  ArrowLeft,
  ArrowRightLeft,
  Clock,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useCompareStore } from "@/stores/use-compare-store";
import { cn } from "@/lib/utils";
import { useSavedColleges } from "@/features/colleges/hooks/use-saved-colleges";
import { useAuth, SignInButton } from "@clerk/nextjs";

async function fetchCollegeBySlug(slug: string): Promise<CollegeWithDetails> {
  const response = await fetch(`/api/colleges/compare?slugs=${slug}`);
  if (!response.ok) throw new Error("College not found");
  const data = await response.json();
  return data[0];
}

function CollegeDetailContent() {
  const { slug } = useParams();
  const router = useRouter();
  const { userId } = useAuth();
  const { selectedCollegeSlugs, addCollege, removeCollege } = useCompareStore();
  const { isSaved, toggleSave, isMutating } = useSavedColleges();
  
  const { data: college, isLoading, isError } = useQuery({
    queryKey: ["college", slug],
    queryFn: () => fetchCollegeBySlug(slug as string),
    enabled: !!slug,
  });

  const isSelected = college ? selectedCollegeSlugs.includes(college.slug) : false;
  const isMaxReached = selectedCollegeSlugs.length >= 4;
  const saved = college ? isSaved(college.id) : false;

  const toggleCompare = () => {
    if (!college) return;
    if (isSelected) {
      removeCollege(college.slug);
    } else {
      addCollege(college.slug);
    }
  };

  const handleSave = async () => {
    if (!college || !userId) return;
    await toggleSave(college.id);
  };

  if (isLoading) return <CollegeDetailSkeleton />;
  if (isError || !college) return (
    <div className="container py-20 text-center animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold mb-4">College not found</h2>
      <Button onClick={() => router.push("/colleges")}>Back to listings</Button>
    </div>
  );

  const averageRating = college.averageRating || 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6 hover:bg-primary/10 hover:text-primary transition-colors group">
        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to listings
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Section */}
          <div className="relative h-[300px] md:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-background group">
            {college.bannerUrl ? (
              <Image src={college.bannerUrl} alt={college.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                <GraduationCap className="h-24 w-24 text-primary/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12 text-white">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-primary hover:bg-primary/90 text-white border-none backdrop-blur-md px-4 py-1">
                  {college.type}
                </Badge>
                {college.ranking && (
                  <Badge variant="outline" className="text-white border-white/40 backdrop-blur-md bg-white/10 px-4 py-1">
                    #{college.ranking} Nationally
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 drop-shadow-xl tracking-tight leading-none">{college.name}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-white/10 backdrop-blur-sm">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-sm md:text-base font-medium">{college.city}, {college.state}</span>
                </div>
                {college.established && (
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-white/10 backdrop-blur-sm">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <span className="text-sm md:text-base font-medium">Est. {college.established}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <section className="bg-card border rounded-[2rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] -rotate-12 translate-x-4 -translate-y-4">
               <Building2 className="w-32 h-32" />
            </div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="h-8 w-1.5 bg-primary rounded-full" />
              About the Institution
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-wrap">
              {college.description || "Information about this institution will be updated soon."}
            </p>
          </section>

          {/* Courses */}
          <section>
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <div className="h-8 w-1.5 bg-primary rounded-full" />
                Available Programs
              </h2>
              <Badge variant="secondary" className="px-4 py-1 rounded-full">{college._count.courses} Courses</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {college.courses?.map((course) => (
                <div key={course.id} className="bg-card border rounded-2xl p-6 hover:border-primary/50 hover:shadow-md transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                    <GraduationCap className="h-12 w-12" />
                  </div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">{course.name}</h3>
                    <Badge variant="outline" className="text-[10px] uppercase tracking-widest font-bold">{course.level}</Badge>
                  </div>
                  <div className="space-y-3 text-sm text-muted-foreground relative z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1 rounded-md bg-muted">
                        <Clock className="h-3.5 w-3.5" />
                      </div>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    {course.fees && (
                      <div className="flex items-center gap-2.5 text-primary font-bold">
                        <div className="p-1 rounded-md bg-primary/10">
                          <TrendingUp className="h-3.5 w-3.5" />
                        </div>
                        <span>₹{Number(course.fees).toLocaleString()} / year</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="shadow-2xl border-primary/10 rounded-[2rem] overflow-hidden sticky top-24">
            <div className="bg-primary p-8 text-primary-foreground text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)]" />
              <div className="relative z-10">
                <div className="text-6xl font-black mb-2 drop-shadow-lg">{averageRating.toFixed(1)}</div>
                <div className="flex justify-center mb-3 gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className={cn("h-5 w-5", i <= Math.round(averageRating) ? "fill-white" : "fill-white/20 text-white/20")} />
                  ))}
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-primary-foreground/70">Verified Rating</p>
                <div className="mt-2 text-xs bg-white/10 backdrop-blur-md rounded-full px-3 py-1 inline-block">
                   Based on {college._count.reviews} Reviews
                </div>
              </div>
            </div>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-5">
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="p-2 rounded-xl bg-green-500/10 text-green-600">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-wider">Placements</span>
                  </div>
                  <span className="font-black text-xl text-green-600">{college.placementPercentage}%</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-wider">Avg. Package</span>
                  </div>
                  <span className="font-black text-xl">₹{Number(college.averagePackage).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="p-2 rounded-xl bg-orange-500/10 text-orange-600">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-wider">Ranking</span>
                  </div>
                  <span className="font-black text-xl">#{college.ranking || "N/A"}</span>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex gap-3">
                  <Button className="flex-1 h-14 text-lg font-black shadow-xl shadow-primary/20 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]" size="lg">
                    Apply Now
                  </Button>
                  {userId ? (
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        "h-14 w-14 rounded-2xl border-2 transition-all",
                        saved ? "bg-red-50 text-red-500 border-red-100 hover:bg-red-100" : "hover:bg-muted"
                      )}
                      onClick={handleSave}
                      disabled={isMutating}
                    >
                      <Heart className={cn("h-6 w-6", saved && "fill-current")} />
                    </Button>
                  ) : (
                    <SignInButton mode="modal">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-14 w-14 rounded-2xl border-2 hover:bg-muted"
                      >
                        <Heart className="h-6 w-6" />
                      </Button>
                    </SignInButton>
                  )}
                </div>
                <Button 
                  variant={isSelected ? "secondary" : "outline"} 
                  className={cn(
                    "w-full h-14 text-base font-bold rounded-2xl transition-all", 
                    isSelected && "bg-green-100 text-green-700 hover:bg-green-200 border-green-200"
                  )}
                  onClick={toggleCompare}
                  disabled={!isSelected && isMaxReached}
                >
                  <ArrowRightLeft className="h-5 w-5 mr-3" />
                  {isSelected ? "In Comparison" : "Add to Compare"}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-dashed shadow-sm rounded-2xl group hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
               <h4 className="font-bold mb-3 flex items-center gap-3 text-sm uppercase tracking-widest text-muted-foreground">
                 <Globe className="h-4 w-4 text-primary" />
                 Official Website
               </h4>
               <a href={college.website || "#"} target="_blank" className="text-primary hover:underline font-bold break-all text-sm block group-hover:text-primary/80 transition-colors">
                 {college.website || "Not available"}
               </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CollegeDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-pulse">
      <Skeleton className="h-10 w-32 mb-6 rounded-full" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Skeleton className="h-[400px] w-full rounded-[2.5rem]" />
          <Skeleton className="h-48 w-full rounded-[2rem]" />
          <div className="space-y-6">
             <Skeleton className="h-8 w-48" />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[1,2,3,4].map(i => <Skeleton key={i} className="h-40 w-full rounded-2xl" />)}
             </div>
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-[500px] w-full rounded-[2rem]" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export default function CollegePage() {
  return (
    <Suspense fallback={<CollegeDetailSkeleton />}>
      <CollegeDetailContent />
    </Suspense>
  );
}
