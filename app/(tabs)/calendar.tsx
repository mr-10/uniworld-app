import React from "react";
import { View, Text, ScrollView } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useApp } from "@/lib/context/app-context";
import { useUniversities } from "@/hooks/use-universities";
import { Ionicons } from "@expo/vector-icons";

export default function CalendarScreen() {
  const colors = useColors();
  const { savedUniversities } = useApp();
  const { getUniversityById } = useUniversities();

  // Collect all deadlines from saved universities
  const deadlines: Array<{ date: string; university: string; daysLeft: number }> = [];

  savedUniversities.forEach((saved) => {
    const uni = getUniversityById(saved.universityId);
    if (uni) {
      Object.entries(uni.applicationDeadlines).forEach(([season, dateStr]) => {
        const deadline = new Date(dateStr);
        const today = new Date();
        const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        deadlines.push({
          date: dateStr,
          university: uni.name,
          daysLeft,
        });
      });
    }
  });

  // Sort by date
  deadlines.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getUrgencyColor = (daysLeft: number) => {
    if (daysLeft < 30) return colors.error;
    if (daysLeft < 90) return colors.warning;
    return colors.success;
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: colors.foreground, marginBottom: 12 }}>
          Application Deadlines
        </Text>
      </View>

      {deadlines.length === 0 ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="calendar-outline" size={48} color={colors.muted} />
          <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground, marginTop: 12 }}>
            No deadlines yet
          </Text>
          <Text style={{ fontSize: 14, color: colors.muted, marginTop: 4 }}>
            Save universities to track deadlines
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 16, paddingBottom: 80 }}>
          {deadlines.map((deadline, idx) => (
            <View
              key={idx}
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 12,
                marginBottom: 8,
                borderLeftWidth: 4,
                borderLeftColor: getUrgencyColor(deadline.daysLeft),
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4 }}>
                    {deadline.university}
                  </Text>
                  <Text style={{ fontSize: 13, color: colors.muted }}>
                    {new Date(deadline.date).toLocaleDateString()}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: getUrgencyColor(deadline.daysLeft),
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: "600", color: "white" }}>
                    {deadline.daysLeft > 0 ? `${deadline.daysLeft}d` : "Due"}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </ScreenContainer>
  );
}
