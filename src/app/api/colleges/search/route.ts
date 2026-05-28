import { NextRequest, NextResponse } from "next/server";
import { CollegeService } from "@/features/colleges/services/college.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json([]);
    }

    const colleges = await CollegeService.searchColleges(query);

    return NextResponse.json(colleges);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
