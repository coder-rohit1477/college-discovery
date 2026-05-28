import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getOrCreateUser } from "@/lib/auth-utils";
import { SavedCollegeService } from "@/features/colleges/services/saved-college.service";

/**
 * GET /api/colleges/saved
 * Returns a list of saved colleges for the current user.
 * Or returns a list of IDs if query param 'idsOnly' is present.
 */
export async function GET(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getOrCreateUser();
    if (!user) {
      return NextResponse.json({ error: "User sync failed" }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const idsOnly = searchParams.get("idsOnly") === "true";

    if (idsOnly) {
      const ids = await SavedCollegeService.getSavedCollegeIds(user.id);
      return NextResponse.json(ids);
    }

    const savedColleges = await SavedCollegeService.getSavedColleges(user.id);
    return NextResponse.json(savedColleges);
  } catch (error) {
    console.error("Error in GET /api/colleges/saved:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/colleges/saved
 * Saves a college for the current user.
 */
export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getOrCreateUser();
    if (!user) {
      return NextResponse.json({ error: "User sync failed" }, { status: 500 });
    }

    const body = await request.json();
    const { collegeId } = body;

    if (!collegeId) {
      return NextResponse.json({ error: "collegeId is required" }, { status: 400 });
    }

    await SavedCollegeService.saveCollege(user.id, collegeId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /api/colleges/saved:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * DELETE /api/colleges/saved
 * Unsaves a college for the current user.
 */
export async function DELETE(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getOrCreateUser();
    if (!user) {
      return NextResponse.json({ error: "User sync failed" }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const collegeId = searchParams.get("collegeId");

    if (!collegeId) {
      return NextResponse.json({ error: "collegeId is required" }, { status: 400 });
    }

    await SavedCollegeService.unsaveCollege(user.id, collegeId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/colleges/saved:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
