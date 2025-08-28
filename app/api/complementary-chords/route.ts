import { type NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/(auth)/auth';
import { myProvider } from '@/lib/ai/providers';
import { streamText } from 'ai';
import { systemPrompt } from '@/lib/ai/prompts';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const { selectedChords } = await request.json();
    
    if (!selectedChords || !Array.isArray(selectedChords) || selectedChords.length === 0) {
      return NextResponse.json({ error: 'Please provide an array of selected chords' }, { status: 400 });
    }

    // Create the prompt for complementary chords and analysis
    const prompt = `Given the selected chords: ${selectedChords.join(', ')}, provide:
1. Complementary chords that would work well in a progression
2. A musical analysis of the chord progression

Return the answer in this exact JSON format:
{
  "complementary_chords": ["chord1", "chord2", "chord3"],
  "analysis": {
    "progression_type": "description of the progression type",
    "musical_characteristics": "key musical features and mood",
    "common_uses": "typical genres or contexts where this progression is used",
    "suggestions": "musical suggestions for using this progression"
  }
}`;

    // Get the JSON model
    const model = myProvider.languageModel('chat-model-json');

    // Stream the response
    const result = streamText({
      model,
      system: systemPrompt({ selectedChatModel: 'chat-model-json', requestHints: { longitude: '0', latitude: '0', city: '', country: '' } }),
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      experimental_transform: undefined, // No transformation for cleaner output
    });

    // Consume the stream and extract the JSON
    let fullResponse = '';
    
    for await (const chunk of result.textStream) {
      fullResponse += chunk;
    }

    console.log('Full AI response:', fullResponse);

    // Extract JSON from the response
    const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in response:', fullResponse);
      return NextResponse.json({ error: 'Invalid response format from AI' }, { status: 500 });
    }

    try {
      const jsonResponse = JSON.parse(jsonMatch[0]);
      
      // Validate the response structure
      if (!jsonResponse.complementary_chords || !Array.isArray(jsonResponse.complementary_chords)) {
        return NextResponse.json({ error: 'Invalid response structure from AI' }, { status: 500 });
      }

      return NextResponse.json({
        complementary_chords: jsonResponse.complementary_chords,
        analysis: jsonResponse.analysis || {
          progression_type: "Standard progression",
          musical_characteristics: "Versatile and commonly used",
          common_uses: "Pop, rock, and folk music",
          suggestions: "Try playing with different rhythms and strumming patterns"
        },
        original_chords: selectedChords,
        message: 'Successfully generated complementary chords and analysis'
      });

    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error in complementary chords API:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
