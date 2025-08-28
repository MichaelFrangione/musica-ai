'use client';

import { useState, useEffect } from 'react';
import ChordDiagram from './chordDiagram';
import { chordData } from '@/app/constants';

interface ChordSelectorProps {
    selectedChords: string[];
    onSelectionChange: (selectedChords: string[]) => void;
    onClearComplementary?: () => void;
}

export default function ChordSelector({ selectedChords, onSelectionChange, onClearComplementary }: ChordSelectorProps) {
    const [selectedRoot, setSelectedRoot] = useState<string | null>(null);

    // Reset selectedRoot when all chords are cleared
    useEffect(() => {
        if (selectedChords.length === 0) {
            setSelectedRoot(null);
        }
    }, [selectedChords]);

    const toggleChordSelection = (shortName: string) => {
        const newSelection = selectedChords.includes(shortName)
            ? selectedChords.filter(chord => chord !== shortName)
            : [...selectedChords, shortName];

        onSelectionChange(newSelection);

        // Clear complementary chords when selection changes
        if (onClearComplementary) {
            onClearComplementary();
        }
    };

    const selectRoot = (root: string) => {
        setSelectedRoot(selectedRoot === root ? null : root);
    };

    // Group chords by root note
    const chordGroups = chordData.reduce((groups, chord) => {
        // Extract root note - handle both single letters (A, B, C) and sharp notes (F#, G#, A#, C#, D#)
        let root = chord.shortName.charAt(0);
        if (chord.shortName.charAt(1) === '#') {
            root = chord.shortName.substring(0, 2); // Get "F#" instead of just "F"
        }

        if (!groups[root]) {
            groups[root] = { Major: null, Minor: null, '7': null, 'm7': null, 'Maj7': null };
        }

        if (chord.shortName === root) {
            groups[root].Major = chord;
        } else if (chord.shortName === `${root}m`) {
            groups[root].Minor = chord;
        } else if (chord.shortName === `${root}7`) {
            groups[root]['7'] = chord;
        } else if (chord.shortName === `${root}m7`) {
            groups[root].m7 = chord;
        } else if (chord.shortName === `${root}Maj7`) {
            groups[root].Maj7 = chord;
        }

        return groups;
    }, {} as Record<string, { Major: any; Minor: any; '7': any; 'm7': any; 'Maj7': any; }>);


    const rootNotes = Object.keys(chordGroups).sort((a, b) => {
        // Custom sort order: A, A#, B, C, C#, D, D#, E, F, F#, G, G#
        const noteOrder = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
        return noteOrder.indexOf(a) - noteOrder.indexOf(b);
    });

    return (
        <div className="w-full px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-600">Guitar Chord Selector</h1>
            {/* Root Note Buttons */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4 sticky top-4 z-10 py-2">
                {rootNotes.map((root) => {
                    // Check if any chord from this root note group is selected
                    const hasSelectedChords = selectedChords.some(chord => chord.startsWith(root));

                    return (
                        <button
                            type="button"
                            key={root}
                            onClick={() => selectRoot(root)}
                            className={`px-3 md:px-4 py-2 md:py-3 text-base md:text-lg font-bold rounded-lg border-2 transition-all duration-300 ${root.length > 1 ? 'min-w-14 md:min-w-16' : 'min-w-10 md:min-w-12'
                                } ${selectedRoot === root
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105'
                                    : hasSelectedChords
                                        ? 'bg-green-100 text-green-700 border-green-400 hover:bg-green-200'
                                        : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:scale-102 hover:text-gray-600'
                                }`}
                        >
                            {root}
                        </button>
                    );
                })}
            </div>

            {/* Chord Variations Display */}
            <div className="min-h-[160px]">
                {selectedRoot ? (
                    <div
                        key={selectedRoot}
                        className="mb-4 transition-all duration-500 ease-out opacity-100 translate-y-0"
                    >
                        <div className="w-full max-w-6xl mx-auto px-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 justify-items-center">
                                {['Major', 'Minor', '7', 'm7', 'Maj7'].map((type, index) => {
                                    const chord = chordGroups[selectedRoot][type as keyof typeof chordGroups[typeof selectedRoot]];
                                    return (
                                        <div
                                            key={`${selectedRoot}-${type}`}
                                            className="text-center transition-all duration-500 ease-out opacity-100 translate-y-0 w-full max-w-32"
                                            style={{
                                                transitionDelay: `${index * 100}ms`,
                                                animation: `slideInUp 0.5s ease-out ${index * 100}ms both`
                                            }}
                                        >
                                            {chord ? (
                                                <div
                                                    role="button"
                                                    tabIndex={0}
                                                    className="inline-block cursor-pointer transition-all duration-500 ease-out opacity-100 scale-100 w-full"
                                                    style={{ transitionDelay: `${index * 200}ms` }}
                                                    onClick={() => toggleChordSelection(chord.shortName)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            toggleChordSelection(chord.shortName);
                                                        }
                                                    }}
                                                >
                                                    <div
                                                        className="bg-white rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md w-full"
                                                        style={{
                                                            outline: selectedChords.includes(chord.shortName) ? '6px solid #3b82f6' : 'none',
                                                            outlineOffset: '0px'
                                                        }}
                                                    >
                                                        <ChordDiagram chord={chord} />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-full max-w-32 h-40 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-300 rounded-lg transition-all duration-500 ease-out opacity-100"
                                                    style={{ transitionDelay: `${index * 200}ms` }}>
                                                    Not Available
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full mt-10">
                        <div className="text-center text-gray-400">
                            <div className="size-12 md:size-16 mx-auto mb-4">
                                <svg className="size-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                            </div>
                            <p className="text-base md:text-lg font-medium">Select a root note above to see chord variations</p>
                        </div>
                    </div>
                )}
            </div>



            <style jsx>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}