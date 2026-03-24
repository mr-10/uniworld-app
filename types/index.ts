export interface Scholarship {
  id: string;
  name: string;
  amount: number;
  eligibility: string;
  deadline: string;
}

export interface University {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  city: string;
  website: string;
  admissionEmail: string;
  ranking: number;
  rankingSource: string;
  tuition: {
    undergraduate: number;
    postgraduate: number;
  };
  acceptanceRate: number;
  studentPopulation: number;
  type: string;
  language: string;
  intakeSeasons: string[];
  programs: string[];
  applicationDeadlines: Record<string, string>;
  scholarships: Scholarship[];
}

export interface SavedUniversity {
  universityId: string;
  savedAt: string;
}

export interface BookmarkedScholarship {
  scholarshipId: string;
  universityId: string;
  bookmarkedAt: string;
}

export interface DocumentChecklistItem {
  id: string;
  name: string;
  completed: boolean;
}

export interface ComparisonState {
  selectedUniversities: string[];
}

export interface OnboardingState {
  completed: boolean;
}
