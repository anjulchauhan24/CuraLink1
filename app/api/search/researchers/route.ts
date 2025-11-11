import { type NextRequest, NextResponse } from "next/server"
import { searchResearchers } from "@/lib/api/researchers"
import { getPublicationsByAuthor } from "@/lib/api/pubmed"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query") || ""
  const disease = searchParams.get("disease") || ""
  const location = searchParams.get("location") || ""

  try {
    const researchers = await searchResearchers(query, disease, location)

    // Fetch recent publications for top researchers
    const enrichedResearchers = await Promise.all(
      researchers.slice(0, 5).map(async (researcher) => {
        const publications = await getPublicationsByAuthor(researcher.name, 5)
        return {
          ...researcher,
          recentPublications: publications,
        }
      }),
    )

    // Add remaining researchers without publications
    const allResearchers = [...enrichedResearchers, ...researchers.slice(5)]

    return NextResponse.json({ researchers: allResearchers })
  } catch (error) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
