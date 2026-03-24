import React, { useState, useCallback, useMemo } from "react";
import { View, Text, FlatList, Pressable, TextInput, ScrollView } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useUniversities } from "@/hooks/use-universities";
import { useApp } from "@/lib/context/app-context";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ExploreScreen() {
  const router = useRouter();
  const colors = useColors();
  const { universities, searchUniversities, filterUniversities } = useUniversities();
  const { isSaved } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    countries: [] as string[],
    tuitionRange: [0, 60000] as [number, number],
    scholarshipsOnly: false,
    rankingRange: [1, 1000] as [number, number],
    programs: [] as string[],
    languages: [] as string[],
    intakeSeasons: [] as string[],
    types: [] as string[],
    acceptanceRateRange: [0, 100] as [number, number],
    highAcceptanceOnly: false,
  });

  const filteredUniversities = useMemo(() => {
    let results = searchUniversities(searchQuery);
    results = filterUniversities(filters);
    return results;
  }, [searchQuery, filters, searchUniversities, filterUniversities]);

  const handleUniversityPress = (universityId: string) => {
    router.push({
      pathname: "/university-detail",
      params: { id: universityId },
    });
  };

  const toggleCountryFilter = (country: string) => {
    setFilters((prev) => ({
      ...prev,
      countries: prev.countries.includes(country)
        ? prev.countries.filter((c) => c !== country)
        : [...prev.countries, country],
    }));
  };

  const toggleScholarshipsOnly = () => {
    setFilters((prev) => ({
      ...prev,
      scholarshipsOnly: !prev.scholarshipsOnly,
    }));
  };

  const toggleHighAcceptanceOnly = () => {
    setFilters((prev) => ({
      ...prev,
      highAcceptanceOnly: !prev.highAcceptanceOnly,
      acceptanceRateRange: !prev.highAcceptanceOnly ? [35, 100] : [0, 100],
    }));
  };

  const renderUniversityCard = ({ item }: { item: any }) => {
    const saved = isSaved(item.id);
    const scholarshipCount = item.scholarships?.length || 0;
    const isHighAcceptance = item.acceptanceRate > 35;

    return (
      <Pressable
        onPress={() => handleUniversityPress(item.id)}
        style={({ pressed }) => [
          {
            backgroundColor: colors.surface,
            marginHorizontal: 16,
            marginVertical: 8,
            borderRadius: 12,
            padding: 12,
            borderWidth: 1,
            borderColor: isHighAcceptance ? colors.success : colors.border,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground, marginBottom: 4 }}>
              {item.name}
            </Text>
            <Text style={{ fontSize: 13, color: colors.muted, marginBottom: 8 }}>
              {item.country} • {item.city}
            </Text>
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
              <View
                style={{
                  backgroundColor: colors.primary,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 6,
                }}
              >
                <Text style={{ fontSize: 12, color: "white", fontWeight: "600" }}>
                  #{item.ranking}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: isHighAcceptance ? colors.success : colors.accent,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 6,
                }}
              >
                <Text style={{ fontSize: 12, color: "white", fontWeight: "600" }}>
                  {item.acceptanceRate}% {isHighAcceptance ? "✓" : ""}
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: 12, color: colors.muted }}>
              ${item.tuition.undergraduate.toLocaleString()}/yr • {scholarshipCount} scholarships
            </Text>
          </View>
          <Pressable
            style={{ padding: 8 }}
            onPress={() => {
              // Handle bookmark
            }}
          >
            <Ionicons
              name={saved ? "heart" : "heart-outline"}
              size={24}
              color={saved ? colors.error : colors.muted}
            />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      <View style={{ paddingHorizontal: 16, paddingVertical: 12, gap: 12 }}>
        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.surface,
            borderRadius: 8,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Ionicons name="search" size={20} color={colors.muted} />
          <TextInput
            style={{
              flex: 1,
              paddingVertical: 10,
              paddingHorizontal: 8,
              fontSize: 14,
              color: colors.foreground,
            }}
            placeholder="Search universities..."
            placeholderTextColor={colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Toggle */}
        <Pressable
          onPress={() => setShowFilters(!showFilters)}
          style={({ pressed }) => [
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 12,
              paddingVertical: 8,
              backgroundColor: colors.accent,
              borderRadius: 8,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Text style={{ fontSize: 14, fontWeight: "600", color: "white" }}>
            Filters ({filteredUniversities.length})
          </Text>
          <Ionicons
            name={showFilters ? "chevron-up" : "chevron-down"}
            size={20}
            color="white"
          />
        </Pressable>

        {/* Quick Filters */}
        {showFilters && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 8 }}
            contentContainerStyle={{ gap: 8, paddingRight: 16 }}
          >
            <Pressable
              onPress={toggleScholarshipsOnly}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                backgroundColor: filters.scholarshipsOnly ? colors.accent : colors.surface,
                borderWidth: 1,
                borderColor: filters.scholarshipsOnly ? colors.accent : colors.border,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: filters.scholarshipsOnly ? "white" : colors.foreground,
                }}
              >
                Has Scholarships
              </Text>
            </Pressable>

            <Pressable
              onPress={toggleHighAcceptanceOnly}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                backgroundColor: filters.highAcceptanceOnly ? colors.success : colors.surface,
                borderWidth: 1,
                borderColor: filters.highAcceptanceOnly ? colors.success : colors.border,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: filters.highAcceptanceOnly ? "white" : colors.foreground,
                }}
              >
                High Acceptance (35%+)
              </Text>
            </Pressable>
          </ScrollView>
        )}
      </View>

      {/* Results */}
      <FlatList
        data={filteredUniversities}
        renderItem={renderUniversityCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text style={{ fontSize: 16, color: colors.muted }}>
              No universities found
            </Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}
