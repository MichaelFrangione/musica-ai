'use client';

import ChordSelector from "@/components/chord-selector";
import SelectedChordsDisplay from "@/components/selected-chords-display";
import RecommendationsButton from "@/components/recommendations-button";
import ComplementaryChordsDisplay from "@/components/complementary-chords-display";
import SongSuggestions from "@/components/song-suggestions";
import ChordDiagram from "@/components/chordDiagram";
import { chordData } from "@/app/constants";
import { useState } from "react";
import ChordProgressIndicator from "@/components/chord-progress-indicator";

interface ComplementaryChordsResponse {
    complementary_chords: string[];
    original_chords: string[];
    message: string;
}

export default function HomePage() {
    const [selectedChords, setSelectedChords] = useState<string[]>([]);
    const [complementaryChords, setComplementaryChords] = useState<string[]>([]);
    const [loadingChords, setLoadingChords] = useState<boolean>(false);
    const [loadingSongs, setLoadingSongs] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [songSuggestions, setSongSuggestions] = useState<string>("");
    const [showChordSelector, setShowChordSelector] = useState<boolean>(true);

    const submit = async () => {
        if (selectedChords.length === 0) {
            setError("Please select at least one chord");
            return;
        }

        setShowChordSelector(false);
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
                const songErrorData = await response.json();
                throw new Error(songErrorData.error || `HTTP error! status: ${response.status}`);
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
        setShowChordSelector(true);
    };

    return (
        <>
            <div className="p-6 flex flex-col gap-8">
                {showChordSelector && (
                    <ChordSelector
                        selectedChords={selectedChords}
                        onSelectionChange={setSelectedChords}
                        onClearComplementary={() => {
                            setComplementaryChords([]);
                            setSongSuggestions("");
                        }}
                    />
                )}

                {/* Progress Indicator */}
                {!showChordSelector && (
                    <ChordProgressIndicator
                        loadingChords={loadingChords}
                        loadingSongs={loadingSongs}
                        complementaryChords={complementaryChords}
                        songSuggestions={songSuggestions}
                    />
                )}


                {/* Full Selected Chords Display (only when selector is visible) */}
                {showChordSelector && (
                    <SelectedChordsDisplay
                        selectedChords={selectedChords}
                        setSelectedChords={setSelectedChords}
                        loadingChords={loadingChords}
                        showRemoveButtons={true}
                    />
                )}

                <RecommendationsButton
                    selectedChords={selectedChords}
                    loadingChords={loadingChords}
                    loadingSongs={loadingSongs}
                    complementaryChords={complementaryChords}
                    onSubmit={submit}
                />



                {/* Chord Progression (only after clicking button) */}
                {!showChordSelector && (
                    <ComplementaryChordsDisplay complementaryChords={complementaryChords} selectedChords={selectedChords} />
                )}


                <SongSuggestions songSuggestions={songSuggestions} loadingSongs={loadingSongs} />

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
            </div>
        </>
    );
}
