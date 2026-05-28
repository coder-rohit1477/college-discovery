import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, GraduationCap, MapPin, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <GraduationCap className="h-4 w-4" />
                <span>Find Your Future Today</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6">
                Discover the Perfect <span className="text-primary">College</span> for Your Career
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
                Browse through 40+ premier institutions, compare rankings, fees, and placements. 
                Everything you need to make the right choice for your education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/colleges">
                  <Button size="lg" className="h-12 px-8 text-base">
                    Explore Colleges
                    <Search className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/colleges?sortBy=ranking&sortOrder=asc">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                    View Rankings
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
                <div className="relative bg-card border rounded-2xl shadow-2xl p-6 rotate-3">
                   {/* Decorative elements representing a college card */}
                   <div className="flex items-center gap-4 mb-4">
                     <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                       <GraduationCap className="h-6 w-6 text-primary" />
                     </div>
                     <div>
                       <div className="h-4 w-32 bg-muted rounded mb-2" />
                       <div className="h-3 w-20 bg-muted/60 rounded" />
                     </div>
                   </div>
                   <div className="space-y-3">
                     <div className="h-2 w-full bg-muted rounded" />
                     <div className="h-2 w-full bg-muted rounded" />
                     <div className="h-2 w-2/3 bg-muted rounded" />
                   </div>
                   <div className="mt-6 flex justify-between items-center">
                     <div className="flex gap-1">
                       {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 fill-primary text-primary" />)}
                     </div>
                     <div className="h-6 w-16 bg-primary/10 rounded" />
                   </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-900 border rounded-xl shadow-xl p-4 -rotate-6 hidden sm:block">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium">40+ Locations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">40+</div>
              <div className="text-muted-foreground">Premier Colleges</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">20+</div>
              <div className="text-muted-foreground">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Verified Data</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">Free</div>
              <div className="text-muted-foreground">Comparison Tools</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
