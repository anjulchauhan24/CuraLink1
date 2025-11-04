-- CuraLink Database Schema
-- PostgreSQL schema for storing patients, researchers, trials, and matches

-- Users table (shared authentication base)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('patient', 'researcher')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL,
  gender VARCHAR(50),
  bio TEXT,
  avatar_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patient health conditions
CREATE TABLE IF NOT EXISTS patient_conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  condition VARCHAR(255) NOT NULL,
  diagnosis_date DATE,
  severity VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patient medications
CREATE TABLE IF NOT EXISTS patient_medications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  medication VARCHAR(255) NOT NULL,
  dosage VARCHAR(100),
  frequency VARCHAR(100),
  started_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patient allergies
CREATE TABLE IF NOT EXISTS patient_allergies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  allergen VARCHAR(255) NOT NULL,
  severity VARCHAR(50),
  reaction TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patient preferences
CREATE TABLE IF NOT EXISTS patient_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL UNIQUE REFERENCES patients(id) ON DELETE CASCADE,
  time_commitment VARCHAR(100),
  research_interests TEXT[], -- Array of interest areas
  preferred_locations TEXT[],
  accept_notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Researchers table
CREATE TABLE IF NOT EXISTS researchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  medical_license VARCHAR(255) NOT NULL UNIQUE,
  institution VARCHAR(255) NOT NULL,
  department VARCHAR(255),
  phone VARCHAR(20),
  website VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(255),
  orcid_id VARCHAR(100),
  h_index INTEGER,
  publications_count INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Researcher specialties
CREATE TABLE IF NOT EXISTS researcher_specialties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  researcher_id UUID NOT NULL REFERENCES researchers(id) ON DELETE CASCADE,
  specialty VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clinical trials
CREATE TABLE IF NOT EXISTS clinical_trials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  researcher_id UUID NOT NULL REFERENCES researchers(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  phase VARCHAR(50) NOT NULL CHECK (phase IN ('Phase 1', 'Phase 2', 'Phase 3', 'Phase 4')),
  status VARCHAR(50) DEFAULT 'recruiting' CHECK (status IN ('recruiting', 'active', 'paused', 'completed')),
  start_date DATE,
  expected_end_date DATE,
  target_enrollment INTEGER NOT NULL,
  current_enrollment INTEGER DEFAULT 0,
  budget DECIMAL(15, 2),
  funding_source VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trial target conditions
CREATE TABLE IF NOT EXISTS trial_conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trial_id UUID NOT NULL REFERENCES clinical_trials(id) ON DELETE CASCADE,
  condition VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trial locations
CREATE TABLE IF NOT EXISTS trial_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trial_id UUID NOT NULL REFERENCES clinical_trials(id) ON DELETE CASCADE,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(100),
  country VARCHAR(255) NOT NULL,
  institution VARCHAR(255),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trial requirements
CREATE TABLE IF NOT EXISTS trial_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trial_id UUID NOT NULL UNIQUE REFERENCES clinical_trials(id) ON DELETE CASCADE,
  min_age INTEGER,
  max_age INTEGER,
  gender_requirement VARCHAR(50),
  excluded_medications TEXT[],
  excluded_allergens TEXT[],
  required_time_commitment VARCHAR(100),
  compensation_per_visit DECIMAL(10, 2),
  visit_count INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trial applications (patient interest in trial)
CREATE TABLE IF NOT EXISTS trial_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trial_id UUID NOT NULL REFERENCES clinical_trials(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'withdrawn')),
  match_score INTEGER,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP,
  reviewed_by UUID REFERENCES researchers(id),
  notes TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(trial_id, patient_id)
);

-- Publications
CREATE TABLE IF NOT EXISTS publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  researcher_id UUID NOT NULL REFERENCES researchers(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  authors TEXT NOT NULL,
  journal VARCHAR(255) NOT NULL,
  publication_year INTEGER NOT NULL,
  doi VARCHAR(255) UNIQUE,
  url VARCHAR(500),
  citation_count INTEGER DEFAULT 0,
  impact_factor DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Publication-Trial relationships
CREATE TABLE IF NOT EXISTS publication_trials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  publication_id UUID NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
  trial_id UUID NOT NULL REFERENCES clinical_trials(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(publication_id, trial_id)
);

-- Expert network connections
CREATE TABLE IF NOT EXISTS researcher_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  researcher_id_1 UUID NOT NULL REFERENCES researchers(id) ON DELETE CASCADE,
  researcher_id_2 UUID NOT NULL REFERENCES researchers(id) ON DELETE CASCADE,
  connection_type VARCHAR(50) DEFAULT 'connected' CHECK (connection_type IN ('connected', 'collaborator', 'mentor')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHECK (researcher_id_1 < researcher_id_2),
  UNIQUE(researcher_id_1, researcher_id_2)
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(255),
  body TEXT NOT NULL,
  trial_id UUID REFERENCES clinical_trials(id) ON DELETE SET NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_patients_user_id ON patients(user_id);
CREATE INDEX IF NOT EXISTS idx_patient_conditions_patient_id ON patient_conditions(patient_id);
CREATE INDEX IF NOT EXISTS idx_patient_medications_patient_id ON patient_medications(patient_id);
CREATE INDEX IF NOT EXISTS idx_patient_preferences_patient_id ON patient_preferences(patient_id);
CREATE INDEX IF NOT EXISTS idx_researchers_user_id ON researchers(user_id);
CREATE INDEX IF NOT EXISTS idx_researcher_specialties_researcher_id ON researcher_specialties(researcher_id);
CREATE INDEX IF NOT EXISTS idx_clinical_trials_researcher_id ON clinical_trials(researcher_id);
CREATE INDEX IF NOT EXISTS idx_clinical_trials_status ON clinical_trials(status);
CREATE INDEX IF NOT EXISTS idx_trial_conditions_trial_id ON trial_conditions(trial_id);
CREATE INDEX IF NOT EXISTS idx_trial_locations_trial_id ON trial_locations(trial_id);
CREATE INDEX IF NOT EXISTS idx_trial_requirements_trial_id ON trial_requirements(trial_id);
CREATE INDEX IF NOT EXISTS idx_trial_applications_trial_id ON trial_applications(trial_id);
CREATE INDEX IF NOT EXISTS idx_trial_applications_patient_id ON trial_applications(patient_id);
CREATE INDEX IF NOT EXISTS idx_trial_applications_status ON trial_applications(status);
CREATE INDEX IF NOT EXISTS idx_publications_researcher_id ON publications(researcher_id);
CREATE INDEX IF NOT EXISTS idx_publication_trials_trial_id ON publication_trials(trial_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);
