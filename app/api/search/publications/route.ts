import { type NextRequest, NextResponse } from "next/server"
import { searchPubMed } from "@/lib/api/pubmed"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query") || ""
  const disease = searchParams.get("disease") || ""

  try {
    // Combine disease with query for better results
    const searchQuery = disease ? `${disease} ${query}` : query
    const publications = await searchPubMed(searchQuery, 20)

    return NextResponse.json({ publications })
  } catch (error) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
