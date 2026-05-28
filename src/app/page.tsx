import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, GraduationCap, MapPin, Star, TrendingUp, ArrowRightLeft } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/[0.03] via-background to-primary/[0.05] overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase border border-primary/20">
                <GraduationCap className="h-4 w-4" />
                <span>Verified Admissions 2026</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1]">
                Find the <span className="text-primary relative inline-block">
                  Perfect
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                  </svg>
                </span> College for Your Future
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Explore premier institutions across India. Compare top-tier colleges with verified data on rankings, placement stats, and campus life.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link href="/colleges">
                  <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 group">
                    Start Exploring
                    <Search className="ml-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </Button>
                </Link>
                <Link href="/compare">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold backdrop-blur-sm border-2 transition-all hover:bg-primary/5 hover:border-primary/30 group">
                    Compare Tools
                    <ArrowRightLeft className="ml-3 h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex-1 relative animate-in fade-in slide-in-from-right-12 duration-1000 delay-200">
              <div className="relative w-full aspect-[4/3] max-w-[600px] mx-auto group">
                {/* Main floating card */}
                <div className="relative bg-card/60 backdrop-blur-xl border border-white/20 rounded-[2.5rem] shadow-2xl p-8 transition-transform duration-500 group-hover:-translate-y-4">
                   <div className="flex items-center gap-6 mb-8">
                     <div className="w-16 h-16 rounded-2xl bg-primary shadow-lg shadow-primary/30 flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                       <GraduationCap className="h-8 w-8 text-primary-foreground" />
                     </div>
                     <div className="space-y-2">
                       <div className="h-5 w-48 bg-primary/20 rounded-full animate-pulse" />
                       <div className="h-3 w-28 bg-muted rounded-full" />
                     </div>
                   </div>
                   <div className="space-y-4">
                     <div className="h-2.5 w-full bg-muted rounded-full" />
                     <div className="h-2.5 w-full bg-muted rounded-full" />
                     <div className="h-2.5 w-3/4 bg-muted rounded-full" />
                   </div>
                   <div className="mt-10 flex justify-between items-center border-t pt-8">
                     <div className="flex gap-1.5">
                       {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
                     </div>
                     <div className="h-10 w-24 bg-primary/10 rounded-xl" />
                   </div>
                </div>
                
                {/* Overlapping elements */}
                <div className="absolute -bottom-6 -left-6 bg-background/80 backdrop-blur-md border rounded-3xl shadow-2xl p-5 -rotate-6 animate-bounce-slow hidden sm:flex items-center gap-4 border-primary/10">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center ring-1 ring-green-500/20">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-0.5">Average Package</p>
                    <p className="text-xl font-black text-foreground">₹18.5 LPA</p>
                  </div>
                </div>

                <div className="absolute -top-8 -right-4 bg-background/80 backdrop-blur-md border rounded-3xl shadow-2xl p-5 rotate-6 animate-float hidden sm:flex items-center gap-4 border-primary/10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center ring-1 ring-primary/20">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-0.5">Cities</p>
                    <p className="text-xl font-black text-foreground">20+ Pan India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-4xl font-black text-primary">40+</div>
              <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Colleges</div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-black text-primary">20+</div>
              <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Cities</div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-black text-primary">100%</div>
              <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Verified</div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-black text-primary">Free</div>
              <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Access</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
