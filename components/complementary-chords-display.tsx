'use client';

import ChordDiagram from './chordDiagram';
import { chordData } from '@/app/constants';

interface ComplementaryChordsDisplayProps {
    complementaryChords: string[];
    selectedChords: string[];
    analysis?: {
        progression_type: string;
        musical_characteristics: string;
        common_uses: string;
        suggestions: string;
    } | null;
    hasSongSuggestions?: boolean;
}

export default function ComplementaryChordsDisplay({ complementaryChords, selectedChords, analysis, hasSongSuggestions }: ComplementaryChordsDisplayProps) {
    // Helper function to find chord data by shortName
    const findChordByShortName = (shortName: string) => {
        return chordData.find(chord => chord.shortName === shortName);
    };

    // Only show when button is clicked (after hiding chord selector)
    if (complementaryChords.length === 0 && selectedChords.length === 0) return null;

    return (
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl border-2 border-blue-200 shadow-2xl p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-800 mb-3">Your Chord Progression</h2>
                <p className="text-blue-700 text-lg">Your selected chords and AI-generated complementary recommendations</p>
                <div className="w-24 h-1 bg-blue-400 mx-auto mt-4 rounded-full" />
            </div>

            {/* Show all chords in one unified grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6">
                {/* Selected Chords */}
                {selectedChords.map((chordShortName) => {
                    const chord = findChordByShortName(chordShortName);
                    if (!chord) return null;

                    return (
                        <div
                            key={`selected-${chord.shortName}`}
                            className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-2xl border-2 border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative"
                        >
                            {/* Badge to indicate this is a selected chord */}
                            <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                Selected
                            </div>
                            <ChordDiagram chord={chord} />
                        </div>
                    );
                })}

                {/* Loading state for complementary chords - only show when we have selected chords but no complementary chords yet */}
                {selectedChords.length > 0 && complementaryChords.length === 0 && (
                    <div className="col-span-full text-center py-8">
                        <div className="flex justify-center items-center gap-3 mb-3">
                            <div className="animate-spin rounded-full size-6 border-b-2 border-blue-600" />
                            <span className="text-blue-600 text-lg font-medium">Analyzing your chord progression...</span>
                        </div>
                    </div>
                )}

                {/* Complementary Chords */}
                {complementaryChords.map((chordShortName) => {
                    const chord = findChordByShortName(chordShortName);
                    if (!chord) return null;

                    return (
                        <div
                            key={`complementary-${chord.shortName}`}
                            className="bg-white p-4 rounded-2xl border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            <ChordDiagram chord={chord} />
                        </div>
                    );
                })}
            </div>

            {/* Chord Progression Analysis */}
            {analysis && (
                <div className="mt-8 p-6 bg-white rounded-2xl border-2 border-blue-200 shadow-xl">
                    <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">Chord Progression Analysis</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-lg font-semibold text-blue-700 mb-2">Progression Type</h4>
                                <p className="text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-100">
                                    {analysis.progression_type}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-blue-700 mb-2">Musical Characteristics</h4>
                                <p className="text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-100">
                                    {analysis.musical_characteristics}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-lg font-semibold text-blue-700 mb-2">Common Uses</h4>
                                <p className="text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-100">
                                    {analysis.common_uses}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-blue-700 mb-2">Musical Suggestions</h4>
                                <p className="text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-100">
                                    {analysis.suggestions}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Scroll Down Indicator - only show when we have song suggestions */}
            {hasSongSuggestions && (
                <div className="mt-8 text-center">
                    <div className="inline-flex flex-col items-center gap-2 text-blue-600">
                        <span className="text-sm font-medium">Scroll down for song suggestions</span>
                        <button
                            onClick={() => {
                                document.getElementById('song-suggestions')?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }}
                            className="group hover:scale-110 transition-transform duration-200 cursor-pointer"
                            aria-label="Scroll to song suggestions"
                        >
                            <svg className="w-6 h-6 animate-bounce group-hover:animate-none" style={{ animationDuration: '3s', animationIterationCount: 'infinite' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
