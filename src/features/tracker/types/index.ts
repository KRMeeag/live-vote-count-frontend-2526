export interface CollegeTurnout {
  college: string;
  count: number;
  total: number;
  percentage: number;
  underReview?: boolean; // New column
}

export interface TallyApiResponse {
    data: CollegeTurnout[];
}