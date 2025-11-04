import { streamText } from "ai"

export const maxDuration = 30

const SYSTEM_PROMPT = `You are CuraLink Health Assistant, an AI helper for patients exploring clinical trials.

Your role:
- Explain clinical trial information in simple, friendly language
- Answer questions about medical terms and procedures
- Help patients understand eligibility criteria
- Provide encouragement and support
- NEVER provide medical advice or diagnoses
- Always recommend consulting with healthcare providers for medical decisions

Be warm, empathetic, and clear. Use analogies when explaining complex concepts.`

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: SYSTEM_PROMPT,
    messages,
    maxTokens: 500,
    temperature: 0.7,
  })

  return result.toUIMessageStreamResponse()
}
