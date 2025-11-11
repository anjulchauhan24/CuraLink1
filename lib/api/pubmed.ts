// PubMed API integration for fetching publications
export interface Publication {
  id: string
  title: string
  authors: string[]
  journal: string
  pubDate: string
  abstract: string
  pmid: string
  doi?: string
  citationCount?: number
  url: string
}

export async function searchPubMed(query: string, maxResults = 20): Promise<Publication[]> {
  try {
    // Step 1: Search for article IDs
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmax=${maxResults}&retmode=json&sort=relevance`

    const searchResponse = await fetch(searchUrl)
    const searchData = await searchResponse.json()

    const ids = searchData.esearchresult?.idlist || []

    if (ids.length === 0) {
      return []
    }

    // Step 2: Fetch details for articles
    const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(",")}&retmode=json`

    const summaryResponse = await fetch(summaryUrl)
    const summaryData = await summaryResponse.json()

    const publications: Publication[] = ids
      .map((id: string) => {
        const article = summaryData.result?.[id]
        if (!article) return null

        return {
          id: id,
          title: article.title || "No title available",
          authors: article.authors?.map((a: any) => a.name) || [],
          journal: article.fulljournalname || article.source || "Unknown journal",
          pubDate: article.pubdate || "Unknown date",
          abstract: article.abstract || "",
          pmid: id,
          doi: article.elocationid?.replace("doi: ", ""),
          url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
        }
      })
      .filter(Boolean) as Publication[]

    return publications
  } catch (error) {
    console.error("PubMed API error:", error)
    return []
  }
}

export async function getPublicationsByAuthor(authorName: string, maxResults = 10): Promise<Publication[]> {
  const query = `${authorName}[Author]`
  return searchPubMed(query, maxResults)
}
