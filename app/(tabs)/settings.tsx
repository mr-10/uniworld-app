import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/lib/context/auth-context";
import { useColors } from "@/hooks/use-colors";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const colors = useColors();
  const { user, updateProfile, logout } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user]);

  const handleSave = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    try {
      setIsSaving(true);
      await updateProfile(name, email, phone);
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
          } catch (error) {
            Alert.alert("Error", "Failed to logout");
          }
        },
      },
    ]);
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }}>
        {/* Header */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 28, fontWeight: "700", color: colors.foreground }}>
            Settings
          </Text>
          <Text style={{ fontSize: 14, color: colors.muted }}>
            Manage your profile and preferences
          </Text>
        </View>

        {/* Profile Section */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 16,
            gap: 16,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: colors.foreground }}>
              Profile Information
            </Text>
            <Pressable
              onPress={() => setIsEditing(!isEditing)}
              style={({ pressed }) => [
                {
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                  backgroundColor: isEditing ? colors.error : colors.accent,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text style={{ fontSize: 12, fontWeight: "600", color: "white" }}>
                {isEditing ? "Cancel" : "Edit"}
              </Text>
            </Pressable>
          </View>

          {/* Name Field */}
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 12, fontWeight: "600", color: colors.muted }}>
              Your Name
            </Text>
            <TextInput
              style={{
                backgroundColor: isEditing ? colors.background : colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                fontSize: 14,
                color: colors.foreground,
              }}
              placeholder="Enter your full name"
              placeholderTextColor={colors.muted}
              value={name}
              onChangeText={setName}
              editable={isEditing}
            />
          </View>

          {/* Email Field */}
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 12, fontWeight: "600", color: colors.muted }}>
              Email Address
            </Text>
            <TextInput
              style={{
                backgroundColor: isEditing ? colors.background : colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                fontSize: 14,
                color: colors.foreground,
              }}
              placeholder="Enter your email"
              placeholderTextColor={colors.muted}
              value={email}
              onChangeText={setEmail}
              editable={isEditing}
              keyboardType="email-address"
            />
          </View>

          {/* Phone Field */}
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 12, fontWeight: "600", color: colors.muted }}>
              Phone Number
            </Text>
            <TextInput
              style={{
                backgroundColor: isEditing ? colors.background : colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                fontSize: 14,
                color: colors.foreground,
              }}
              placeholder="Enter your phone number"
              placeholderTextColor={colors.muted}
              value={phone}
              onChangeText={setPhone}
              editable={isEditing}
              keyboardType="phone-pad"
            />
          </View>

          {/* Save Button */}
          {isEditing && (
            <Pressable
              onPress={handleSave}
              disabled={isSaving}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.primary,
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: "center",
                  opacity: pressed || isSaving ? 0.8 : 1,
                },
              ]}
            >
              <Text style={{ fontSize: 14, fontWeight: "600", color: "white" }}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Text>
            </Pressable>
          )}
        </View>

        {/* Info Section */}
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
          <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 8 }}>
            How This Works
          </Text>
          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: colors.primary,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "600", fontSize: 12 }}>1</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: "600", color: colors.foreground }}>
                  Fill Your Information
                </Text>
                <Text style={{ fontSize: 11, color: colors.muted, marginTop: 2 }}>
                  Your name, email, and phone number will be saved
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: colors.primary,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "600", fontSize: 12 }}>2</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: "600", color: colors.foreground }}>
                  Auto-Fill Email Templates
                </Text>
                <Text style={{ fontSize: 11, color: colors.muted, marginTop: 2 }}>
                  When you view a university, your info auto-fills in inquiry emails
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: colors.primary,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "600", fontSize: 12 }}>3</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: "600", color: colors.foreground }}>
                  Copy & Send
                </Text>
                <Text style={{ fontSize: 11, color: colors.muted, marginTop: 2 }}>
                  Copy the pre-filled email and send it to the university
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Developer Credit */}
        <View
          style={{
            backgroundColor: colors.accent,
            borderRadius: 12,
            padding: 16,
            gap: 8,
            alignItems: "center",
          }}
        >
          <Ionicons name="code-slash" size={24} color="white" />
          <Text style={{ fontSize: 12, fontWeight: "600", color: "white", textAlign: "center" }}>
            Built with ❤️ by Rakibul Hasan
          </Text>
          <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", textAlign: "center" }}>
            Follow on Facebook: youcancallmeRakib
          </Text>
        </View>

        {/* Logout Button */}
        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [
            {
              backgroundColor: colors.error,
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: "center",
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Text style={{ fontSize: 14, fontWeight: "600", color: "white" }}>
            Logout
          </Text>
        </Pressable>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ScreenContainer>
  );
}
