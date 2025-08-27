'use client';

import { useState } from "react";

import ChordSelector from "@/components/chord-selector";
import SelectedChordsDisplay from "@/components/selected-chords-display";
import RecommendationsButton from "@/components/recommendations-button";
import ComplementaryChordsDisplay from "@/components/complementary-chords-display";
import SongSuggestions from "@/components/song-suggestions";
import Footer from "@/components/footer";
import { chordData } from "@/app/constants";

interface ComplementaryChordsResponse {
    complementary_chords: string[];
    original_chords: string[];
    message: string;
}

export default function Page() {
    const [selectedChords, setSelectedChords] = useState<string[]>([]);
    const [complementaryChords, setComplementaryChords] = useState<string[]>([]);
    const [loadingChords, setLoadingChords] = useState<boolean>(false);
    const [loadingSongs, setLoadingSongs] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [songSuggestions, setSongSuggestions] = useState<string>("");


    const submit = async () => {
        if (selectedChords.length === 0) {
            setError("Please select at least one chord");
            return;
        }

        setLoadingChords(true);
        setError("");

        try {
            // First get complementary chords
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
            setLoadingChords(false);

            // Then automatically get song suggestions
            setLoadingSongs(true);
            const songResponse = await fetch('/api/song-suggestions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    selectedChords: selectedChords,
                    complementaryChords: data.complementary_chords
                })
            });

            if (!songResponse.ok) {
                const songErrorData = await songResponse.json();
                throw new Error(songErrorData.error || `HTTP error! status: ${songResponse.status}`);
            }

            const songData: { song_suggestions: string; } = await songResponse.json();
            setSongSuggestions(songData.song_suggestions);

        } catch (err) {
            console.error('Error:', err);
            setError(err instanceof Error ? err.message : 'An error occurred');
            setComplementaryChords([]);
            setSongSuggestions("");
        } finally {
            setLoadingChords(false);
            setLoadingSongs(false);
        }
    };

    const resetAll = () => {
        setSelectedChords([]);
        setComplementaryChords([]);
        setSongSuggestions("");
        setError("");
    };

    // Helper function to find chord data by shortName
    const findChordByShortName = (shortName: string) => {
        return chordData.find(chord => chord.shortName === shortName);
    };

    return (
        <>
            <div className="container mx-auto p-4 flex flex-col gap-8">
                <h1 className="text-2xl font-bold">MusicAI</h1>

                <ChordSelector
                    selectedChords={selectedChords}
                    onSelectionChange={setSelectedChords}
                    onClearComplementary={() => {
                        setComplementaryChords([]);
                        setSongSuggestions("");
                    }}
                />

                <SelectedChordsDisplay
                    selectedChords={selectedChords}
                    setSelectedChords={setSelectedChords}
                />

                <RecommendationsButton
                    selectedChords={selectedChords}
                    loadingChords={loadingChords}
                    loadingSongs={loadingSongs}
                    complementaryChords={complementaryChords}
                    onSubmit={submit}
                />

                {/* Only show reset button after we have both chords and songs */}
                {complementaryChords.length > 0 && songSuggestions && (
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={resetAll}
                            disabled={loadingChords || loadingSongs}
                            className="px-8 py-6 text-xl font-bold bg-gray-500 text-white rounded-xl hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            Choose a different set of chords
                        </button>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <ComplementaryChordsDisplay complementaryChords={complementaryChords} />

                <SongSuggestions songSuggestions={songSuggestions} />
            </div>

            <Footer />
        </>
    );
}
