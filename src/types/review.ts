type Rating = {
  percent: number;
  review: number;
};

export type ReviewOverview = {
  ratings: Rating[];
  average: number;
  total: number;
};

export type Review = {
  reviewId: number;
  userId: number;
  courseId: number;
  rating: number;
  review: string;
  createdAt: string; // ISO timestamp
  updatedAt: string;
  User: {
    name: string;
    img: string | null;
    isActive: boolean;
    isDeleted: boolean;
  };
};
