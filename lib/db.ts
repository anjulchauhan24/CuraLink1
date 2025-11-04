// Database utilities for CuraLink
// This file provides helper functions for database operations
// For production, integrate with actual database (PostgreSQL via Supabase, Neon, or similar)

import { sql } from "@vercel/postgres"

/**
 * Initialize database connection
 */
export async function initializeDB() {
  try {
    // Test connection
    await sql`SELECT 1`
    console.log("Database connected successfully")
  } catch (error) {
    console.error("Database connection failed:", error)
    throw error
  }
}

/**
 * User operations
 */
export async function createUser(email: string, passwordHash: string, userType: "patient" | "researcher") {
  return sql`
    INSERT INTO users (email, password_hash, user_type)
    VALUES (${email}, ${passwordHash}, ${userType})
    RETURNING id, email, user_type
  `
}

export async function getUserByEmail(email: string) {
  return sql`
    SELECT * FROM users WHERE email = ${email}
  `
}

/**
 * Patient operations
 */
export async function createPatient(userId: string, firstName: string, lastName: string, age: number, gender?: string) {
  return sql`
    INSERT INTO patients (user_id, first_name, last_name, age, gender)
    VALUES (${userId}, ${firstName}, ${lastName}, ${age}, ${gender || null})
    RETURNING id
  `
}

export async function addPatientCondition(patientId: string, condition: string, severity?: string) {
  return sql`
    INSERT INTO patient_conditions (patient_id, condition, severity)
    VALUES (${patientId}, ${condition}, ${severity || null})
  `
}

export async function getPatientProfile(patientId: string) {
  return sql`
    SELECT p.*, 
      ARRAY_AGG(DISTINCT pc.condition) as conditions,
      ARRAY_AGG(DISTINCT pm.medication) as medications,
      ARRAY_AGG(DISTINCT pa.allergen) as allergies
    FROM patients p
    LEFT JOIN patient_conditions pc ON p.id = pc.patient_id
    LEFT JOIN patient_medications pm ON p.id = pm.patient_id
    LEFT JOIN patient_allergies pa ON p.id = pa.patient_id
    WHERE p.id = ${patientId}
    GROUP BY p.id
  `
}

/**
 * Trial operations
 */
export async function createTrial(
  researcherId: string,
  title: string,
  description: string,
  phase: string,
  targetEnrollment: number,
) {
  return sql`
    INSERT INTO clinical_trials (researcher_id, title, description, phase, target_enrollment)
    VALUES (${researcherId}, ${title}, ${description}, ${phase}, ${targetEnrollment})
    RETURNING id
  `
}

export async function getTrialWithDetails(trialId: string) {
  return sql`
    SELECT ct.*,
      ARRAY_AGG(DISTINCT tc.condition) as conditions,
      ARRAY_AGG(DISTINCT tl.city) as locations,
      tr.min_age, tr.max_age, tr.required_time_commitment
    FROM clinical_trials ct
    LEFT JOIN trial_conditions tc ON ct.id = tc.trial_id
    LEFT JOIN trial_locations tl ON ct.id = tl.trial_id
    LEFT JOIN trial_requirements tr ON ct.id = tr.trial_id
    WHERE ct.id = ${trialId}
    GROUP BY ct.id, tr.id
  `
}

export async function getTrialsByResearcher(researcherId: string) {
  return sql`
    SELECT ct.*,
      COUNT(DISTINCT ta.id) as total_applications,
      COUNT(DISTINCT CASE WHEN ta.status = 'approved' THEN ta.id END) as approved_count
    FROM clinical_trials ct
    LEFT JOIN trial_applications ta ON ct.id = ta.trial_id
    WHERE ct.researcher_id = ${researcherId}
    GROUP BY ct.id
    ORDER BY ct.created_at DESC
  `
}

/**
 * Application operations
 */
export async function submitTrialApplication(trialId: string, patientId: string, matchScore: number) {
  return sql`
    INSERT INTO trial_applications (trial_id, patient_id, match_score, status)
    VALUES (${trialId}, ${patientId}, ${matchScore}, 'pending')
    RETURNING id
  `
}

export async function getTrialApplications(trialId: string) {
  return sql`
    SELECT ta.*, p.first_name, p.last_name, p.age
    FROM trial_applications ta
    JOIN patients p ON ta.patient_id = p.id
    WHERE ta.trial_id = ${trialId}
    ORDER BY ta.match_score DESC
  `
}

/**
 * Researcher operations
 */
export async function createResearcher(
  userId: string,
  firstName: string,
  lastName: string,
  title: string,
  medicalLicense: string,
  institution: string,
  department?: string,
) {
  return sql`
    INSERT INTO researchers (user_id, first_name, last_name, title, medical_license, institution, department)
    VALUES (${userId}, ${firstName}, ${lastName}, ${title}, ${medicalLicense}, ${institution}, ${department || null})
    RETURNING id
  `
}

export async function getResearcherProfile(researcherId: string) {
  return sql`
    SELECT r.*,
      ARRAY_AGG(DISTINCT rs.specialty) as specialties,
      COUNT(DISTINCT p.id) as publications_count
    FROM researchers r
    LEFT JOIN researcher_specialties rs ON r.id = rs.researcher_id
    LEFT JOIN publications p ON r.id = p.researcher_id
    WHERE r.id = ${researcherId}
    GROUP BY r.id
  `
}

/**
 * Message operations
 */
export async function sendMessage(
  senderId: string,
  recipientId: string,
  body: string,
  subject?: string,
  trialId?: string,
) {
  return sql`
    INSERT INTO messages (sender_id, recipient_id, subject, body, trial_id)
    VALUES (${senderId}, ${recipientId}, ${subject || null}, ${body}, ${trialId || null})
    RETURNING id
  `
}

export async function getUserMessages(userId: string) {
  return sql`
    SELECT * FROM messages
    WHERE recipient_id = ${userId}
    ORDER BY created_at DESC
  `
}
