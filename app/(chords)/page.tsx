'use client';

import { useState } from "react";

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

    return (
        <div className="container mx-auto p-4 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Chord Progression Helper</h1>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Select Chords (hold Ctrl/Cmd to select multiple):
                    </label>
                    <select 
                        multiple 
                        value={selectedChords} 
                        onChange={(e) => setSelectedChords(Array.from(e.target.selectedOptions).map(option => option.value))} 
                        className="border border-gray-300 rounded-md p-2 w-full min-h-[120px]"
                    >
                        <option value="C">C</option>
                        <option value="C#">C#</option>
                        <option value="D">D</option>
                        <option value="D#">D#</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="F#">F#</option>
                        <option value="G">G</option>
                        <option value="G#">G#</option>
                        <option value="A">A</option>
                        <option value="A#">A#</option>
                        <option value="B">B</option>
                    </select>
                </div>
                
                <button 
                    className={`px-4 py-2 rounded-md font-medium ${
                        loading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`} 
                    onClick={submit}
                    disabled={loading}
                >
                    {loading ? 'Getting Complementary Chords...' : 'Get Complementary Chords'}
                </button>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}
            </div>

            {complementaryChords.length > 0 && (
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Complementary Chords</h2>
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                        <p className="text-green-800">
                            {complementaryChords.join(", ")}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
