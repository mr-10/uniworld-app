import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SavedUniversity,
  BookmarkedScholarship,
  DocumentChecklistItem,
  ComparisonState,
  OnboardingState,
} from "@/types";

interface AppContextType {
  // Saved universities
  savedUniversities: SavedUniversity[];
  addSavedUniversity: (universityId: string) => Promise<void>;
  removeSavedUniversity: (universityId: string) => Promise<void>;
  isSaved: (universityId: string) => boolean;

  // Bookmarked scholarships
  bookmarkedScholarships: BookmarkedScholarship[];
  addBookmarkedScholarship: (scholarshipId: string, universityId: string) => Promise<void>;
  removeBookmarkedScholarship: (scholarshipId: string) => Promise<void>;
  isBookmarked: (scholarshipId: string) => boolean;

  // Comparison
  comparisonState: ComparisonState;
  addToComparison: (universityId: string) => Promise<void>;
  removeFromComparison: (universityId: string) => Promise<void>;
  clearComparison: () => Promise<void>;

  // Checklist
  checklist: DocumentChecklistItem[];
  toggleChecklistItem: (itemId: string) => Promise<void>;

  // Onboarding
  onboardingState: OnboardingState;
  completeOnboarding: () => Promise<void>;

  // Loading state
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SAVED_UNIVERSITIES: "saved_universities",
  BOOKMARKED_SCHOLARSHIPS: "bookmarked_scholarships",
  COMPARISON_STATE: "comparison_state",
  CHECKLIST: "checklist",
  ONBOARDING_STATE: "onboarding_state",
};

