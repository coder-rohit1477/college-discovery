import { NextRequest, NextResponse } from "next/server";
import { collegeQuerySchema } from "@/features/colleges/schema/college-query.schema";
import { CollegeService } from "@/features/colleges/services/college.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract search params into an object
    const params = Object.fromEntries(searchParams.entries());
    
    // Validate query parameters
    const validatedParams = collegeQuerySchema.parse(params);
    
    // Fetch colleges using the service
    const response = await CollegeService.getColleges(validatedParams);
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error fetching colleges:", error);
    
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
