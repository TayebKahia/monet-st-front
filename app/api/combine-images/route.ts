import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Parse the multipart form data
    const formData = await request.formData()
    const image = formData.get("file") as File

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 })
    }

    // Create new form data to forward to the backend
    const backendFormData = new FormData()
    backendFormData.append("file", image)

    // Get API URL from environment variable
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
    
    // Call the FastAPI backend
    try {
      const response = await fetch(`${apiUrl}/api/generate/`, {
        method: "POST",
        body: backendFormData,
        headers: {
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Failed to process image")
      }

      // Get the response data with the base64 image
      const data = await response.json()
      
      // Return the response to the frontend with CORS headers
      return NextResponse.json({
        success: true,
        image: data.image,
        processingTime: data.processing_time_ms,
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      })
    } catch (fetchError) {
      console.error("Error calling FastAPI backend:", fetchError)
      return NextResponse.json(
        { error: fetchError instanceof Error ? fetchError.message : "Failed to connect to backend service" },
        { status: 502 }
      )
    }
  } catch (error) {
    console.error("Error processing image:", error)
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  })
}
