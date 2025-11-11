import { type NextRequest, NextResponse } from "next/server"
import { searchClinicalTrials } from "@/lib/api/clinicaltrials"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query") || ""
  const disease = searchParams.get("disease") || ""
  const location = searchParams.get("location") || ""

  try {
    // Combine disease with query for condition search
    const condition = disease ? `${disease} ${query}` : query
    const trials = await searchClinicalTrials(condition, location, 20)

    return NextResponse.json({ trials })
  } catch (error) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
