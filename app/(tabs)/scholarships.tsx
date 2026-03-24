import React, { useMemo } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useUniversities } from "@/hooks/use-universities";
import { useApp } from "@/lib/context/app-context";
import { Ionicons } from "@expo/vector-icons";

export default function ScholarshipsScreen() {
  const colors = useColors();
  const { universities } = useUniversities();
  const { isBookmarked, addBookmarkedScholarship, removeBookmarkedScholarship } = useApp();

  // Collect all scholarships from all universities
  const allScholarships = useMemo(() => {
    const scholarships: Array<any> = [];
    universities.forEach((uni) => {
      uni.scholarships.forEach((scholarship) => {
        scholarships.push({
          ...scholarship,
          universityId: uni.id,
          universityName: uni.name,
          country: uni.country,
        });
      });
    });

    // Sort by deadline (upcoming first)
    return scholarships.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  }, [universities]);

  const getUrgencyColor = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysLeft < 30) return colors.error;
    if (daysLeft < 90) return colors.warning;
    return colors.success;
  };

  const getDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const renderScholarshipCard = ({ item }: { item: any }) => {
    const bookmarked = isBookmarked(item.id);
    const daysLeft = getDaysLeft(item.deadline);

    return (
      <View
        style={{
          backgroundColor: colors.surface,
          marginHorizontal: 16,
          marginVertical: 8,
          borderRadius: 12,
          padding: 12,
          borderWidth: 1,
          borderColor: colors.border,
          borderLeftWidth: 4,
          borderLeftColor: getUrgencyColor(item.deadline),
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4 }}>
              {item.name}
            </Text>
            <Text style={{ fontSize: 12, color: colors.muted }}>
              {item.universityName} • {item.country}
            </Text>
          </View>
          <Pressable
            onPress={() => {
              if (bookmarked) {
                removeBookmarkedScholarship(item.id);
              } else {
                addBookmarkedScholarship(item.id, item.universityId);
              }
            }}
            style={{ padding: 4 }}
          >
            <Ionicons
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={20}
              color={bookmarked ? colors.accent : colors.muted}
            />
          </Pressable>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: "700", color: colors.accent }}>
            ${item.amount.toLocaleString()}
          </Text>
          <View
            style={{
              backgroundColor: getUrgencyColor(item.deadline),
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 6,
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: "600", color: "white" }}>
              {daysLeft > 0 ? `${daysLeft} days left` : "Due"}
            </Text>
          </View>
        </View>

        <Text style={{ fontSize: 12, color: colors.muted }}>
          Deadline: {new Date(item.deadline).toLocaleDateString()}
        </Text>
        <Text style={{ fontSize: 11, color: colors.muted, marginTop: 4 }}>
          {item.eligibility}
        </Text>
      </View>
    );
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: colors.foreground }}>
          Scholarships
        </Text>
        <Text style={{ fontSize: 13, color: colors.muted, marginTop: 4 }}>
          {allScholarships.length} scholarships available
        </Text>
      </View>

      {allScholarships.length === 0 ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="school-outline" size={48} color={colors.muted} />
          <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground, marginTop: 12 }}>
            No scholarships found
          </Text>
        </View>
      ) : (
        <FlatList
          data={allScholarships}
          renderItem={renderScholarshipCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 8, paddingBottom: 80 }}
        />
      )}
    </ScreenContainer>
  );
}
