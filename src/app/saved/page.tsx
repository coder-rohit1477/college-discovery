"use client";

import React from "react";
import { useSavedColleges } from "@/features/colleges/hooks/use-saved-colleges";
import { CollegeCard } from "@/features/colleges/components/college-card";
import { CollegeSkeleton } from "@/features/colleges/components/college-skeleton";
import { EmptyState } from "@/features/colleges/components/empty-state";
import { Heart, GraduationCap } from "lucide-react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function SavedCollegesPage() {
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const { savedColleges, isLoading, isSaved } = useSavedColleges();

  if (!isAuthLoaded) {
    return (
      <div className="container py-20 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-48 bg-muted rounded-xl mx-auto" />
          <div className="h-6 w-64 bg-muted rounded-xl mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((i) => (
              <CollegeSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="container py-24 text-center">
        <div className="max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="h-24 w-24 bg-red-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-red-500/10">
            <Heart className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-4xl font-black tracking-tight">Save Your Favorites</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Sign in to your account to save colleges and access them from any device.
          </p>
          <SignInButton mode="modal">
            <Button size="lg" className="h-14 px-10 text-lg font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Sign In Now
            </Button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 animate-in fade-in duration-700">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-red-500 mb-2">
            <Heart className="h-6 w-6 fill-current" />
            <span className="font-black uppercase tracking-[0.2em] text-xs">My Collection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Saved Colleges</h1>
          <p className="text-muted-foreground text-lg">
            You have {savedColleges.length} colleges in your wishlist.
          </p>
        </div>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {[1, 2, 3].map((i) => (
            <CollegeSkeleton key={i} />
          ))}
        </div>
      ) : savedColleges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {savedColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      ) : (
        <div className="px-4">
          <EmptyState
            title="Your wishlist is empty"
            description="Explore colleges and save the ones you're interested in to view them later."
            icon="heart"
            actionText="Explore Colleges"
            actionHref="/colleges"
          />
        </div>
      )}
    </div>
  );
}
