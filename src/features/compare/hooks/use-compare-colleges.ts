import { useQuery } from "@tanstack/react-query";
import { CollegeWithDetails } from "@/features/colleges/types";

async function fetchCompareColleges(slugs: string[]): Promise<CollegeWithDetails[]> {
  if (slugs.length === 0) return [];
  
  // We can use the existing search API or listing API if it supports multiple slugs
  // For now, let's fetch them individually or use the listing API with a filter
  const response = await fetch(`/api/colleges?limit=10&search=${slugs.join(',')}`);
  // Note: The backend listing API might need adjustment to support multiple slugs directly.
  // If it doesn't, we might need a dedicated API or fetch multiple times.
  
  // Let's assume we might need a dedicated API for exact slugs
  const exactResponse = await fetch(`/api/colleges/compare?slugs=${slugs.join(',')}`);
  
  if (!exactResponse.ok) {
    throw new Error("Failed to fetch colleges for comparison");
  }

  return exactResponse.json();
}

export function useCompareColleges(slugs: string[]) {
  return useQuery({
    queryKey: ["compare-colleges", slugs],
    queryFn: () => fetchCompareColleges(slugs),
    enabled: slugs.length > 0,
  });
}
