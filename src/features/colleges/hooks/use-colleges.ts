import { useQuery } from "@tanstack/react-query";
import { CollegeListResponse } from "../types";
import { CollegeQueryParams } from "../schema/college-query.schema";

async function fetchColleges(params: CollegeQueryParams): Promise<CollegeListResponse> {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const response = await fetch(`/api/colleges?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch colleges");
  }

  return response.json();
}

export function useColleges(params: CollegeQueryParams) {
  return useQuery({
    queryKey: ["colleges", params],
    queryFn: () => fetchColleges(params),
  });
}
