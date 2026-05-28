import React from "react";
import { CollegeWithDetails } from "../types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, GraduationCap, Star, TrendingUp, ArrowRightLeft, Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCompareStore } from "@/stores/use-compare-store";
import { cn } from "@/lib/utils";
import { useSavedColleges } from "../hooks/use-saved-colleges";
import { useAuth, SignInButton } from "@clerk/nextjs";

interface CollegeCardProps {
  college: CollegeWithDetails;
}

export function CollegeCard({ college }: CollegeCardProps) {
  const { userId } = useAuth();
  const { selectedCollegeSlugs, addCollege, removeCollege } = useCompareStore();
  const { isSaved, toggleSave, isMutating } = useSavedColleges();
  
  const isSelected = selectedCollegeSlugs.includes(college.slug);
  const isMaxReached = selectedCollegeSlugs.length >= 4;
  const saved = isSaved(college.id);

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSelected) {
      removeCollege(college.slug);
    } else {
      addCollege(college.slug);
    }
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!userId) return;
    await toggleSave(college.id);
  };

  return (
    <Card className={cn(
      "group overflow-hidden flex flex-col h-full transition-all duration-500 rounded-[2rem] border-2",
      isSelected 
        ? "ring-4 ring-primary/10 border-primary shadow-2xl shadow-primary/10 -translate-y-1" 
        : "hover:shadow-xl hover:-translate-y-2 hover:border-primary/30"
    )}>
      <div className="relative h-52 w-full bg-muted overflow-hidden">
        {college.bannerUrl ? (
          <Image
            src={college.bannerUrl}
            alt={college.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/5">
            <GraduationCap className="h-16 w-16 text-primary/10 group-hover:scale-110 transition-transform duration-500" />
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
           <Link href={`/colleges/${college.slug}`}>
             <Button variant="secondary" size="sm" className="rounded-full font-bold shadow-xl">
               <Eye className="h-4 w-4 mr-2" />
               View
             </Button>
           </Link>
        </div>

        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <Badge className={cn(
            "backdrop-blur-md px-3 py-1 font-bold border-none self-end",
            college.type === "PUBLIC" ? "bg-blue-500/80 text-white" : "bg-orange-500/80 text-white"
          )}>
            {college.type}
          </Badge>

          {userId ? (
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                "rounded-full h-10 w-10 shadow-xl transition-all duration-300 border-none",
                saved ? "bg-red-50 text-red-500 hover:bg-red-100" : "bg-white/80 hover:bg-white text-gray-600"
              )}
              onClick={handleSave}
              disabled={isMutating}
            >
              <Heart className={cn("h-5 w-5", saved && "fill-current")} />
            </Button>
          ) : (
            <SignInButton mode="modal">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full h-10 w-10 shadow-xl bg-white/80 hover:bg-white text-gray-600 border-none"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </SignInButton>
          )}
        </div>

        {isSelected && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-green-500 text-white border-none px-3 py-1 font-bold animate-in zoom-in duration-300">
              Selected
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="p-6 pb-2">
        <div className="flex justify-between items-start gap-3">
          <Link href={`/colleges/${college.slug}`} className="flex-1 group/title">
            <h3 className="font-black text-xl line-clamp-2 min-h-[3.5rem] group-hover/title:text-primary transition-colors leading-tight tracking-tight">
              {college.name}
            </h3>
          </Link>
          {college.averageRating && (
            <div className="flex flex-col items-center shrink-0 bg-primary/5 px-2 py-1 rounded-xl">
              <span className="text-xs font-black text-primary leading-none mb-0.5">{college.averageRating.toFixed(1)}</span>
              <Star className="h-3 w-3 fill-primary text-primary" />
            </div>
          )}
        </div>
        <div className="flex items-center text-xs font-bold text-muted-foreground gap-1.5 uppercase tracking-widest mt-1">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span>{college.city}, {college.state}</span>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-2 flex-1">
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Ranking</span>
            <span className="font-bold text-sm">#{college.ranking || "N/A"} Nationally</span>
          </div>
          <div className="flex flex-col gap-0.5 text-right">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Programs</span>
            <span className="font-bold text-sm">{college._count.courses} Courses</span>
          </div>
        </div>
        
        {college.averagePackage && (
          <div className="mt-6 pt-4 border-t border-dashed flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">Avg. Package</span>
            </div>
            <span className="font-black text-lg text-foreground">₹{Number(college.averagePackage).toLocaleString()}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 gap-3">
        <Button 
          variant={isSelected ? "secondary" : "outline"} 
          className={cn(
            "flex-1 h-12 rounded-xl font-bold transition-all", 
            isSelected 
              ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200" 
              : "hover:bg-primary/5 hover:border-primary/50 group/btn"
          )}
          onClick={toggleCompare}
          disabled={!isSelected && isMaxReached}
        >
          <ArrowRightLeft className={cn("h-4 w-4 mr-2 transition-transform", !isSelected && "group-hover:rotate-180 duration-500")} />
          {isSelected ? "Remove" : "Compare"}
        </Button>
        <Link href={`/colleges/${college.slug}`} className="flex-1">
          <Button variant="outline" className="w-full h-12 rounded-xl font-bold hover:bg-muted/50 border-2">Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
