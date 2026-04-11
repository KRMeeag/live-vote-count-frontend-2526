export interface CollegeTurnout {
  college: string;
  count: number;
  total: number;
  percentage: number;
}

export interface TallyApiResponse {
    data: CollegeTurnout[];
}