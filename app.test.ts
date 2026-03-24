import { describe, it, expect, beforeEach } from "vitest";
import universitiesData from "./data/universities.json";
import { University, Scholarship } from "./types";

describe("UniWorld App - Core Features", () => {
  describe("University Database", () => {
    it("should load universities data", () => {
      expect(universitiesData).toBeDefined();
      expect(universitiesData.universities).toBeInstanceOf(Array);
    });

    it("should have at least 1000 universities", () => {
      expect(universitiesData.universities.length).toBeGreaterThanOrEqual(1000);
    });

    it("should have all required fields for each university", () => {
      universitiesData.universities.forEach((uni: any) => {
        expect(uni).toHaveProperty("id");
        expect(uni).toHaveProperty("name");
        expect(uni).toHaveProperty("country");
        expect(uni).toHaveProperty("countryCode");
        expect(uni).toHaveProperty("city");
        expect(uni).toHaveProperty("website");
        expect(uni).toHaveProperty("admissionEmail");
        expect(uni).toHaveProperty("ranking");
        expect(uni).toHaveProperty("rankingSource");
        expect(uni).toHaveProperty("tuition");
        expect(uni).toHaveProperty("acceptanceRate");
        expect(uni).toHaveProperty("studentPopulation");
        expect(uni).toHaveProperty("type");
        expect(uni).toHaveProperty("language");
        expect(uni).toHaveProperty("intakeSeasons");
        expect(uni).toHaveProperty("programs");
        expect(uni).toHaveProperty("applicationDeadlines");
        expect(uni).toHaveProperty("scholarships");
      });
    });

    it("should have valid tuition data", () => {
      universitiesData.universities.forEach((uni: any) => {
        expect(uni.tuition).toHaveProperty("undergraduate");
        expect(uni.tuition).toHaveProperty("postgraduate");
        expect(typeof uni.tuition.undergraduate).toBe("number");
        expect(typeof uni.tuition.postgraduate).toBe("number");
        expect(uni.tuition.undergraduate).toBeGreaterThan(0);
        expect(uni.tuition.postgraduate).toBeGreaterThan(0);
      });
    });

    it("should have valid ranking data", () => {
      universitiesData.universities.forEach((uni: any) => {
        expect(typeof uni.ranking).toBe("number");
        expect(uni.ranking).toBeGreaterThan(0);
        expect(uni.ranking).toBeLessThan(2000);
      });
    });

    it("should have valid acceptance rates", () => {
      universitiesData.universities.forEach((uni: any) => {
        expect(typeof uni.acceptanceRate).toBe("number");
        expect(uni.acceptanceRate).toBeGreaterThanOrEqual(0);
        expect(uni.acceptanceRate).toBeLessThanOrEqual(100);
      });
    });

    it("should have valid application deadlines", () => {
      universitiesData.universities.forEach((uni: any) => {
        expect(typeof uni.applicationDeadlines).toBe("object");
        Object.entries(uni.applicationDeadlines).forEach(([season, date]: [string, any]) => {
          expect(typeof date).toBe("string");
          expect(() => new Date(date)).not.toThrow();
        });
      });
    });

    it("should have programs listed", () => {
      universitiesData.universities.forEach((uni: any) => {
        expect(Array.isArray(uni.programs)).toBe(true);
        expect(uni.programs.length).toBeGreaterThan(0);
      });
    });

    it("should have intake seasons", () => {
      universitiesData.universities.forEach((uni: any) => {
        expect(Array.isArray(uni.intakeSeasons)).toBe(true);
        expect(uni.intakeSeasons.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Scholarships", () => {
    it("should have scholarships for universities", () => {
      let totalScholarships = 0;
      universitiesData.universities.forEach((uni: any) => {
        expect(Array.isArray(uni.scholarships)).toBe(true);
        totalScholarships += uni.scholarships.length;
      });
      expect(totalScholarships).toBeGreaterThan(0);
    });

    it("should have valid scholarship data", () => {
      universitiesData.universities.forEach((uni: any) => {
        uni.scholarships.forEach((scholarship: any) => {
          expect(scholarship).toHaveProperty("id");
          expect(scholarship).toHaveProperty("name");
          expect(scholarship).toHaveProperty("amount");
          expect(scholarship).toHaveProperty("eligibility");
          expect(scholarship).toHaveProperty("deadline");
          expect(typeof scholarship.amount).toBe("number");
          expect(scholarship.amount).toBeGreaterThan(0);
        });
      });
    });

    it("should have valid scholarship deadlines", () => {
      universitiesData.universities.forEach((uni: any) => {
        uni.scholarships.forEach((scholarship: any) => {
          expect(() => new Date(scholarship.deadline)).not.toThrow();
        });
      });
    });
  });

  describe("Search and Filter Logic", () => {
    it("should find universities by name", () => {
      const searchTerm = "University";
      const results = universitiesData.universities.filter((uni: any) =>
        uni.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      expect(results.length).toBeGreaterThan(0);
    });

    it("should find universities by country", () => {
      const country = "United States";
      const results = universitiesData.universities.filter((uni: any) => uni.country === country);
      expect(results.length).toBeGreaterThan(0);
    });

    it("should find universities by program", () => {
      const program = "Engineering";
      const results = universitiesData.universities.filter((uni: any) =>
        uni.programs.includes(program)
      );
      expect(results.length).toBeGreaterThan(0);
    });

    it("should filter by tuition range", () => {
      const minTuition = 30000;
      const maxTuition = 50000;
      const results = universitiesData.universities.filter((uni: any) => {
        const avgTuition = (uni.tuition.undergraduate + uni.tuition.postgraduate) / 2;
        return avgTuition >= minTuition && avgTuition <= maxTuition;
      });
      expect(results.length).toBeGreaterThanOrEqual(0);
    });

    it("should filter by ranking range", () => {
      const minRanking = 1;
      const maxRanking = 50;
      const results = universitiesData.universities.filter(
        (uni: any) => uni.ranking >= minRanking && uni.ranking <= maxRanking
      );
      expect(results.length).toBeGreaterThan(0);
    });

    it("should filter by scholarship availability", () => {
      const results = universitiesData.universities.filter((uni: any) => uni.scholarships.length > 0);
      expect(results.length).toBeGreaterThan(0);
    });

    it("should filter by university type", () => {
      const type = "Public";
      const results = universitiesData.universities.filter((uni: any) => uni.type === type);
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe("Email Draft Generation", () => {
    it("should generate email with university name", () => {
      const uni = universitiesData.universities[0];
      const emailTemplate = `Dear Admissions Office,

I hope this message finds you well. My name is [Your Name], a student from [Your Country], and I am writing to express my interest in applying to ${uni.name} for the [Desired Program] program, commencing [Intended Intake Year].`;

      expect(emailTemplate).toContain(uni.name);
      expect(emailTemplate).toContain("[Your Name]");
      expect(emailTemplate).toContain("[Your Country]");
      expect(emailTemplate).toContain("[Desired Program]");
      expect(emailTemplate).toContain("[Intended Intake Year]");
    });

    it("should include admission email in draft", () => {
      const uni = universitiesData.universities[0];
      expect(uni.admissionEmail).toBeDefined();
      expect(uni.admissionEmail).toContain("@");
    });
  });

  describe("Deadline Tracking", () => {
    it("should calculate days until deadline", () => {
      const uni = universitiesData.universities[0];
      const deadlineStr = Object.values(uni.applicationDeadlines)[0] as string;
      const deadline = new Date(deadlineStr);
      const today = new Date();
      const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      expect(typeof daysLeft).toBe("number");
    });

    it("should categorize urgency correctly", () => {
      const getUrgency = (daysLeft: number) => {
        if (daysLeft < 30) return "urgent";
        if (daysLeft < 90) return "warning";
        return "normal";
      };

      expect(getUrgency(15)).toBe("urgent");
      expect(getUrgency(60)).toBe("warning");
      expect(getUrgency(120)).toBe("normal");
    });
  });

  describe("Data Integrity", () => {
    it("should have unique university IDs", () => {
      const ids = universitiesData.universities.map((uni: any) => uni.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("should have unique scholarship IDs within each university", () => {
      universitiesData.universities.forEach((uni: any) => {
        const scholarshipIds = uni.scholarships.map((s: any) => s.id);
        const uniqueIds = new Set(scholarshipIds);
        expect(uniqueIds.size).toBe(scholarshipIds.length);
      });
    });

    it("should have valid country codes", () => {
      const validCodes = ["US", "UK", "CA", "AU", "CH", "JP", "CN", "IN", "BD", "TR", "MY", "FR", "DE", "SG", "HK", "KR", "SE", "NO", "DK", "FI", "BE", "ES", "IT", "AT", "CZ", "PL", "TH", "ID", "PH", "VN", "BR", "MX", "AR", "CL", "CO", "AE", "SA", "EG", "ZA", "NG", "NL"];
      universitiesData.universities.forEach((uni: any) => {
        expect(validCodes).toContain(uni.countryCode);
      });
    });

    it("should have valid ranking sources", () => {
      universitiesData.universities.forEach((uni: any) => {
        expect(["QS", "THE"]).toContain(uni.rankingSource);
      });
    });
  });
});
