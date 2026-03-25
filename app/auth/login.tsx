import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/lib/context/auth-context";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const colors = useColors();
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    try {
      setIsLoading(true);
      await login(email);
      Alert.alert("Success", "Welcome back!");
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Email not found. Please sign up first.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ padding: 16, gap: 24, justifyContent: "center", minHeight: "100%" }}>
        {/* Header */}
        <View style={{ gap: 8, alignItems: "center" }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="school" size={32} color="white" />
          </View>
          <Text style={{ fontSize: 28, fontWeight: "700", color: colors.foreground, textAlign: "center" }}>
            Welcome Back
          </Text>
          <Text style={{ fontSize: 14, color: colors.muted, textAlign: "center" }}>
            Login to continue exploring universities
          </Text>
        </View>

        {/* Form */}
        <View style={{ gap: 16 }}>
          {/* Email Input */}
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 12, fontWeight: "600", color: colors.muted }}>
              Email Address
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.surface,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: colors.border,
                paddingHorizontal: 12,
              }}
            >
              <Ionicons name="mail" size={20} color={colors.muted} />
              <TextInput
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                  fontSize: 14,
                  color: colors.foreground,
                }}
                placeholder="john@example.com"
                placeholderTextColor={colors.muted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                editable={!isLoading}
              />
            </View>
          </View>
        </View>

        {/* Login Button */}
        <Pressable
          onPress={handleLogin}
          disabled={isLoading}
          style={({ pressed }) => [
            {
              backgroundColor: colors.primary,
              paddingVertical: 14,
              borderRadius: 8,
              alignItems: "center",
              opacity: pressed || isLoading ? 0.8 : 1,
            },
          ]}
        >
          <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>
            {isLoading ? "Logging in..." : "Login"}
          </Text>
        </Pressable>

        {/* Signup Link */}
        <View style={{ flexDirection: "row", justifyContent: "center", gap: 4 }}>
          <Text style={{ fontSize: 14, color: colors.muted }}>Don't have an account?</Text>
          <Pressable onPress={() => router.push("/auth/signup")}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.primary }}>
              Sign Up
            </Text>
          </Pressable>
        </View>

        {/* Developer Credit */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 12,
            alignItems: "center",
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ fontSize: 11, color: colors.muted, textAlign: "center" }}>
            Built with ❤️ by Rakibul Hasan
          </Text>
          <Text style={{ fontSize: 10, color: colors.muted, marginTop: 4 }}>
            facebook.com/youcancallmeRakib
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
