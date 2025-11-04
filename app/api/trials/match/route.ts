import { findMatchingTrials, type PatientProfile, type TrialProfile } from "@/lib/matching-engine"

// Mock trial database
const mockTrials: TrialProfile[] = [
  {
    id: "1",
    name: "New Diabetes Management Protocol (Phase 3)",
    phase: "Phase 3",
    targetConditions: ["Diabetes", "Type 2 Diabetes"],
    ageRange: { min: 40, max: 75 },
    excludedMedications: ["Insulin Glargine U-100"],
    excludedAllergens: ["Sulfonamides"],
    requiredTimeCommitment: "Moderate (5-10 hours/month)",
    locations: ["San Francisco, CA", "Oakland, CA"],
    description: "Evaluating a new medication for Type 2 diabetes management",
  },
  {
    id: "2",
    name: "Cardiovascular Health Study",
    phase: "Phase 2",
    targetConditions: ["Heart Disease", "Hypertension", "Cardiovascular"],
    ageRange: { min: 45, max: 80 },
    excludedMedications: ["Warfarin"],
    excludedAllergens: ["Aspirin"],
    requiredTimeCommitment: "Moderate (5-10 hours/month)",
    locations: ["Baltimore, MD", "Boston, MA"],
    description: "Long-term study on heart health interventions",
  },
  {
    id: "3",
    name: "Diabetes Prevention Research",
    phase: "Phase 3",
    targetConditions: ["Pre-diabetes", "Diabetes", "Obesity"],
    ageRange: { min: 35, max: 70 },
    excludedMedications: [],
    excludedAllergens: [],
    requiredTimeCommitment: "Minimal (less than 5 hours/month)",
    locations: ["Minneapolis, MN", "Chicago, IL"],
    description: "Testing preventive approaches for pre-diabetes",
  },
  {
    id: "4",
    name: "Alzheimer's Early Detection Study",
    phase: "Phase 2",
    targetConditions: ["Alzheimer's", "Cognitive Decline", "Memory Issues"],
    ageRange: { min: 60, max: 85 },
    excludedMedications: [],
    excludedAllergens: [],
    requiredTimeCommitment: "Substantial (10+ hours/month)",
    locations: ["San Francisco, CA", "Los Angeles, CA"],
    description: "Advanced biomarker testing for early Alzheimer's detection",
  },
  {
    id: "5",
    name: "Arthritis Management Innovation",
    phase: "Phase 3",
    targetConditions: ["Arthritis", "Rheumatoid Arthritis", "Osteoarthritis"],
    ageRange: { min: 50, max: 85 },
    excludedMedications: ["Methotrexate"],
    excludedAllergens: [],
    requiredTimeCommitment: "Moderate (5-10 hours/month)",
    locations: ["New York, NY", "Philadelphia, PA"],
    description: "Testing novel treatment approaches for arthritis",
  },
]

export async function POST(request: Request) {
  try {
    const patientProfile: PatientProfile = await request.json()

    // Find matching trials
    const matches = findMatchingTrials(patientProfile, mockTrials, 10)

    return Response.json({
      success: true,
      matches: matches.map(({ trial, score }) => ({
        ...trial,
        matchScore: score,
      })),
    })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to calculate matches" }, { status: 500 })
  }
}
