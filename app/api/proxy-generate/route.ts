import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get form data from the request
    const formData = await request.formData();
    
    // Get the backend URL from environment variables
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    
    // Fix URL path - ensure no double slashes
    const apiUrl = `${backendUrl.replace(/\/+$/, '')}/api/generate/`;
    console.log("Sending request to:", apiUrl);
    
    // Forward the request to the backend
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json",
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.detail || `Backend processing failed with status ${response.status}` },
        { status: response.status }
      );
    }
    
    // Get the response data
    const data = await response.json();
    
    // Return the response
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying to backend:", error);
    return NextResponse.json(
      { error: "Failed to connect to backend service" },
      { status: 500 }
    );
  }
}

// Add OPTIONS method to handle preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}