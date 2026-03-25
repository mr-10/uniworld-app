import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/lib/context/auth-context";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SignupScreen() {
  const colors = useColors();
  const router = useRouter();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    if (phone.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    try {
      setIsLoading(true);
      await signup(name, email, phone);
      Alert.alert("Success", "Account created! Welcome to UniWorld");
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Failed to create account");
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
            UniWorld
          </Text>
          <Text style={{ fontSize: 14, color: colors.muted, textAlign: "center" }}>
            Your Global University Discovery Assistant
          </Text>
        </View>

        {/* Form */}
        <View style={{ gap: 16 }}>
          {/* Name Input */}
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 12, fontWeight: "600", color: colors.muted }}>
              Full Name
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
              <Ionicons name="person" size={20} color={colors.muted} />
              <TextInput
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                  fontSize: 14,
                  color: colors.foreground,
                }}
                placeholder="John Doe"
                placeholderTextColor={colors.muted}
                value={name}
                onChangeText={setName}
                editable={!isLoading}
              />
            </View>
          </View>

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

          {/* Phone Input */}
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 12, fontWeight: "600", color: colors.muted }}>
              Phone Number
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
              <Ionicons name="call" size={20} color={colors.muted} />
              <TextInput
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                  fontSize: 14,
                  color: colors.foreground,
                }}
                placeholder="+1 (555) 123-4567"
                placeholderTextColor={colors.muted}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                editable={!isLoading}
              />
            </View>
          </View>
        </View>

        {/* Signup Button */}
        <Pressable
          onPress={handleSignup}
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
            {isLoading ? "Creating Account..." : "Create Account"}
          </Text>
        </Pressable>

        {/* Login Link */}
        <View style={{ flexDirection: "row", justifyContent: "center", gap: 4 }}>
          <Text style={{ fontSize: 14, color: colors.muted }}>Already have an account?</Text>
          <Pressable onPress={() => router.push("/auth/login")}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.primary }}>
              Login
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
