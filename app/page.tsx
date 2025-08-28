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
import { useMiniPlayer } from "@/contexts/mini-player-context";

interface ComplementaryChordsResponse {
    complementary_chords: string[];
    analysis: {
        progression_type: string;
        musical_characteristics: string;
        common_uses: string;
        suggestions: string;
    };
    original_chords: string[];
    message: string;
}

export default function HomePage() {
    const [selectedChords, setSelectedChords] = useState<string[]>([]);
    const [complementaryChords, setComplementaryChords] = useState<string[]>([]);
    const [chordAnalysis, setChordAnalysis] = useState<ComplementaryChordsResponse['analysis'] | null>(null);
    const [loadingChords, setLoadingChords] = useState<boolean>(false);
    const [loadingSongs, setLoadingSongs] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [songSuggestions, setSongSuggestions] = useState<string>("");
    const [showChordSelector, setShowChordSelector] = useState<boolean>(true);
    const { hideMiniPlayer } = useMiniPlayer();

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
            setChordAnalysis(data.analysis);
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
        setChordAnalysis(null);
        setSongSuggestions("");
        setError("");
        setShowChordSelector(true);
        hideMiniPlayer(); // Close the mini-player when resetting
    };

    return (
        <>
            <div id="top-section" className="p-6 flex flex-col gap-8">
                {showChordSelector && (
                    <ChordSelector
                        selectedChords={selectedChords}
                        onSelectionChange={setSelectedChords}
                        onClearComplementary={() => {
                            setComplementaryChords([]);
                            setChordAnalysis(null);
                            setSongSuggestions("");
                            hideMiniPlayer(); // Close the mini-player when clearing complementary chords
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
                    <ComplementaryChordsDisplay complementaryChords={complementaryChords} selectedChords={selectedChords} analysis={chordAnalysis} hasSongSuggestions={Boolean((songSuggestions && songSuggestions.length > 0) || loadingSongs)} />
                )}


                <div id="song-suggestions">
                    <SongSuggestions songSuggestions={songSuggestions} loadingSongs={loadingSongs} />
                </div>

                {/* Only show reset button after we have both chords and songs */}
                {complementaryChords.length > 0 && songSuggestions && (
                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            onClick={resetAll}
                            disabled={loadingChords || loadingSongs}
                            className="px-8 py-6 text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform active:scale-95"
                        >
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Choose a different set of chords
                            </div>
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
