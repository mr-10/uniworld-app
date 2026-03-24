import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useApp } from "@/lib/context/app-context";
import { Ionicons } from "@expo/vector-icons";

export default function ChecklistScreen() {
  const colors = useColors();
  const { checklist, toggleChecklistItem } = useApp();

  const completedCount = checklist.filter((item) => item.completed).length;
  const totalCount = checklist.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const renderChecklistItem = ({ item }: { item: any }) => (
    <Pressable
      onPress={() => toggleChecklistItem(item.id)}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.surface,
          borderRadius: 8,
          padding: 12,
          marginBottom: 8,
          borderWidth: 1,
          borderColor: item.completed ? colors.success : colors.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 6,
          backgroundColor: item.completed ? colors.success : colors.border,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
        }}
      >
        {item.completed && <Ionicons name="checkmark" size={16} color="white" />}
      </View>
      <Text
        style={{
          flex: 1,
          fontSize: 14,
          fontWeight: "500",
          color: item.completed ? colors.muted : colors.foreground,
          textDecorationLine: item.completed ? "line-through" : "none",
        }}
      >
        {item.name}
      </Text>
    </Pressable>
  );

  return (
    <ScreenContainer className="flex-1 bg-background">
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: colors.foreground, marginBottom: 12 }}>
          Application Documents
        </Text>

        {/* Progress Bar */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground }}>
              Progress
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.accent }}>
              {completedCount}/{totalCount}
            </Text>
          </View>
          <View
            style={{
              height: 8,
              backgroundColor: colors.border,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                width: `${progressPercent}%`,
                backgroundColor: colors.accent,
              }}
            />
          </View>
          <Text style={{ fontSize: 12, color: colors.muted, marginTop: 8 }}>
            {progressPercent}% complete
          </Text>
        </View>
      </View>

      <FlatList
        data={checklist}
        renderItem={renderChecklistItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
      />
    </ScreenContainer>
  );
}
