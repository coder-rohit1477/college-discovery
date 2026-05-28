import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [cities, states] = await Promise.all([
      prisma.college.findMany({
        select: { city: true },
        distinct: ["city"],
        orderBy: { city: "asc" },
      }),
      prisma.college.findMany({
        select: { state: true },
        distinct: ["state"],
        orderBy: { state: "asc" },
      }),
    ]);

    return NextResponse.json({
      cities: cities.map((c) => c.city),
      states: states.map((s) => s.state),
    });
  } catch (error) {
    console.error("Error fetching filters:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
