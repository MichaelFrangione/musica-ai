import { type NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering to prevent prerendering issues
export const dynamic = 'force-dynamic';

interface YouTubeSearchRequest {
    query: string;
}

interface YouTubeSearchResponse {
    videoId: string;
    title: string;
    thumbnail: string;
    url: string;
}

export async function POST(request: NextRequest) {
    try {
        const { query }: YouTubeSearchRequest = await request.json();
        
        if (!query) {
            return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
        }

        // YouTube Data API v3 endpoint
        const apiKey = process.env.YOUTUBE_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'YouTube API key not configured' }, { status: 500 });
        }

        // Search for the song with optimized parameters for official music
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&videoDuration=medium&relevanceLanguage=en&key=${apiKey}`;
        
        const searchResponse = await fetch(searchUrl);
        if (!searchResponse.ok) {
            throw new Error(`YouTube API error: ${searchResponse.status}`);
        }

        const searchData = await searchResponse.json();
        
        if (!searchData.items || searchData.items.length === 0) {
            return NextResponse.json({ error: 'No videos found' }, { status: 404 });
        }

        const video = searchData.items[0];
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        const thumbnail = video.snippet.thumbnails.medium.url;
        const url = `https://www.youtube.com/watch?v=${videoId}`;

        const result: YouTubeSearchResponse = {
            videoId,
            title,
            thumbnail,
            url
        };

        return NextResponse.json(result);

    } catch (error) {
        console.error('YouTube search error:', error);
        return NextResponse.json(
            { error: 'Failed to search YouTube' }, 
            { status: 500 }
        );
    }
}
