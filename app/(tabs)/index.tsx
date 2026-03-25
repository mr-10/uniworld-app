import React from "react";
import { ScrollView, Text, View, Pressable, Linking } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/lib/context/auth-context";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const { user } = useAuth();

  const features = [
    {
      icon: "search",
      title: "Explore Universities",
      description: "Search and filter 1050+ universities worldwide",
    },
    {
      icon: "star",
      title: "High Acceptance Filter",
      description: "Find universities with 35%+ acceptance rates",
    },
    {
      icon: "bookmark",
      title: "Save Your List",
      description: "Bookmark favorite universities for later",
    },
    {
      icon: "mail",
      title: "Auto-Fill Emails",
      description: "Pre-filled inquiry templates with your info",
    },
    {
      icon: "calendar",
      title: "Deadline Tracker",
      description: "Never miss an application deadline",
    },
    {
      icon: "gift",
      title: "Scholarship Finder",
      description: "Discover 1600+ scholarships worldwide",
    },
  ];

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero Section */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            gap: 16,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: colors.primary,
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <Ionicons name="school" size={44} color="white" />
          </View>

          <View style={{ alignItems: "center", gap: 8 }}>
            <Text style={{ fontSize: 32, fontWeight: "700", color: colors.foreground, textAlign: "center" }}>
              Welcome, {user?.name.split(" ")[0]}!
            </Text>
            <Text style={{ fontSize: 16, color: colors.muted, textAlign: "center" }}>
              Your Global University Discovery Assistant
            </Text>
          </View>

          {/* Quick Stats */}
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              marginTop: 8,
              width: "100%",
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 12,
                alignItems: "center",
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "700", color: colors.primary }}>
                1050+
              </Text>
              <Text style={{ fontSize: 11, color: colors.muted, marginTop: 4 }}>
                Universities
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 12,
                alignItems: "center",
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "700", color: colors.success }}>
                1600+
              </Text>
              <Text style={{ fontSize: 11, color: colors.muted, marginTop: 4 }}>
                Scholarships
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 12,
                alignItems: "center",
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "700", color: colors.accent }}>
                40+
              </Text>
              <Text style={{ fontSize: 11, color: colors.muted, marginTop: 4 }}>
                Countries
              </Text>
            </View>
          </View>
        </View>

        {/* Features Grid */}
        <View style={{ paddingHorizontal: 16, gap: 12, marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.foreground, marginBottom: 8 }}>
            Key Features
          </Text>
          {features.map((feature, index) => (
            <Pressable
              key={index}
              onPress={() => {
                if (index === 0) router.push("/(tabs)/explore");
                if (index === 2) router.push("/(tabs)/mylist");
                if (index === 4) router.push("/(tabs)/calendar");
                if (index === 5) router.push("/(tabs)/scholarships");
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: "row",
                  gap: 12,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: colors.border,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: colors.primary,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name={feature.icon as any} size={24} color="white" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground }}>
                  {feature.title}
                </Text>
                <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>
                  {feature.description}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.muted} />
            </Pressable>
          ))}
        </View>

        {/* User Profile Card */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.foreground, marginBottom: 12 }}>
            Your Profile
          </Text>
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: 16,
              gap: 12,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontSize: 12, fontWeight: "600", color: colors.muted }}>
                Name
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground }}>
                {user?.name}
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: colors.border,
              }}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontSize: 12, fontWeight: "600", color: colors.muted }}>
                Email
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "600", color: colors.foreground }}>
                {user?.email}
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: colors.border,
              }}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontSize: 12, fontWeight: "600", color: colors.muted }}>
                Phone
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "600", color: colors.foreground }}>
                {user?.phone}
              </Text>
            </View>
            <Pressable
              onPress={() => router.push("/(tabs)/settings")}
              style={({ pressed }) => [
                {
                  marginTop: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  backgroundColor: colors.primary,
                  borderRadius: 8,
                  alignItems: "center",
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text style={{ fontSize: 12, fontWeight: "600", color: "white" }}>
                Edit Profile
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Developer Credit */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: colors.accent,
              borderRadius: 12,
              padding: 20,
              alignItems: "center",
              gap: 12,
            }}
          >
            <Ionicons name="code-slash" size={32} color="white" />
            <View style={{ alignItems: "center", gap: 6 }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: "white", textAlign: "center" }}>
                Built with ❤️ by
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>
                Rakibul Hasan
              </Text>
            </View>
            <Pressable
              onPress={() => Linking.openURL("https://www.facebook.com/youcancallmeRakib/")}
              style={({ pressed }) => [
                {
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: 6,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Ionicons name="logo-facebook" size={16} color="white" />
              <Text style={{ fontSize: 12, fontWeight: "600", color: "white" }}>
                Follow on Facebook
              </Text>
            </Pressable>
          </View>
        </View>

        {/* CTA Button */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Pressable
            onPress={() => router.push("/(tabs)/explore")}
            style={({ pressed }) => [
              {
                backgroundColor: colors.primary,
                paddingVertical: 16,
                borderRadius: 12,
                alignItems: "center",
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: "white" }}>
              Start Exploring Universities
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
