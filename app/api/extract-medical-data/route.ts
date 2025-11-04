import { generateObject } from "ai"
import { z } from "zod"

const medicalDataSchema = z.object({
  conditions: z.array(z.string()).describe("Medical conditions or diagnoses found in the document"),
  medications: z
    .array(
      z.object({
        name: z.string(),
        dosage: z.string().optional(),
        frequency: z.string().optional(),
      }),
    )
    .describe("Medications with dosage and frequency"),
  allergies: z.array(z.string()).describe("Known allergies"),
  testResults: z
    .array(
      z.object({
        test: z.string(),
        result: z.string(),
        date: z.string().optional(),
      }),
    )
    .optional()
    .describe("Lab test results"),
  procedures: z
    .array(
      z.object({
        name: z.string(),
        date: z.string().optional(),
      }),
    )
    .optional()
    .describe("Medical procedures or surgeries"),
  vitalSigns: z
    .object({
      bloodPressure: z.string().optional(),
      heartRate: z.string().optional(),
      temperature: z.string().optional(),
      weight: z.string().optional(),
    })
    .optional(),
})

export async function POST(req: Request) {
  try {
    const { file } = await req.json()

    if (!file || !file.data) {
      return Response.json({ error: "No file provided" }, { status: 400 })
    }

    const { object } = await generateObject({
      model: "anthropic/claude-sonnet-4.5",
      schema: medicalDataSchema,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all medical information from this document. Be thorough and accurate. If information is not present, return empty arrays.",
            },
            {
              type: "file",
              data: file.data,
              mediaType: file.mediaType || "application/pdf",
              filename: file.filename || "medical-record.pdf",
            },
          ],
        },
      ],
    })

    return Response.json({ extractedData: object })
  } catch (error) {
    console.error("[v0] Error extracting medical data:", error)
    return Response.json({ error: "Failed to extract medical data" }, { status: 500 })
  }
}