const DEFAULT_CHECKLIST: DocumentChecklistItem[] = [
  { id: "1", name: "Passport", completed: false },
  { id: "2", name: "Transcripts", completed: false },
  { id: "3", name: "IELTS/TOEFL Scores", completed: false },
  { id: "4", name: "Statement of Purpose (SOP)", completed: false },
  { id: "5", name: "Letters of Recommendation (LOR)", completed: false },
  { id: "6", name: "CV / Resume", completed: false },
  { id: "7", name: "Financial Proof", completed: false },
  { id: "8", name: "Health Insurance Documents", completed: false },
  { id: "9", name: "Visa Documents", completed: false },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [savedUniversities, setSavedUniversities] = useState<SavedUniversity[]>([]);
  const [bookmarkedScholarships, setBookmarkedScholarships] = useState<BookmarkedScholarship[]>([]);
  const [comparisonState, setComparisonState] = useState<ComparisonState>({ selectedUniversities: [] });
  const [checklist, setChecklist] = useState<DocumentChecklistItem[]>(DEFAULT_CHECKLIST);
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({ completed: false });
  const [isLoading, setIsLoading] = useState(true);

  // Load all data from AsyncStorage on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setIsLoading(true);
      const [saved, bookmarked, comparison, checklistData, onboarding] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.SAVED_UNIVERSITIES),
        AsyncStorage.getItem(STORAGE_KEYS.BOOKMARKED_SCHOLARSHIPS),
        AsyncStorage.getItem(STORAGE_KEYS.COMPARISON_STATE),
        AsyncStorage.getItem(STORAGE_KEYS.CHECKLIST),
        AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_STATE),
      ]);

      if (saved) setSavedUniversities(JSON.parse(saved));
      if (bookmarked) setBookmarkedScholarships(JSON.parse(bookmarked));
      if (comparison) setComparisonState(JSON.parse(comparison));
      if (checklistData) setChecklist(JSON.parse(checklistData));
      if (onboarding) setOnboardingState(JSON.parse(onboarding));
    } catch (error) {
      console.error("Error loading app data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addSavedUniversity = async (universityId: string) => {
    try {
      const newSaved: SavedUniversity = {
        universityId,
        savedAt: new Date().toISOString(),
      };
      const updated = [...savedUniversities, newSaved];
      setSavedUniversities(updated);
      await AsyncStorage.setItem(STORAGE_KEYS.SAVED_UNIVERSITIES, JSON.stringify(updated));
    } catch (error) {
      console.error("Error saving university:", error);
    }
  };

  const removeSavedUniversity = async (universityId: string) => {
    try {
      const updated = savedUniversities.filter((s) => s.universityId !== universityId);
      setSavedUniversities(updated);
      await AsyncStorage.setItem(STORAGE_KEYS.SAVED_UNIVERSITIES, JSON.stringify(updated));
    } catch (error) {
      console.error("Error removing saved university:", error);
    }
  };

  const isSaved = (universityId: string) => {
    return savedUniversities.some((s) => s.universityId === universityId);
  };

  const addBookmarkedScholarship = async (scholarshipId: string, universityId: string) => {
    try {
      const newBookmark: BookmarkedScholarship = {
        scholarshipId,
        universityId,
        bookmarkedAt: new Date().toISOString(),
      };
      const updated = [...bookmarkedScholarships, newBookmark];
      setBookmarkedScholarships(updated);
      await AsyncStorage.setItem(STORAGE_KEYS.BOOKMARKED_SCHOLARSHIPS, JSON.stringify(updated));
    } catch (error) {
      console.error("Error bookmarking scholarship:", error);
    }
  };

  const removeBookmarkedScholarship = async (scholarshipId: string) => {
    try {
      const updated = bookmarkedScholarships.filter((b) => b.scholarshipId !== scholarshipId);
      setBookmarkedScholarships(updated);
      await AsyncStorage.setItem(STORAGE_KEYS.BOOKMARKED_SCHOLARSHIPS, JSON.stringify(updated));
    } catch (error) {
      console.error("Error removing bookmarked scholarship:", error);
    }
  };

  const isBookmarked = (scholarshipId: string) => {
    return bookmarkedScholarships.some((b) => b.scholarshipId === scholarshipId);
  };

  const addToComparison = async (universityId: string) => {
    try {
      if (comparisonState.selectedUniversities.length < 3 && !comparisonState.selectedUniversities.includes(universityId)) {
        const updated = {
          selectedUniversities: [...comparisonState.selectedUniversities, universityId],
        };
        setComparisonState(updated);
        await AsyncStorage.setItem(STORAGE_KEYS.COMPARISON_STATE, JSON.stringify(updated));
      }
    } catch (error) {
      console.error("Error adding to comparison:", error);
    }
  };

  const removeFromComparison = async (universityId: string) => {
    try {
      const updated = {
        selectedUniversities: comparisonState.selectedUniversities.filter((id) => id !== universityId),
      };
      setComparisonState(updated);
      await AsyncStorage.setItem(STORAGE_KEYS.COMPARISON_STATE, JSON.stringify(updated));
    } catch (error) {
      console.error("Error removing from comparison:", error);
    }
  };

  const clearComparison = async () => {
    try {
      const updated = { selectedUniversities: [] };
      setComparisonState(updated);
      await AsyncStorage.setItem(STORAGE_KEYS.COMPARISON_STATE, JSON.stringify(updated));
    } catch (error) {
      console.error("Error clearing comparison:", error);
    }
  };

  const toggleChecklistItem = async (itemId: string) => {
    try {
      const updated = checklist.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      setChecklist(updated);
      await AsyncStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(updated));
    } catch (error) {
      console.error("Error toggling checklist item:", error);
    }
  };

  const completeOnboarding = async () => {
    try {
      const updated = { completed: true };
      setOnboardingState(updated);
      await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_STATE, JSON.stringify(updated));
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  const value: AppContextType = {
    savedUniversities,
    addSavedUniversity,
    removeSavedUniversity,
    isSaved,
    bookmarkedScholarships,
    addBookmarkedScholarship,
    removeBookmarkedScholarship,
    isBookmarked,
    comparisonState,
    addToComparison,
    removeFromComparison,
    clearComparison,
    checklist,
    toggleChecklistItem,
    onboardingState,
    completeOnboarding,
    isLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
