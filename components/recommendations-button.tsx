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
    // Early return if conditions aren't met
    if (selectedChords.length === 0 || loadingChords || loadingSongs || complementaryChords.length > 0) {
        return null;
    }

    return (
        <div className="text-center">
            <div className="text-gray-600 text-lg mb-4">
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
    );
}
