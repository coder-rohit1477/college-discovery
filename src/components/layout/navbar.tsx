"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Search, Heart, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserButton, SignInButton, useAuth } from "@clerk/nextjs";
import { useCompareStore } from "@/stores/use-compare-store";

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
        <div className="flex items-center gap-8">
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
              <div className="hidden sm:flex items-center gap-2 mr-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/saved">
                    <Heart className="h-4 w-4 mr-2" />
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
