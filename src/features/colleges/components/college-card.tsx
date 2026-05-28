import React from "react";
import { CollegeWithDetails } from "../types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, GraduationCap, Star, TrendingUp, ArrowRightLeft } from "lucide-react";
import Image from "next/image";
import { useCompareStore } from "@/stores/use-compare-store";
import { cn } from "@/lib/utils";

interface CollegeCardProps {
  college: CollegeWithDetails;
}

export function CollegeCard({ college }: CollegeCardProps) {
  const { selectedCollegeSlugs, addCollege, removeCollege } = useCompareStore();
  const isSelected = selectedCollegeSlugs.includes(college.slug);
  const isMaxReached = selectedCollegeSlugs.length >= 4;

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSelected) {
      removeCollege(college.slug);
    } else {
      addCollege(college.slug);
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden flex flex-col h-full hover:shadow-lg transition-all",
      isSelected && "ring-2 ring-primary border-primary shadow-md"
    )}>
      <div className="relative h-48 w-full bg-muted">
        {college.bannerUrl ? (
          <Image
            src={college.bannerUrl}
            alt={college.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10">
            <GraduationCap className="h-12 w-12 text-primary/40" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge variant={college.type === "PUBLIC" ? "secondary" : "outline"} className="bg-background/80 backdrop-blur-sm">
            {college.type}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-lg line-clamp-2 min-h-[3.5rem] flex-1">
            {college.name}
          </h3>
          {college.averageRating && (
            <Badge variant="secondary" className="flex items-center gap-1 shrink-0">
              <Star className="h-3 w-3 fill-primary text-primary" />
              {college.averageRating.toFixed(1)}
            </Badge>
          )}
        </div>
        <div className="flex items-center text-sm text-muted-foreground gap-1">
          <MapPin className="h-3 w-3" />
          <span>{college.city}, {college.state}</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-1">
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Ranking</span>
            <span className="font-medium">#{college.ranking || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Established</span>
            <span className="font-medium">{college.established || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Courses</span>
            <span className="font-medium">{college._count.courses} Programs</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Placements</span>
            <span className="font-medium text-green-600">{college.placementPercentage ? `${college.placementPercentage}%` : "N/A"}</span>
          </div>
        </div>
        
        {college.averagePackage && (
          <div className="mt-4 pt-4 border-t flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-semibold">Avg. Package</span>
            </div>
            <span className="font-bold text-lg">₹{Number(college.averagePackage).toLocaleString()} LPA</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
        <Button 
          variant={isSelected ? "secondary" : "outline"} 
          className={cn("flex-1", isSelected && "bg-green-100 text-green-700 hover:bg-green-200 border-green-200")}
          onClick={toggleCompare}
          disabled={!isSelected && isMaxReached}
        >
          <ArrowRightLeft className="h-4 w-4 mr-2" />
          {isSelected ? "Compared" : "Compare"}
        </Button>
        <Button variant="outline" className="flex-1">View Details</Button>
      </CardFooter>
    </Card>
  );
}
