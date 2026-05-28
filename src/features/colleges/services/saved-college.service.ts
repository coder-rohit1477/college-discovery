import prisma from "@/lib/prisma";

export class SavedCollegeService {
  /**
   * Fetches saved colleges for a specific user.
   */
  static async getSavedColleges(userId: string) {
    const savedColleges = await prisma.savedCollege.findMany({
      where: { userId },
      include: {
        college: {
          include: {
            _count: {
              select: {
                courses: true,
                reviews: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Extract college data and fetch average ratings
    const colleges = savedColleges.map((sc) => sc.college);
    const collegeIds = colleges.map((c) => c.id);

    const avgRatings = await prisma.review.groupBy({
      by: ["collegeId"],
      _avg: { rating: true },
      where: { collegeId: { in: collegeIds } },
    });

    const ratingMap = new Map(avgRatings.map((r) => [r.collegeId, r._avg.rating || 0]));

    return colleges.map((college) => ({
      ...college,
      averageRating: ratingMap.get(college.id) || 0,
    }));
  }

  /**
   * Saves a college for a user.
   */
  static async saveCollege(userId: string, collegeId: string) {
    return prisma.savedCollege.upsert({
      where: {
        userId_collegeId: {
          userId,
          collegeId,
        },
      },
      update: {},
      create: {
        userId,
        collegeId,
      },
    });
  }

  /**
   * Removes a saved college for a user.
   */
  static async unsaveCollege(userId: string, collegeId: string) {
    return prisma.savedCollege.deleteMany({
      where: {
        userId,
        collegeId,
      },
    });
  }

  /**
   * Checks if a college is saved by a user.
   */
  static async isCollegeSaved(userId: string, collegeId: string) {
    const saved = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId,
          collegeId,
        },
      },
    });
    return !!saved;
  }
  
  /**
   * Gets all saved college IDs for a user.
   */
  static async getSavedCollegeIds(userId: string) {
    const saved = await prisma.savedCollege.findMany({
      where: { userId },
      select: { collegeId: true },
    });
    return saved.map(s => s.collegeId);
  }
}
