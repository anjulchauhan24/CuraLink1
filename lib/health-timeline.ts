export interface TimelineEvent {
  id: string
  date: Date
  type: "diagnosis" | "medication" | "symptom" | "test" | "trial" | "milestone"
  title: string
  description: string
  severity?: "low" | "medium" | "high"
  metadata?: Record<string, any>
}

export function getMockHealthTimeline(): TimelineEvent[] {
  return [
    {
      id: "1",
      date: new Date("2024-01-15"),
      type: "trial",
      title: "Applied to Diabetes Management Study",
      description: "Submitted application for clinical trial focusing on Type 2 Diabetes management.",
    },
    {
      id: "2",
      date: new Date("2024-01-10"),
      type: "test",
      title: "HbA1c Test Results",
      description: "Blood glucose test showed HbA1c level of 7.2%",
      severity: "medium",
      metadata: { value: "7.2%", range: "5.7-6.4%" },
    },
    {
      id: "3",
      date: new Date("2024-01-05"),
      type: "medication",
      title: "Started Metformin",
      description: "Began taking Metformin 500mg twice daily for blood sugar control.",
      severity: "low",
    },
    {
      id: "4",
      date: new Date("2023-12-20"),
      type: "symptom",
      title: "Increased Thirst & Fatigue",
      description: "Reported persistent thirst and unusual fatigue to primary care physician.",
      severity: "medium",
    },
    {
      id: "5",
      date: new Date("2023-12-15"),
      type: "diagnosis",
      title: "Type 2 Diabetes Diagnosis",
      description: "Officially diagnosed with Type 2 Diabetes after comprehensive blood work.",
      severity: "high",
    },
    {
      id: "6",
      date: new Date("2023-11-30"),
      type: "test",
      title: "Initial Blood Work",
      description: "Comprehensive metabolic panel and fasting glucose test ordered.",
      severity: "low",
    },
    {
      id: "7",
      date: new Date("2023-11-15"),
      type: "milestone",
      title: "Annual Physical Exam",
      description: "Routine annual checkup revealed elevated blood sugar levels.",
    },
  ]
}

export function getTimelineIcon(type: TimelineEvent["type"]): string {
  const icons = {
    diagnosis: "🏥",
    medication: "💊",
    symptom: "📋",
    test: "🔬",
    trial: "🧪",
    milestone: "⭐",
  }
  return icons[type]
}

export function getTimelineColor(type: TimelineEvent["type"]): string {
  const colors = {
    diagnosis: "bg-red-500",
    medication: "bg-blue-500",
    symptom: "bg-yellow-500",
    test: "bg-purple-500",
    trial: "bg-green-500",
    milestone: "bg-accent",
  }
  return colors[type]
}

export function getSeverityColor(severity?: "low" | "medium" | "high"): string {
  if (!severity) return "bg-muted"
  const colors = {
    low: "bg-green-500/20 text-green-700 border-green-500/30",
    medium: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
    high: "bg-red-500/20 text-red-700 border-red-500/30",
  }
  return colors[severity]
}
