'use client';

interface RecommendationsButtonProps {
    selectedChords: string[];
    loadingChords: boolean;
    loadingSongs: boolean;
    complementaryChords: string[];
    onSubmit: () => void;
}

export default function RecommendationsButton({
    selectedChords,
    loadingChords,
    loadingSongs,
    complementaryChords,
    onSubmit
}: RecommendationsButtonProps) {
    return (
        <div className="text-center space-y-4">
            {selectedChords.length === 0 && (
                <div className="text-gray-600 text-lg">
                    <p>Select some chords above to get started!</p>
                </div>
            )}

            {loadingChords && (
                <div className="flex justify-center items-center gap-3 mt-4">
                    <div className="animate-spin rounded-full size-6 border-b-2 border-blue-600" />
                    <span className="text-lg text-blue-600 font-medium">Getting chord recommendations...</span>
                </div>
            )}

            {loadingSongs && (
                <div className="flex justify-center items-center gap-3 mt-4">
                    <div className="animate-spin rounded-full size-6 border-b-2 border-green-600" />
                    <span className="text-lg text-green-600 font-medium">Getting song suggestions...</span>
                </div>
            )}

            {selectedChords.length > 0 && !loadingChords && !loadingSongs && complementaryChords.length === 0 && (
                <div className="space-y-4">
                    <div className="text-gray-600 text-lg">
                        <p>Ready to get AI-powered chord recommendations?</p>
                    </div>

                    <button
                        type="button"
                        onClick={onSubmit}
                        disabled={loadingChords || loadingSongs}
                        className="px-12 py-6 text-2xl font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110"
                    >
                        Get Chord Recommendations
                    </button>
                </div>
            )}
        </div>
    );
}
