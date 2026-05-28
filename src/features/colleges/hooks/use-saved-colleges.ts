import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { CollegeWithDetails } from "../types";
import { useState } from "react";

export function useSavedColleges() {
  const { userId, isLoaded } = useAuth();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  // Fetch all saved college IDs
  const { data: savedIds = [], isLoading: isLoadingIds } = useQuery<string[]>({
    queryKey: ["saved-college-ids", userId],
    queryFn: async () => {
      try {
        const response = await fetch("/api/colleges/saved?idsOnly=true");
        if (!response.ok) {
          if (response.status === 401) return []; // Gracefully handle session init
          throw new Error("Failed to fetch saved IDs");
        }
        return await response.json();
      } catch (err) {
        console.error("Error fetching saved IDs:", err);
        return [];
      }
    },
    enabled: isLoaded && !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fetch full saved college objects
  const { data: savedColleges = [], isLoading: isLoadingColleges } = useQuery<CollegeWithDetails[]>({
    queryKey: ["saved-colleges", userId],
    queryFn: async () => {
      try {
        const response = await fetch("/api/colleges/saved");
        if (!response.ok) {
          if (response.status === 401) return []; // Gracefully handle session init
          throw new Error("Failed to fetch saved colleges");
        }
        return await response.json();
      } catch (err) {
        console.error("Error fetching saved colleges:", err);
        return [];
      }
    },
    enabled: isLoaded && !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const saveMutation = useMutation({
    mutationFn: async (collegeId: string) => {
      const response = await fetch("/api/colleges/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeId }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save college");
      }
      
      return response.json();
    },
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["saved-college-ids", userId] });
      queryClient.invalidateQueries({ queryKey: ["saved-colleges", userId] });
    },
    onError: (err: Error) => {
      console.error("Save mutation error:", err);
      setError(err.message);
    }
  });

  const unsaveMutation = useMutation({
    mutationFn: async (collegeId: string) => {
      const response = await fetch(`/api/colleges/saved?collegeId=${collegeId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to unsave college");
      }
      
      return response.json();
    },
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["saved-college-ids", userId] });
      queryClient.invalidateQueries({ queryKey: ["saved-colleges", userId] });
    },
    onError: (err: Error) => {
      console.error("Unsave mutation error:", err);
      setError(err.message);
    }
  });

  const isSaved = (collegeId: string) => savedIds.includes(collegeId);

  const toggleSave = async (collegeId: string) => {
    // Prevent mutation if auth isn't ready or user isn't logged in
    if (!isLoaded || !userId) {
      console.warn("Attempted to toggle save before auth was ready or while unauthenticated");
      return;
    }

    setError(null);

    try {
      if (isSaved(collegeId)) {
        await unsaveMutation.mutateAsync(collegeId);
      } else {
        await saveMutation.mutateAsync(collegeId);
      }
    } catch (err) {
      // Rejections are already handled in onError of mutations, 
      // but we catch here to prevent unhandled promise rejections in the UI components
      console.debug("Mutation rejection caught in toggleSave");
    }
  };

  return {
    savedIds,
    savedColleges,
    isLoading: isLoadingIds || isLoadingColleges,
    isSaved,
    toggleSave,
    isMutating: saveMutation.isPending || unsaveMutation.isPending,
    error,
    clearError: () => setError(null)
  };
}
