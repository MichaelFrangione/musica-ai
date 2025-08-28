'use client';

import ChordDiagram from './chordDiagram';
import { chordData } from '@/app/constants';

interface SelectedChordsDisplayProps {
    selectedChords: string[];
    setSelectedChords: (chords: string[]) => void;
    loadingChords?: boolean;
    showRemoveButtons?: boolean;
}

export default function SelectedChordsDisplay({ selectedChords, setSelectedChords, loadingChords, showRemoveButtons = true }: SelectedChordsDisplayProps) {
    // Helper function to find chord data by shortName
    const findChordByShortName = (shortName: string) => {
        return chordData.find(chord => chord.shortName === shortName);
    };



    return (
        <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-50 rounded-3xl border-2 border-purple-200 shadow-2xl p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-purple-800 mb-3">Selected Chords</h2>
                <p className="text-purple-700 text-lg mb-4">Your chosen chord progression foundation</p>
                <div className="w-24 h-1 bg-purple-400 mx-auto rounded-full" />
            </div>

            {selectedChords.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-purple-600 text-lg mb-4">
                        <p>No chords selected yet</p>
                    </div>
                    <div className="text-purple-500 text-base">
                        <p>Use the chord selector above to choose your chords</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                        {selectedChords.map((chordShortName) => {
                            const chord = findChordByShortName(chordShortName);
                            if (!chord) return null;

                            return (
                                <div
                                    key={chord.shortName}
                                    className="relative bg-white p-4 rounded-2xl border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                                >
                                    {showRemoveButtons && (
                                        <button
                                            type="button"
                                            onClick={() => setSelectedChords(selectedChords.filter(c => c !== chordShortName))}
                                            disabled={loadingChords}
                                            className={`absolute -top-2 -right-2 size-6 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 shadow-lg z-10 ${loadingChords
                                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                                : 'bg-red-500 hover:bg-red-600 text-white hover:scale-110'
                                                }`}
                                        >
                                            ×
                                        </button>
                                    )}
                                    <ChordDiagram chord={chord} />
                                </div>
                            );
                        })}
                    </div>

                    {loadingChords && (
                        <div className="text-center mt-8 pt-6 border-t border-purple-200">
                            <div className="flex justify-center items-center gap-3 mb-3">
                                <div className="animate-spin rounded-full size-6 border-b-2 border-purple-600" />
                                <span className="text-purple-600 text-lg font-medium">Fetching complementary chords for your selection...</span>
                            </div>
                            <div className="text-purple-500 text-base">
                                <p>Analyzing your chord progression with AI</p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
