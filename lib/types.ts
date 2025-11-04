// TypeScript types for CuraLink

export interface User {
  id: string
  email: string
  userType: "patient" | "researcher"
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface PatientProfile {
  id: string
  userId: string
  firstName: string
  lastName: string
  age: number
  gender?: string
  bio?: string
  avatarUrl?: string
  conditions: string[]
  medications: string[]
  allergies: string[]
  preferences: PatientPreferences
  createdAt: Date
  updatedAt: Date
}

export interface PatientPreferences {
  timeCommitment: string
  researchInterests: string[]
  preferredLocations: string[]
  acceptNotifications: boolean
}

export interface ResearcherProfile {
  id: string
  userId: string
  firstName: string
  lastName: string
  title: string
  medicalLicense: string
  institution: string
  department?: string
  phone?: string
  website?: string
  bio?: string
  avatarUrl?: string
  orcidId?: string
  hIndex?: number
  publicationsCount: number
  specialties: string[]
  verified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ClinicalTrial {
  id: string
  researcherId: string
  title: string
  description: string
  phase: "Phase 1" | "Phase 2" | "Phase 3" | "Phase 4"
  status: "recruiting" | "active" | "paused" | "completed"
  startDate?: Date
  expectedEndDate?: Date
  targetEnrollment: number
  currentEnrollment: number
  budget?: number
  fundingSource?: string
  conditions: string[]
  locations: string[]
  requirements: TrialRequirements
  createdAt: Date
  updatedAt: Date
}

export interface TrialRequirements {
  minAge?: number
  maxAge?: number
  genderRequirement?: string
  excludedMedications: string[]
  excludedAllergens: string[]
  requiredTimeCommitment: string
  compensationPerVisit?: number
  visitCount?: number
}

export interface TrialApplication {
  id: string
  trialId: string
  patientId: string
  status: "pending" | "approved" | "rejected" | "withdrawn"
  matchScore: number
  appliedAt: Date
  reviewedAt?: Date
  reviewedBy?: string
  notes?: string
  updatedAt: Date
}

export interface Publication {
  id: string
  researcherId: string
  title: string
  authors: string
  journal: string
  publicationYear: number
  doi?: string
  url?: string
  citationCount: number
  impactFactor?: number
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  senderId: string
  recipientId: string
  subject?: string
  body: string
  trialId?: string
  isRead: boolean
  createdAt: Date
  readAt?: Date
}

export interface ResearcherConnection {
  id: string
  researcherId1: string
  researcherId2: string
  connectionType: "connected" | "collaborator" | "mentor"
  createdAt: Date
}
