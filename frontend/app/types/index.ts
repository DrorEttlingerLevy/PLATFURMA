export interface Activity {
  id: string;
  name: string;
  description: string;
  ageRangeMonths: { min: number; max: number } | null;
  startDate: string; // DDMMYYYY
  isOneTime: boolean;
  sessionsPerWeek: number; // ignored when isOneTime
  totalWeeks: number;      // ignored when isOneTime
}

export interface Mom {
  id: string;
  name: string;
  phone: string;
  email: string;
  babyName: string;
  babyAgeMonths: number; // supports 0.5
}

export interface BoardState {
  activities: Activity[];
  moms: Mom[];
  enrollments: Record<string, string[]>; // activityId → momId[]
}
