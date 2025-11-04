import { createUser, createPatient, createResearcher } from "@/lib/db"
import { hash } from "bcryptjs"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, userType, firstName, lastName, ...additionalData } = body

    if (!email || !password || !userType) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Hash password
    const passwordHash = await hash(password, 10)

    // Create user
    const userResult = await createUser(email, passwordHash, userType)
    if (!userResult.rows.length) {
      return Response.json({ error: "Failed to create user" }, { status: 500 })
    }

    const userId = userResult.rows[0].id

    // Create patient or researcher profile
    if (userType === "patient") {
      const { age, gender } = additionalData
      if (!age) {
        return Response.json({ error: "Age is required for patients" }, { status: 400 })
      }
      await createPatient(userId, firstName, lastName, age, gender)
    } else if (userType === "researcher") {
      const { title, medicalLicense, institution, department } = additionalData
      if (!title || !medicalLicense || !institution) {
        return Response.json({ error: "Title, license, and institution required for researchers" }, { status: 400 })
      }
      await createResearcher(userId, firstName, lastName, title, medicalLicense, institution, department)
    }

    return Response.json({ message: "User created successfully", userId }, { status: 201 })
  } catch (error: any) {
    console.error("Signup error:", error)
    if (error.message.includes("duplicate key")) {
      return Response.json({ error: "Email already exists" }, { status: 409 })
    }
    return Response.json({ error: "Failed to create user" }, { status: 500 })
  }
}
