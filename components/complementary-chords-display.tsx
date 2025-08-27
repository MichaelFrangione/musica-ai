'use client';

import ChordDiagram from './chordDiagram';
import { chordData } from '@/app/constants';

interface ComplementaryChordsDisplayProps {
    complementaryChords: string[];
}

export default function ComplementaryChordsDisplay({ complementaryChords }: ComplementaryChordsDisplayProps) {
    // Helper function to find chord data by shortName
    const findChordByShortName = (shortName: string) => {
        return chordData.find(chord => chord.shortName === shortName);
    };

    if (complementaryChords.length === 0) return null;

    return (
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl border-2 border-blue-200 shadow-2xl p-8">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center size-16 bg-blue-600 rounded-full mb-4 shadow-lg">
                    <svg className="size-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-blue-800 mb-3">Complementary Chords</h2>
                <p className="text-blue-700 text-lg">AI-generated chord recommendations to enhance your progression</p>
                <div className="w-24 h-1 bg-blue-400 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6">
                {complementaryChords.map((chordShortName) => {
                    const chord = findChordByShortName(chordShortName);
                    if (!chord) return null;

                    return (
                        <div
                            key={chord.shortName}
                            className="bg-white p-4 rounded-2xl border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            <ChordDiagram chord={chord} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
