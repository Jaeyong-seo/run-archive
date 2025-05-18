import { NextResponse } from 'next/server'
import { load } from 'cheerio'

type GarminActivityData = {
  title: string
  description: string
  url: string
}

export async function GET(request: Request) {
  try {
    // Get the URL from query parameters
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    // Check if URL is provided
    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      )
    }

    // Validate if the URL is from Garmin Connect
    if (!url.startsWith('https://connect.garmin.com/')) {
      return NextResponse.json(
        { error: 'Invalid Garmin Connect URL' },
        { status: 400 }
      )
    }

    // Fetch the HTML content
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`)
    }

    const html = await response.text()

    // Parse HTML with cheerio
    const $ = load(html)
    
    // Extract meta tags
    const activityData: GarminActivityData = {
      title: $('meta[property="og:title"]').attr('content') || '',
      description: $('meta[property="og:description"]').attr('content') || '',
      url: $('meta[property="og:url"]').attr('content') || url
    }

    // Validate extracted data
    if (!activityData.title || !activityData.description) {
      throw new Error('Failed to extract activity data from HTML')
    }

    // Return the parsed data
    return NextResponse.json(activityData)

  } catch (error) {
    console.error('Error parsing Garmin data:', error)
    return NextResponse.json(
      { error: 'Failed to parse Garmin activity data' },
      { status: 500 }
    )
  }
} 