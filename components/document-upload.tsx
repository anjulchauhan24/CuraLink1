"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X, CheckCircle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ExtractedData {
  conditions: string[]
  medications: Array<{
    name: string
    dosage?: string
    frequency?: string
  }>
  allergies: string[]
  testResults?: Array<{
    test: string
    result: string
    date?: string
  }>
  procedures?: Array<{
    name: string
    date?: string
  }>
  vitalSigns?: {
    bloodPressure?: string
    heartRate?: string
    temperature?: string
    weight?: string
  }
}

export default function DocumentUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB")
        return
      }
      setFile(selectedFile)
      setError(null)
      setExtractedData(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsProcessing(true)
    setError(null)

    try {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64Data = e.target?.result as string

        const response = await fetch("/api/extract-medical-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file: {
              data: base64Data,
              mediaType: file.type,
              filename: file.name,
            },
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to extract data")
        }

        const result = await response.json()
        setExtractedData(result.extractedData)
      }

      reader.readAsDataURL(file)
    } catch (err) {
      setError("Failed to process document. Please try again.")
      console.error("[v0] Upload error:", err)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleApplyData = () => {
    // In a real app, this would update the user's profile
    alert("Medical data has been applied to your profile!")
    setFile(null)
    setExtractedData(null)
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Upload className="h-5 w-5 text-accent" />
            Smart Document Upload
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Upload medical records and we'll automatically extract your health information
          </p>
        </div>

        {/* Upload Area */}
        {!file && !extractedData && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-accent transition-colors"
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">PDF, PNG, JPG up to 10MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}

        {/* File Selected */}
        {file && !extractedData && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-accent" />
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setFile(null)} disabled={isProcessing}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <Button onClick={handleUpload} disabled={isProcessing} className="w-full">
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Extracting Data...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Process Document
                </>
              )}
            </Button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Extracted Data */}
        {extractedData && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-sm font-medium text-green-700">Successfully extracted medical information</p>
            </div>

            {/* Conditions */}
            {extractedData.conditions.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Conditions Found</h4>
                <div className="flex flex-wrap gap-2">
                  {extractedData.conditions.map((condition, i) => (
                    <Badge key={i} variant="secondary">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Medications */}
            {extractedData.medications.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Medications Found</h4>
                <div className="space-y-2">
                  {extractedData.medications.map((med, i) => (
                    <div key={i} className="p-3 bg-muted rounded-lg">
                      <p className="font-medium text-sm">{med.name}</p>
                      {(med.dosage || med.frequency) && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {med.dosage} {med.frequency && `• ${med.frequency}`}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Allergies */}
            {extractedData.allergies.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Allergies Found</h4>
                <div className="flex flex-wrap gap-2">
                  {extractedData.allergies.map((allergy, i) => (
                    <Badge key={i} variant="outline" className="bg-red-500/10 text-red-700 border-red-500/30">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Test Results */}
            {extractedData.testResults && extractedData.testResults.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Test Results</h4>
                <div className="space-y-2">
                  {extractedData.testResults.map((test, i) => (
                    <div key={i} className="p-3 bg-muted rounded-lg">
                      <p className="font-medium text-sm">{test.test}</p>
                      <p className="text-sm text-muted-foreground">{test.result}</p>
                      {test.date && <p className="text-xs text-muted-foreground mt-1">{test.date}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleApplyData} className="flex-1">
                Apply to Profile
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFile(null)
                  setExtractedData(null)
                }}
              >
                Upload Another
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
