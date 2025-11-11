// ClinicalTrials.gov API integration
export interface ClinicalTrial {
  id: string
  nctId: string
  title: string
  status: string
  phase: string
  conditions: string[]
  interventions: string[]
  locations: TrialLocation[]
  summary: string
  eligibility: {
    criteria: string
    gender: string
    minAge: string
    maxAge: string
  }
  sponsor: string
  startDate: string
  completionDate: string
  enrollmentCount: number
  url: string
}

export interface TrialLocation {
  facility: string
  city: string
  state: string
  country: string
  zip?: string
  distance?: number
}

export async function searchClinicalTrials(
  condition: string,
  location?: string,
  maxResults = 20,
): Promise<ClinicalTrial[]> {
  try {
    let query = `condition=${encodeURIComponent(condition)}`

    if (location) {
      query += `&location=${encodeURIComponent(location)}`
    }

    const url = `https://clinicaltrials.gov/api/v2/studies?query.cond=${encodeURIComponent(condition)}&pageSize=${maxResults}&format=json`

    const response = await fetch(url)
    const data = await response.json()

    const trials: ClinicalTrial[] =
      data.studies?.map((study: any) => {
        const protocolSection = study.protocolSection
        const identificationModule = protocolSection?.identificationModule
        const statusModule = protocolSection?.statusModule
        const descriptionModule = protocolSection?.descriptionModule
        const conditionsModule = protocolSection?.conditionsModule
        const armsInterventionsModule = protocolSection?.armsInterventionsModule
        const contactsLocationsModule = protocolSection?.contactsLocationsModule
        const eligibilityModule = protocolSection?.eligibilityModule
        const sponsorCollaboratorsModule = protocolSection?.sponsorCollaboratorsModule

        return {
          id: identificationModule?.nctId || "",
          nctId: identificationModule?.nctId || "",
          title: identificationModule?.briefTitle || "Untitled Trial",
          status: statusModule?.overallStatus || "Unknown",
          phase: protocolSection?.designModule?.phases?.[0] || "N/A",
          conditions: conditionsModule?.conditions || [],
          interventions: armsInterventionsModule?.interventions?.map((i: any) => i.name) || [],
          locations:
            contactsLocationsModule?.locations?.map((loc: any) => ({
              facility: loc.facility || "",
              city: loc.city || "",
              state: loc.state || "",
              country: loc.country || "",
              zip: loc.zip,
            })) || [],
          summary: descriptionModule?.briefSummary || "",
          eligibility: {
            criteria: eligibilityModule?.eligibilityCriteria || "",
            gender: eligibilityModule?.sex || "All",
            minAge: eligibilityModule?.minimumAge || "N/A",
            maxAge: eligibilityModule?.maximumAge || "N/A",
          },
          sponsor: sponsorCollaboratorsModule?.leadSponsor?.name || "Unknown",
          startDate: statusModule?.startDateStruct?.date || "",
          completionDate: statusModule?.completionDateStruct?.date || "",
          enrollmentCount: statusModule?.enrollmentInfo?.count || 0,
          url: `https://clinicaltrials.gov/study/${identificationModule?.nctId}`,
        }
      }) || []

    return trials
  } catch (error) {
    console.error("ClinicalTrials.gov API error:", error)
    return []
  }
}
