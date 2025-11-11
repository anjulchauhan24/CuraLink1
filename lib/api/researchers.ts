// Researcher search with matching algorithm
export interface Researcher {
  id: string
  name: string
  institution: string
  department: string
  expertise: string[]
  location: {
    city: string
    state: string
    country: string
  }
  publications: number
  citations: number
  hIndex: number
  email?: string
  orcid?: string
  bio: string
  recentPublications?: any[]
  matchScore?: number
}

// Mock database of researchers - In production, this would come from a database
const researcherDatabase: Researcher[] = [
  // Parkinson's Disease Researchers - Toronto
  {
    id: "alfonso-fasano",
    name: "Alfonso Fasano",
    institution: "University of Toronto",
    department: "Neurology",
    expertise: ["Parkinson's Disease", "Movement Disorders", "Deep Brain Stimulation", "Neuromodulation"],
    location: { city: "Toronto", state: "Ontario", country: "Canada" },
    publications: 450,
    citations: 12000,
    hIndex: 65,
    orcid: "0000-0002-3797-6019",
    bio: "Expert in Parkinson's disease and movement disorders, specializing in deep brain stimulation and advanced therapies.",
  },
  {
    id: "renato-munhoz",
    name: "Renato Munhoz",
    institution: "Toronto Western Hospital",
    department: "Neurology",
    expertise: ["Parkinson's Disease", "Movement Disorders", "Atypical Parkinsonism"],
    location: { city: "Toronto", state: "Ontario", country: "Canada" },
    publications: 320,
    citations: 8500,
    hIndex: 52,
    bio: "Neurologist specializing in Parkinson's disease and atypical parkinsonian syndromes.",
  },
  {
    id: "anthony-lang",
    name: "Anthony Lang",
    institution: "University of Toronto",
    department: "Neurology",
    expertise: ["Parkinson's Disease", "Movement Disorders", "Neurodegeneration"],
    location: { city: "Toronto", state: "Ontario", country: "Canada" },
    publications: 850,
    citations: 45000,
    hIndex: 125,
    bio: "World-renowned expert in Parkinson's disease and movement disorders research.",
  },
  {
    id: "mandar-jog",
    name: "Mandar Jog",
    institution: "University of Western Ontario",
    department: "Neurology",
    expertise: ["Parkinson's Disease", "Movement Disorders", "Deep Brain Stimulation"],
    location: { city: "London", state: "Ontario", country: "Canada" },
    publications: 280,
    citations: 7200,
    hIndex: 48,
    bio: "Movement disorders specialist with focus on Parkinson's disease therapeutics.",
  },
  {
    id: "suneil-kalia",
    name: "Suneil Kalia",
    institution: "University of Toronto",
    department: "Neurology",
    expertise: ["Parkinson's Disease", "Neurodegeneration", "Alpha-synuclein"],
    location: { city: "Toronto", state: "Ontario", country: "Canada" },
    publications: 180,
    citations: 5400,
    hIndex: 42,
    bio: "Clinician-scientist studying molecular mechanisms of Parkinson's disease.",
  },
  {
    id: "andres-lozano",
    name: "Andres Lozano",
    institution: "University of Toronto",
    department: "Neurosurgery",
    expertise: ["Deep Brain Stimulation", "Parkinson's Disease", "Neuromodulation", "Movement Disorders"],
    location: { city: "Toronto", state: "Ontario", country: "Canada" },
    publications: 520,
    citations: 35000,
    hIndex: 95,
    bio: "Pioneer in deep brain stimulation for Parkinson's disease and other neurological conditions.",
  },

  // Breast Cancer Researchers - Los Angeles
  {
    id: "laura-esserman",
    name: "Laura J. Esserman",
    institution: "University of California, San Francisco",
    department: "Surgery",
    expertise: ["Breast Cancer", "Ductal Carcinoma in Situ", "Precision Medicine"],
    location: { city: "San Francisco", state: "California", country: "USA" },
    publications: 380,
    citations: 28000,
    hIndex: 78,
    bio: "Leading breast cancer surgeon and researcher focused on precision medicine approaches.",
  },
  {
    id: "hope-rugo",
    name: "Hope S. Rugo",
    institution: "UCSF Helen Diller Family Comprehensive Cancer Center",
    department: "Oncology",
    expertise: ["Breast Cancer", "Clinical Trials", "Immunotherapy"],
    location: { city: "San Francisco", state: "California", country: "USA" },
    publications: 550,
    citations: 32000,
    hIndex: 85,
    bio: "Medical oncologist specializing in breast cancer treatment and clinical research.",
  },
  {
    id: "jo-chien",
    name: "Jo Chien",
    institution: "City of Hope",
    department: "Oncology",
    expertise: ["Breast Cancer", "Ovarian Cancer", "Translational Research"],
    location: { city: "Los Angeles", state: "California", country: "USA" },
    publications: 280,
    citations: 18000,
    hIndex: 62,
    bio: "Researcher focused on translational approaches to breast and ovarian cancer.",
  },

  // ADHD Researchers - Amsterdam
  {
    id: "jan-buitelaar",
    name: "Jan Buitelaar",
    institution: "Radboud University Medical Center",
    department: "Psychiatry",
    expertise: ["ADHD", "Neurofeedback", "Child Psychiatry", "Neuroimaging"],
    location: { city: "Nijmegen", state: "Gelderland", country: "Netherlands" },
    publications: 620,
    citations: 42000,
    hIndex: 98,
    bio: "Leading expert in ADHD research with focus on neurofeedback and brain imaging.",
  },
  {
    id: "sarah-durston",
    name: "Sarah Durston",
    institution: "University Medical Center Utrecht",
    department: "Psychiatry",
    expertise: ["ADHD", "Neuroimaging", "Brain Development"],
    location: { city: "Utrecht", state: "Utrecht", country: "Netherlands" },
    publications: 280,
    citations: 18000,
    hIndex: 65,
    bio: "Researcher studying brain development and ADHD using neuroimaging techniques.",
  },
  {
    id: "catharina-hartman",
    name: "Catharina Hartman",
    institution: "University of Groningen",
    department: "Psychiatry",
    expertise: ["ADHD", "Child Development", "Epidemiology"],
    location: { city: "Groningen", state: "Groningen", country: "Netherlands" },
    publications: 340,
    citations: 22000,
    hIndex: 72,
    bio: "Psychiatrist researching ADHD from developmental and epidemiological perspectives.",
  },
  {
    id: "marieke-altink",
    name: "Marieke Altink",
    institution: "VU University Amsterdam",
    department: "Child Psychiatry",
    expertise: ["ADHD", "Genetics", "Behavioral Interventions"],
    location: { city: "Amsterdam", state: "North Holland", country: "Netherlands" },
    publications: 180,
    citations: 8500,
    hIndex: 45,
    bio: "Researcher focused on genetic and behavioral aspects of ADHD.",
  },
  {
    id: "anouk-schrantee",
    name: "Anouk Schrantee",
    institution: "Amsterdam UMC",
    department: "Radiology",
    expertise: ["ADHD", "Neuroimaging", "MRI", "Brain Connectivity"],
    location: { city: "Amsterdam", state: "North Holland", country: "Netherlands" },
    publications: 120,
    citations: 4200,
    hIndex: 32,
    bio: "Neuroimaging specialist studying brain connectivity in ADHD.",
  },

  // Depression Researchers - Amsterdam
  {
    id: "guido-van-wingen",
    name: "Guido van Wingen",
    institution: "Amsterdam UMC",
    department: "Psychiatry",
    expertise: ["Depression", "Brain Stimulation", "Neuroimaging"],
    location: { city: "Amsterdam", state: "North Holland", country: "Netherlands" },
    publications: 220,
    citations: 12000,
    hIndex: 55,
    bio: "Psychiatrist researching brain stimulation treatments for depression.",
  },
  {
    id: "damiaan-denys",
    name: "Damiaan Denys",
    institution: "Amsterdam UMC",
    department: "Psychiatry",
    expertise: ["Depression", "OCD", "Deep Brain Stimulation"],
    location: { city: "Amsterdam", state: "North Holland", country: "Netherlands" },
    publications: 380,
    citations: 25000,
    hIndex: 78,
    bio: "Leading researcher in deep brain stimulation for psychiatric disorders.",
  },
  {
    id: "brenda-penninx",
    name: "Brenda Penninx",
    institution: "VU University Amsterdam",
    department: "Psychiatry",
    expertise: ["Depression", "Anxiety", "Long-term Outcomes", "Epidemiology"],
    location: { city: "Amsterdam", state: "North Holland", country: "Netherlands" },
    publications: 680,
    citations: 58000,
    hIndex: 115,
    bio: "Expert in depression research with focus on long-term outcomes and biomarkers.",
  },
  {
    id: "claudi-bockting",
    name: "Claudi Bockting",
    institution: "University of Amsterdam",
    department: "Psychology",
    expertise: ["Depression", "Cognitive Therapy", "Relapse Prevention"],
    location: { city: "Amsterdam", state: "North Holland", country: "Netherlands" },
    publications: 240,
    citations: 14000,
    hIndex: 58,
    bio: "Clinical psychologist specializing in depression treatment and relapse prevention.",
  },
  {
    id: "jan-spijker",
    name: "Jan Spijker",
    institution: "Radboud University Medical Center",
    department: "Psychiatry",
    expertise: ["Depression", "Treatment Guidelines", "Clinical Practice"],
    location: { city: "Nijmegen", state: "Gelderland", country: "Netherlands" },
    publications: 180,
    citations: 9500,
    hIndex: 48,
    bio: "Psychiatrist focused on evidence-based treatment of depression.",
  },
]

