import { NextRequest, NextResponse } from 'next/server';
import { myProvider } from '@/lib/ai/providers';
import { streamText } from 'ai';

export async function POST(request: NextRequest) {
  try {
    const { selectedChords, complementaryChords } = await request.json();

    if (!selectedChords || !Array.isArray(selectedChords) || selectedChords.length === 0) {
      return NextResponse.json({ error: 'Selected chords are required' }, { status: 400 });
    }

    const systemPrompt = `You are a music expert who suggests songs based on chord progressions. 

Given the selected chords and complementary chords, suggest 5-8 popular songs that feature similar chord progressions or could work well with these chords.

IMPORTANT: You must respond with valid JSON only. Do not include any other text, explanations, or markdown formatting.

Return an array of song objects with this exact structure:
[
  {
    "songName": "Song Title",
    "artist": "Artist Name", 
    "description": "Brief description of how the chords relate to the song and why it's good for practice",
    "difficulty": "Beginner",
    "key": "C Major",
    "chordProgression": ["C", "G", "Am", "F"]
  }
]

The difficulty must be exactly one of: "Beginner", "Intermediate", or "Advanced".

Focus on well-known songs that guitarists would recognize. Make sure the suggestions are practical and achievable for the given chord complexity.`;

    const userPrompt = `Selected Chords: ${selectedChords.join(', ')}
Complementary Chords: ${complementaryChords ? complementaryChords.join(', ') : 'None'}

Please suggest songs that would work well with these chord progressions. Respond with JSON only.`;

    const model = myProvider.languageModel('chat-model');

    const result = streamText({
      model,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    // Consume the stream and extract the text
    let fullResponse = '';
    
    for await (const chunk of result.textStream) {
      fullResponse += chunk;
    }

    // Try to parse the response as JSON
    let parsedSuggestions;
    try {
      parsedSuggestions = JSON.parse(fullResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      console.error('Raw response:', fullResponse);
      
      // Fallback: return a structured error response
      return NextResponse.json({
        song_suggestions: [
          {
            songName: "Error parsing suggestions",
            artist: "Please try again",
            description: "The AI response couldn't be parsed. Please try requesting song suggestions again.",
            difficulty: "Beginner"
          }
        ],
        selected_chords: selectedChords,
        complementary_chords: complementaryChords || []
      });
    }

    return NextResponse.json({
      song_suggestions: parsedSuggestions,
      selected_chords: selectedChords,
      complementary_chords: complementaryChords || []
    });

  } catch (error) {
    console.error('Error in song suggestions API:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
