'use client';

import { useEffect, useState } from "react";
import ChordSelector from "@/components/chord-selector";
import ChordDiagram from "@/components/chordDiagram";
import { chordData } from "@/app/constants";

interface ComplementaryChordsResponse {
  complementary_chords: string[];
  original_chords: string[];
  message: string;
}

export default function Page() {
    const [selectedChords, setSelectedChords] = useState<string[]>([]);
    const [complementaryChords, setComplementaryChords] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const submit = async () => {
        if (selectedChords.length === 0) {
            setError("Please select at least one chord");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch('/api/complementary-chords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    selectedChords: selectedChords
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data: ComplementaryChordsResponse = await response.json();
            setComplementaryChords(data.complementary_chords);

        } catch (err) {
            console.error('Error:', err);
            setError(err instanceof Error ? err.message : 'An error occurred');
            setComplementaryChords([]);
        } finally {
            setLoading(false);
        }
    };

    // Helper function to find chord data by shortName
    const findChordByShortName = (shortName: string) => {
        return chordData.find(chord => chord.shortName === shortName);
    };

    return (
        <div className="container mx-auto p-4 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Chord Progression Helper</h1>
            <div className="space-y-4">
                <ChordSelector 
                    onSelectionChange={setSelectedChords} 
                    onClearComplementary={() => setComplementaryChords([])}
                />
                <div className="flex justify-center items-center">
                    <button
                        onClick={submit}
                        disabled={loading}
                        className="px-12 py-6 text-2xl font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-110"
                    >
                        {loading ? 'Getting Chords...' : 'Get Complementary Chords'}
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}
            </div>

            {complementaryChords.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Complementary Chords</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6">
                        {complementaryChords.map((chordShortName) => {
                            const chord = findChordByShortName(chordShortName);
                            if (!chord) return null;
                            
                            return (
                                <div 
                                    key={chord.shortName} 
                                    className="bg-white p-1 rounded-xl border-2 border-gray-200"
                                >
                                    <ChordDiagram chord={chord} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
        
    );
}
