"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Search, Heart, ArrowRightLeft, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserButton, SignInButton, useAuth } from "@clerk/nextjs";
import { useCompareStore } from "@/stores/use-compare-store";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";

const navItems = [
  { name: "Home", href: "/", icon: null },
  { name: "Explore Colleges", href: "/colleges", icon: Search },
];

export function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useAuth();
  const { selectedCollegeSlugs } = useCompareStore();
  const compareCount = selectedCollegeSlugs.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px] p-6">
                <SheetHeader className="mb-8 text-left">
                  <SheetTitle className="flex items-center gap-3">
                    <div className="bg-primary rounded-lg p-1.5">
                      <GraduationCap className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span className="font-black text-xl tracking-tight">CollegeDiscovery</span>
                  </SheetTitle>
                </SheetHeader>
                
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-4 px-4 py-3 rounded-2xl text-base font-bold transition-all",
                        pathname === item.href 
                          ? "bg-primary/10 text-primary shadow-sm shadow-primary/5" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {item.icon ? <item.icon className="h-5 w-5" /> : <GraduationCap className="h-5 w-5" />}
                      {item.name}
                    </Link>
                  ))}
                  
                  {isLoaded && isSignedIn && (
                    <Link
                      href="/saved"
                      className={cn(
                        "flex items-center gap-4 px-4 py-3 rounded-2xl text-base font-bold transition-all",
                        pathname === "/saved" 
                          ? "bg-red-50 text-red-500 shadow-sm shadow-red-500/5" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Heart className={cn("h-5 w-5", pathname === "/saved" && "fill-current")} />
                      Saved Colleges
                    </Link>
                  )}

                  <Link
                    href="/compare"
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 rounded-2xl text-base font-bold transition-all",
                      pathname === "/compare" 
                        ? "bg-primary/10 text-primary shadow-sm shadow-primary/5" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <ArrowRightLeft className="h-5 w-5" />
                    <span>Compare</span>
                    {compareCount > 0 && (
                      <Badge className="ml-auto rounded-full px-2 font-black">{compareCount}</Badge>
                    )}
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-1">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">CollegeDiscovery</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/compare"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2",
                pathname === "/compare" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Compare
              {compareCount > 0 && (
                <Badge variant="default" className="h-5 min-w-[20px] px-1 flex items-center justify-center text-[10px]">
                  {compareCount}
                </Badge>
              )}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isLoaded && isSignedIn && (
            <>
              <div className="hidden md:flex items-center gap-2 mr-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/saved" className={cn(pathname === "/saved" && "text-red-500 hover:text-red-600 hover:bg-red-50")}>
                    <Heart className={cn("h-4 w-4 mr-2", pathname === "/saved" && "fill-current")} />
                    Saved
                  </Link>
                </Button>
              </div>
              <UserButton />
            </>
          )}
          {isLoaded && !isSignedIn && (
            <SignInButton mode="modal">
              <Button size="sm">Sign In</Button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}
