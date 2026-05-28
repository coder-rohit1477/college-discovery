import { College, Course, Review } from "@prisma/client";

export interface CollegeWithDetails extends College {
  _count: {
    courses: number;
    reviews: number;
  };
  courses?: Course[];
  averageRating?: number;
}

export interface CollegeListResponse {
  data: CollegeWithDetails[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