function calculateMatchScore(researcher: Researcher, searchQuery: string, userDisease?: string): number {
  let score = 0
  const query = searchQuery.toLowerCase()
  const disease = userDisease?.toLowerCase() || ""

  // Check expertise match (40 points max)
  const expertiseMatch = researcher.expertise.some(
    (exp) => exp.toLowerCase().includes(query) || query.includes(exp.toLowerCase()),
  )
  if (expertiseMatch) score += 40

  // Check disease match (30 points max)
  if (disease) {
    const diseaseMatch = researcher.expertise.some(
      (exp) => exp.toLowerCase().includes(disease) || disease.includes(exp.toLowerCase()),
    )
    if (diseaseMatch) score += 30
  }

  // Check name match (20 points)
  if (researcher.name.toLowerCase().includes(query)) score += 20

  // Check bio match (10 points)
  if (researcher.bio.toLowerCase().includes(query)) score += 10

  // Bonus for high h-index (10 points)
  if (researcher.hIndex > 70) score += 10
  else if (researcher.hIndex > 50) score += 5

  return Math.min(score, 100)
}

export async function searchResearchers(
  query: string,
  userDisease?: string,
  location?: string,
  maxResults = 20,
): Promise<Researcher[]> {
  // Filter and score researchers
  let results = researcherDatabase
    .map((researcher) => ({
      ...researcher,
      matchScore: calculateMatchScore(researcher, query, userDisease),
    }))
    .filter((r) => r.matchScore > 0)

  // Apply location filter if provided
  if (location) {
    const locationLower = location.toLowerCase()
    results = results.filter(
      (r) =>
        r.location.city.toLowerCase().includes(locationLower) ||
        r.location.state.toLowerCase().includes(locationLower) ||
        r.location.country.toLowerCase().includes(locationLower),
    )
  }

  // Sort by match score
  results.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))

  return results.slice(0, maxResults)
}

export async function getResearcherById(id: string): Promise<Researcher | null> {
  return researcherDatabase.find((r) => r.id === id) || null
}
