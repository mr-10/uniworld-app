import { useState, useEffect } from "react";
import { University } from "@/types";
import universitiesData from "@/data/universities.json";

export function useUniversities() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      setUniversities(universitiesData.universities as University[]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load universities");
      setUniversities([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUniversityById = (id: string): University | undefined => {
    return universities.find((u) => u.id === id);
  };

  const searchUniversities = (query: string): University[] => {
    if (!query.trim()) return universities;
    const lowerQuery = query.toLowerCase();
    return universities.filter(
      (u) =>
        u.name.toLowerCase().includes(lowerQuery) ||
        u.country.toLowerCase().includes(lowerQuery) ||
        u.programs.some((p) => p.toLowerCase().includes(lowerQuery))
    );
  };

  const filterUniversities = (filters: {
    countries?: string[];
    tuitionRange?: [number, number];
    scholarshipsOnly?: boolean;
    rankingRange?: [number, number];
    programs?: string[];
    languages?: string[];
    intakeSeasons?: string[];
    types?: string[];
    acceptanceRateRange?: [number, number];
  }): University[] => {
    return universities.filter((u) => {
      if (filters.countries && filters.countries.length > 0 && !filters.countries.includes(u.country)) {
        return false;
      }

      if (filters.tuitionRange) {
        const avgTuition = (u.tuition.undergraduate + u.tuition.postgraduate) / 2;
        if (avgTuition < filters.tuitionRange[0] || avgTuition > filters.tuitionRange[1]) {
          return false;
        }
      }

      if (filters.scholarshipsOnly && u.scholarships.length === 0) {
        return false;
      }

      if (filters.rankingRange) {
        if (u.ranking < filters.rankingRange[0] || u.ranking > filters.rankingRange[1]) {
          return false;
        }
      }

      if (filters.programs && filters.programs.length > 0) {
        if (!u.programs.some((p) => filters.programs!.includes(p))) {
          return false;
        }
      }

      if (filters.languages && filters.languages.length > 0 && !filters.languages.includes(u.language)) {
        return false;
      }

      if (filters.intakeSeasons && filters.intakeSeasons.length > 0) {
        if (!u.intakeSeasons.some((s) => filters.intakeSeasons!.includes(s))) {
          return false;
        }
      }

      if (filters.types && filters.types.length > 0 && !filters.types.includes(u.type)) {
        return false;
      }

      if (filters.acceptanceRateRange) {
        if (u.acceptanceRate < filters.acceptanceRateRange[0] || u.acceptanceRate > filters.acceptanceRateRange[1]) {
          return false;
        }
      }

      return true;
    });
  };

  return {
    universities,
    isLoading,
    error,
    getUniversityById,
    searchUniversities,
    filterUniversities,
  };
}
