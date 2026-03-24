import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useApp } from "@/lib/context/app-context";
import { useUniversities } from "@/hooks/use-universities";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function MyListScreen() {
  const colors = useColors();
  const router = useRouter();
  const { savedUniversities, removeSavedUniversity } = useApp();
  const { getUniversityById } = useUniversities();

  const renderUniversityCard = ({ item }: { item: any }) => {
    const university = getUniversityById(item.universityId);
    if (!university) return null;

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
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground, marginBottom: 4 }}>
              {university.name}
            </Text>
            <Text style={{ fontSize: 13, color: colors.muted }}>
              {university.country} • #{university.ranking}
            </Text>
          </View>
          <Pressable
            onPress={() => removeSavedUniversity(university.id)}
            style={{ padding: 8 }}
          >
            <Ionicons name="close" size={20} color={colors.error} />
          </Pressable>
        </View>

        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable
            onPress={() => router.push({ pathname: "/university-detail", params: { id: university.id } })}
            style={({ pressed }) => [
              {
                flex: 1,
                backgroundColor: colors.primary,
                paddingVertical: 8,
                borderRadius: 6,
                alignItems: "center",
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text style={{ fontSize: 12, fontWeight: "600", color: "white" }}>View Details</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                flex: 1,
                backgroundColor: colors.accent,
                paddingVertical: 8,
                borderRadius: 6,
                alignItems: "center",
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text style={{ fontSize: 12, fontWeight: "600", color: "white" }}>Draft Email</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      {savedUniversities.length === 0 ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="heart-outline" size={48} color={colors.muted} />
          <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground, marginTop: 12 }}>
            No saved universities
          </Text>
          <Text style={{ fontSize: 14, color: colors.muted, marginTop: 4 }}>
            Save universities from Explore to see them here
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedUniversities}
          renderItem={renderUniversityCard}
          keyExtractor={(item) => item.universityId}
          contentContainerStyle={{ paddingVertical: 12, paddingBottom: 80 }}
        />
      )}
    </ScreenContainer>
  );
}
