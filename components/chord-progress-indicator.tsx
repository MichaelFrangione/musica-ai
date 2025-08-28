'use client';

interface ChordProgressIndicatorProps {
    loadingChords: boolean;
    loadingSongs: boolean;
    complementaryChords: string[];
    songSuggestions: string;
}

export default function ChordProgressIndicator({
    loadingChords,
    loadingSongs,
    complementaryChords,
    songSuggestions
}: ChordProgressIndicatorProps) {
    // Determine the current state and appropriate message
    const getStatusMessage = () => {
        if (loadingChords) {
            return "AI is analyzing your chord progression...";
        } else if (loadingSongs) {
            return "AI is generating song suggestions...";
        } else if (complementaryChords.length > 0 && songSuggestions) {
            return "Analysis complete! Here's your enhanced chord progression";
        } else if (complementaryChords.length > 0) {
            return "Chord analysis complete! Generating song suggestions...";
        } else {
            return "AI is analyzing your chord progression...";
        }
    };

    const getSubMessage = () => {
        if (loadingChords) {
            return "Analyzing chord relationships and finding complementary options";
        } else if (loadingSongs) {
            return "Finding songs that match your chord progression";
        } else if (complementaryChords.length > 0 && songSuggestions) {
            return "";
        } else if (complementaryChords.length > 0) {
            return "Complementary chords found! Now generating song ideas";
        } else {
            return "Analyzing chord relationships and finding complementary options";
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border-2 border-blue-200 shadow-xl p-6">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">Chord Analysis Progress</h3>
                <p className="text-blue-700">{getStatusMessage()}</p>
                <p className="text-blue-600 text-sm mt-2">{getSubMessage()}</p>
            </div>

            <div className="flex items-center justify-center space-x-8">
                {/* Step 1: Selected Chords */}
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg mb-2">
                        ✓
                    </div>
                    <span className="text-sm font-medium text-green-700">Chords Selected</span>
                </div>

                {/* Arrow */}
                <div className="w-8 h-0.5 bg-blue-300"></div>

                {/* Step 2: Complementary Chords */}
                <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2 ${loadingChords
                        ? 'bg-blue-500 animate-pulse'
                        : complementaryChords.length > 0
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                        }`}>
                        {loadingChords ? (
                            <div className="animate-spin rounded-full w-6 h-6 border-b-2 border-white"></div>
                        ) : complementaryChords.length > 0 ? (
                            '✓'
                        ) : (
                            '2'
                        )}
                    </div>
                    <span className={`text-sm font-medium ${loadingChords
                        ? 'text-blue-700'
                        : complementaryChords.length > 0
                            ? 'text-green-700'
                            : 'text-gray-500'
                        }`}>
                        {loadingChords ? 'Fetching...' : 'Complementary Chords'}
                    </span>
                </div>

                {/* Arrow */}
                <div className="w-8 h-0.5 bg-blue-300"></div>

                {/* Step 3: Song Suggestions */}
                <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2 ${loadingSongs
                        ? 'bg-blue-500 animate-pulse'
                        : songSuggestions
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                        }`}>
                        {loadingSongs ? (
                            <div className="animate-spin rounded-full w-6 h-6 border-b-2 border-white"></div>
                        ) : songSuggestions ? (
                            '✓'
                        ) : (
                            '3'
                        )}
                    </div>
                    <span className={`text-sm font-medium ${loadingSongs
                        ? 'text-blue-700'
                        : songSuggestions
                            ? 'text-green-700'
                            : 'text-gray-500'
                        }`}>
                        {loadingSongs ? 'Fetching...' : 'Song Suggestions'}
                    </span>
                </div>
            </div>
        </div>
    );
}
