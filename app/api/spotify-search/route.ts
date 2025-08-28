import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    // Get Spotify access token using client credentials flow
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`
      },
      body: 'grant_type=client_credentials'
    });

    if (!tokenResponse.ok) {
      console.error('Failed to get Spotify token:', await tokenResponse.text());
      return NextResponse.json({ error: 'Failed to authenticate with Spotify' }, { status: 500 });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Search for tracks on Spotify
    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5&market=US`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    if (!searchResponse.ok) {
      console.error('Spotify search failed:', await searchResponse.text());
      return NextResponse.json({ error: 'Spotify search failed' }, { status: 500 });
    }

    const searchData = await searchResponse.json();
    
    if (!searchData.tracks || searchData.tracks.items.length === 0) {
      return NextResponse.json({ 
        url: null, 
        thumbnail: null,
        message: 'No tracks found on Spotify'
      });
    }

    // Get the first (most relevant) track
    const track = searchData.tracks.items[0];
    
    return NextResponse.json({
      url: track.external_urls.spotify,
      thumbnail: track.album.images[0]?.url || null,
      trackName: track.name,
      artistName: track.artists[0]?.name || 'Unknown Artist',
      albumName: track.album.name,
      spotifyId: track.id
    });

  } catch (error) {
    console.error('Error in Spotify search API:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
