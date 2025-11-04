// Trial matching algorithm based on patient profile and trial requirements
export interface PatientProfile {
  age: number
  conditions: string[]
  medications: string[]
  allergies: string[]
  surgeries: string[]
  lifestyle: {
    exercise: string
    smoking: string
    alcohol: string
  }
  interestAreas: string[]
  timeCommitment: string
}

export interface TrialProfile {
  id: string
  name: string
  phase: "Phase 1" | "Phase 2" | "Phase 3" | "Phase 4"
  targetConditions: string[]
  ageRange: { min: number; max: number }
  excludedMedications: string[]
  excludedAllergens: string[]
  requiredTimeCommitment: string
  locations: string[]
  description: string
}

/**
 * Calculate match score between patient and trial (0-100)
 * Factors considered:
 * - Condition match (primary factor)
 * - Age eligibility
 * - Medication conflicts
 * - Time commitment alignment
 */
export function calculateMatchScore(patient: PatientProfile, trial: TrialProfile): number {
  let score = 0
  let maxScore = 0

  // Condition matching (50 points max)
  maxScore += 50
  const conditionMatches = patient.conditions.filter((c) =>
    trial.targetConditions.some(
      (tc) => tc.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(tc.toLowerCase()),
    ),
  ).length
  const conditionScore = (conditionMatches / Math.max(trial.targetConditions.length, 1)) * 50
  score += conditionScore

  // Age eligibility (20 points max)
  maxScore += 20
  if (patient.age >= trial.ageRange.min && patient.age <= trial.ageRange.max) {
    score += 20
  } else if (Math.abs(patient.age - trial.ageRange.min) < 5 || Math.abs(patient.age - trial.ageRange.max) < 5) {
    score += 10
  }

  // Medication conflicts (15 points max)
  maxScore += 15
  const hasConflict = patient.medications.some((med) =>
    trial.excludedMedications.some(
      (em) => med.toLowerCase().includes(em.toLowerCase()) || em.toLowerCase().includes(med.toLowerCase()),
    ),
  )
  if (!hasConflict) {
    score += 15
  }

  // Allergy/allergen conflicts (10 points max)
  maxScore += 10
  const hasAllergyConflict = patient.allergies.some((allergy) =>
    trial.excludedAllergens.some(
      (ea) => allergy.toLowerCase().includes(ea.toLowerCase()) || ea.toLowerCase().includes(allergy.toLowerCase()),
    ),
  )
  if (!hasAllergyConflict) {
    score += 10
  }

  // Time commitment alignment (5 points)
  maxScore += 5
  const commitmentMap: Record<string, number> = {
    "Minimal (less than 5 hours/month)": 1,
    "Moderate (5-10 hours/month)": 2,
    "Substantial (10+ hours/month)": 3,
    "Very Flexible": 4,
  }
  const patientCommitment = commitmentMap[patient.timeCommitment] || 0
  const trialCommitment = commitmentMap[trial.requiredTimeCommitment] || 0
  if (patientCommitment >= trialCommitment) {
    score += 5
  }

  // Normalize to 0-100 scale
  return Math.round((score / maxScore) * 100)
}

/**
 * Find best matching trials for a patient
 */
export function findMatchingTrials(
  patient: PatientProfile,
  trials: TrialProfile[],
  limit = 10,
): Array<{ trial: TrialProfile; score: number }> {
  return trials
    .map((trial) => ({
      trial,
      score: calculateMatchScore(patient, trial),
    }))
    .filter((result) => result.score >= 60) // Only return meaningful matches
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

/**
 * Find patients matching a trial's requirements
 */
export function findMatchingPatients(
  trial: TrialProfile,
  patients: PatientProfile[],
  limit = 50,
): Array<{ patient: PatientProfile; score: number; index: number }> {
  return patients
    .map((patient, index) => ({
      patient,
      index,
      score: calculateMatchScore(patient, trial),
    }))
    .filter((result) => result.score >= 60) // Only return meaningful matches
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}
