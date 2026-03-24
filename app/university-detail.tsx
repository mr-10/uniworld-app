import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput, Share } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUniversities } from "@/hooks/use-universities";
import { useApp } from "@/lib/context/app-context";
import { useColors } from "@/hooks/use-colors";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";

export default function UniversityDetailScreen() {
  const router = useRouter();
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getUniversityById } = useUniversities();
  const { isSaved, addSavedUniversity, removeSavedUniversity, addToComparison } = useApp();

  const [showEmailDraft, setShowEmailDraft] = useState(false);
  const [emailBody, setEmailBody] = useState("");

  const university = id ? getUniversityById(id) : null;
  const saved = university ? isSaved(university.id) : false;

  if (!university) {
    return (
      <ScreenContainer className="flex-1 bg-background items-center justify-center">
        <Text style={{ fontSize: 16, color: colors.muted }}>University not found</Text>
      </ScreenContainer>
    );
  }

  const generateEmailDraft = () => {
    const template = `To: ${university.admissionEmail}
Subject: Inquiry Regarding Admission — [Desired Program]

Dear Admissions Office,

I hope this message finds you well. My name is [Your Name], a student from [Your Country], and I am writing to express my interest in applying to ${university.name} for the [Desired Program] program, commencing [Intended Intake Year].

I would be grateful if you could kindly provide information regarding:
1. Admission requirements and application procedures
2. Available scholarships or financial aid for international students
3. Application deadlines for the upcoming intake

Thank you for your time and I look forward to your response.

Sincerely,
[Your Name]
[Your Email Address]
[Your Phone Number]`;
    setEmailBody(template);
  };

  const handleCopyEmail = async () => {
    await Clipboard.setStringAsync(emailBody);
    alert("Email copied to clipboard!");
  };

  const handleOpenInMail = () => {
    const subject = encodeURIComponent(`Inquiry Regarding Admission — [Desired Program]`);
    const body = encodeURIComponent(emailBody);
    Linking.openURL(`mailto:${university.admissionEmail}?subject=${subject}&body=${body}`);
  };

  const handleSaveUniversity = () => {
    if (saved) {
      removeSavedUniversity(university.id);
    } else {
      addSavedUniversity(university.id);
    }
  };

  const handleAddToComparison = () => {
    addToComparison(university.id);
    alert("Added to comparison!");
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 16,
            paddingVertical: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 28, fontWeight: "700", color: "white", marginBottom: 4 }}>
              {university.name}
            </Text>
            <Text style={{ fontSize: 16, color: "rgba(255,255,255,0.8)" }}>
              {university.country} • {university.city}
            </Text>
          </View>
          <Pressable
            onPress={() => router.back()}
            style={{ padding: 8 }}
          >
            <Ionicons name="close" size={24} color="white" />
          </Pressable>
        </View>

        {/* Quick Stats */}
        <View style={{ flexDirection: "row", paddingHorizontal: 16, paddingVertical: 16, gap: 12 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.surface,
              borderRadius: 8,
              padding: 12,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 4 }}>Ranking</Text>
            <Text style={{ fontSize: 18, fontWeight: "700", color: colors.primary }}>
              #{university.ranking}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.surface,
              borderRadius: 8,
              padding: 12,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 4 }}>Acceptance</Text>
            <Text style={{ fontSize: 18, fontWeight: "700", color: colors.accent }}>
              {university.acceptanceRate}%
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.surface,
              borderRadius: 8,
              padding: 12,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 4 }}>Students</Text>
            <Text style={{ fontSize: 18, fontWeight: "700", color: colors.foreground }}>
              {(university.studentPopulation / 1000).toFixed(0)}k
            </Text>
          </View>
        </View>

        {/* Key Information */}
        <View style={{ paddingHorizontal: 16, gap: 12, marginBottom: 16 }}>
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 8,
              padding: 12,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 4 }}>Admission Email</Text>
            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.primary, marginBottom: 8 }}>
              {university.admissionEmail}
            </Text>
            <Pressable
              onPress={async () => {
                await Clipboard.setStringAsync(university.admissionEmail);
                alert("Email copied!");
              }}
              style={{
                backgroundColor: colors.accent,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 6,
                alignSelf: "flex-start",
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "600", color: "white" }}>Copy Email</Text>
            </Pressable>
          </View>

          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 8,
              padding: 12,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 8 }}>Tuition (USD/year)</Text>
            <Text style={{ fontSize: 14, color: colors.foreground, marginBottom: 4 }}>
              Undergraduate: ${university.tuition.undergraduate.toLocaleString()}
            </Text>
            <Text style={{ fontSize: 14, color: colors.foreground }}>
              Postgraduate: ${university.tuition.postgraduate.toLocaleString()}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 8,
              padding: 12,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 8 }}>Programs Offered</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {university.programs.map((program, idx) => (
                <View
                  key={idx}
                  style={{
                    backgroundColor: colors.primary,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "white", fontWeight: "500" }}>
                    {program}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {university.scholarships.length > 0 && (
            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: 8,
                padding: 12,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 8 }}>
                Available Scholarships
              </Text>
              {university.scholarships.map((scholarship) => (
                <View key={scholarship.id} style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 13, fontWeight: "600", color: colors.foreground }}>
                    {scholarship.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: colors.muted }}>
                    ${scholarship.amount.toLocaleString()} • Deadline: {scholarship.deadline}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={{ paddingHorizontal: 16, gap: 8, marginBottom: 20 }}>
          <Pressable
            onPress={() => {
              generateEmailDraft();
              setShowEmailDraft(true);
            }}
            style={({ pressed }) => [
              {
                backgroundColor: colors.accent,
                paddingVertical: 14,
                borderRadius: 8,
                alignItems: "center",
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>
              Draft Inquiry Email
            </Text>
          </Pressable>

          <Pressable
            onPress={handleSaveUniversity}
            style={({ pressed }) => [
              {
                backgroundColor: saved ? colors.error : colors.surface,
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
                borderWidth: 1,
                borderColor: saved ? colors.error : colors.border,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: saved ? "white" : colors.foreground,
              }}
            >
              {saved ? "Remove from My List" : "Save to My List"}
            </Text>
          </Pressable>

          <Pressable
            onPress={handleAddToComparison}
            style={({ pressed }) => [
              {
                backgroundColor: colors.surface,
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
                borderWidth: 1,
                borderColor: colors.border,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground }}>
              Add to Compare
            </Text>
          </Pressable>

          <Pressable
            onPress={() => Linking.openURL(university.website)}
            style={({ pressed }) => [
              {
                backgroundColor: colors.surface,
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
                borderWidth: 1,
                borderColor: colors.border,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.primary }}>
              Visit Website
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Email Draft Modal */}
      {showEmailDraft && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
            zIndex: 1000,
          }}
        >
          <View
            style={{
              backgroundColor: colors.background,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              maxHeight: "90%",
              paddingTop: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 16,
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "700", color: colors.foreground }}>
                Email Draft
              </Text>
              <Pressable onPress={() => setShowEmailDraft(false)}>
                <Ionicons name="close" size={24} color={colors.foreground} />
              </Pressable>
            </View>

            <ScrollView
              style={{ paddingHorizontal: 16, marginBottom: 12, maxHeight: "60%" }}
              showsVerticalScrollIndicator={false}
            >
              <TextInput
                style={{
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: 12,
                  color: colors.foreground,
                  fontSize: 12,
                  minHeight: 300,
                  textAlignVertical: "top",
                }}
                multiline
                value={emailBody}
                onChangeText={setEmailBody}
              />
            </ScrollView>

            <View style={{ paddingHorizontal: 16, gap: 8, marginBottom: 16 }}>
              <Pressable
                onPress={handleCopyEmail}
                style={({ pressed }) => [
                  {
                    backgroundColor: colors.accent,
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: "center",
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <Text style={{ fontSize: 14, fontWeight: "600", color: "white" }}>
                  Copy Email
                </Text>
              </Pressable>

              <Pressable
                onPress={handleOpenInMail}
                style={({ pressed }) => [
                  {
                    backgroundColor: colors.primary,
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: "center",
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <Text style={{ fontSize: 14, fontWeight: "600", color: "white" }}>
                  Open in Mail App
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </ScreenContainer>
  );
}
