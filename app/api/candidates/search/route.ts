import { findMatchingPatients, type PatientProfile, type TrialProfile } from "@/lib/matching-engine"

// Mock patient database
const mockPatients: PatientProfile[] = [
  {
    age: 48,
    conditions: ["Type 2 Diabetes"],
    medications: ["Metformin 1000mg", "Lisinopril 10mg"],
    allergies: ["Penicillin"],
    surgeries: ["Appendectomy 2010"],
    lifestyle: { exercise: "3-4 times per week", smoking: "Never", alcohol: "Moderate" },
    interestAreas: ["Drug Development"],
    timeCommitment: "Moderate (5-10 hours/month)",
  },
  {
    age: 52,
    conditions: ["Hypertension", "Type 2 Diabetes"],
    medications: ["Amlodipine 5mg", "Metformin 500mg"],
    allergies: ["Sulfa drugs"],
    surgeries: [],
    lifestyle: { exercise: "2-3 times per week", smoking: "Never", alcohol: "Light" },
    interestAreas: ["Prevention Studies"],
    timeCommitment: "Minimal (less than 5 hours/month)",
  },
  {
    age: 61,
    conditions: ["Type 2 Diabetes", "Heart Disease"],
    medications: ["Metformin 1000mg", "Atorvastatin 20mg", "Aspirin"],
    allergies: [],
    surgeries: ["Angioplasty 2018"],
    lifestyle: { exercise: "4-5 times per week", smoking: "Never", alcohol: "None" },
    interestAreas: ["Drug Development", "Device Testing"],
    timeCommitment: "Substantial (10+ hours/month)",
  },
]

export async function POST(request: Request) {
  try {
    const trialProfile: TrialProfile = await request.json()

    // Find matching patients
    const matches = findMatchingPatients(trialProfile, mockPatients, 50)

    return Response.json({
      success: true,
      candidates: matches.map(({ index, score, patient }) => ({
        id: index,
        name: `Patient ${index + 1}`,
        avatar: ["👨‍💼", "👩‍🦱", "👨‍🦱"][index % 3],
        age: patient.age,
        condition: patient.conditions.join(", "),
        matchScore: score,
        status: "New",
      })),
    })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to search candidates" }, { status: 500 })
  }
}
