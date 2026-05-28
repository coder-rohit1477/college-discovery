import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slugsParam = searchParams.get("slugs");

    if (!slugsParam) {
      return NextResponse.json([]);
    }

    const slugs = slugsParam.split(",");

    const colleges = await prisma.college.findMany({
      where: {
        slug: { in: slugs },
      },
      include: {
        _count: {
          select: {
            courses: true,
            reviews: true,
          },
        },
        courses: {
          take: 5,
        },
      },
    });

    // Calculate average rating for each college
    const collegesWithRatings = await Promise.all(
      colleges.map(async (college) => {
        const avgRating = await prisma.review.aggregate({
          where: { collegeId: college.id },
          _avg: { rating: true },
        });

        return {
          ...college,
          averageRating: avgRating._avg.rating || 0,
        };
      })
    );

    // Sort to match the order of slugs provided
    const sortedColleges = slugs
      .map((slug) => collegesWithRatings.find((c) => c.slug === slug))
      .filter(Boolean);

    return NextResponse.json(sortedColleges);
  } catch (error) {
    console.error("Compare API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
