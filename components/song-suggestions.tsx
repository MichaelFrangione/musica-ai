'use client';

import { useState, useEffect } from 'react';

interface Song {
    songName: string;
    artist: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    link?: string;
    key?: string;
    chordProgression?: string[];
    youtubeUrl?: string;
    youtubeThumbnail?: string;
}

interface SongSuggestionsProps {
    songSuggestions: string | Song[];
}

function SongSuggestions({ songSuggestions }: SongSuggestionsProps) {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!songSuggestions) {
            setSongs([]);
            return;
        }

        // Handle both string and object responses
        let parsedSongs: Song[] = [];

        if (typeof songSuggestions === 'string') {
            // If it's a string, try to parse it as JSON
            try {
                const parsed = JSON.parse(songSuggestions);
                parsedSongs = Array.isArray(parsed) ? parsed : [parsed];
            } catch (error) {
                console.error('Failed to parse song suggestions:', error);
                setSongs([]);
                return;
            }
        } else if (Array.isArray(songSuggestions)) {
            // If it's already an array, use it directly
            parsedSongs = songSuggestions;
        } else if (typeof songSuggestions === 'object') {
            // If it's a single object, wrap it in an array
            parsedSongs = [songSuggestions as Song];
        } else {
            console.error('Unexpected song suggestions format:', typeof songSuggestions);
            setSongs([]);
            return;
        }

        setSongs(parsedSongs);

        // Fetch YouTube links for each song
        if (parsedSongs.length > 0) {
            fetchYouTubeLinks(parsedSongs);
        }
    }, [songSuggestions]);

    const fetchYouTubeLinks = async (songList: Song[]) => {
        setLoading(true);

        try {
            const updatedSongs = await Promise.all(
                songList.map(async (song) => {
                    if (song.youtubeUrl) return song; // Already has a link

                    const searchQuery = `${song.artist} ${song.songName} official audio`;

                    try {
                        const response = await fetch('/api/youtube-search', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ query: searchQuery })
                        });

                        if (response.ok) {
                            const data = await response.json();
                            return {
                                ...song,
                                youtubeUrl: data.url,
                                youtubeThumbnail: data.thumbnail
                            };
                        }
                    } catch (error) {
                        console.error('Failed to fetch YouTube link for:', song.songName, error);
                    }

                    return song;
                })
            );

            setSongs(updatedSongs);
        } catch (error) {
            console.error('Error fetching YouTube links:', error);
        } finally {
            setLoading(false);
        }
    };

    // Don't show the section until we have songs loaded
    if (!songSuggestions || songs.length === 0) return null;

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'beginner':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'intermediate':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'advanced':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl border-2 border-green-200 shadow-2xl p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-green-800 mb-3">Song Suggestions</h2>
                <p className="text-green-700 text-lg">AI-generated recommendations based on your chord selection</p>
                <div className="w-24 h-1 bg-green-400 mx-auto mt-4 rounded-full" />
                {loading && (
                    <div className="mt-4 flex justify-center items-center gap-2">
                        <div className="animate-spin rounded-full size-5 border-b-2 border-green-600" />
                        <span className="text-green-600 text-sm">Finding songs on YouTube...</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {songs.map((song) => (
                    <div key={`${song.artist}-${song.songName}`} className="bg-white rounded-2xl border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 min-h-[320px] flex flex-col overflow-hidden">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 text-white">
                            <div className="flex items-start justify-between">
                                <h3 className="text-lg font-bold line-clamp-2 flex-1 mr-3">{song.songName}</h3>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full border-2 border-white/30 ${getDifficultyColor(song.difficulty)}`}>
                                    {song.difficulty}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            <p className="text-sm text-gray-600 mb-4 font-medium">{song.artist}</p>

                            {song.chordProgression && song.chordProgression.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Chord Progression:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {song.chordProgression.map((chord) => (
                                            <span
                                                key={`${song.artist}-${song.songName}-${chord}`}
                                                className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-mono rounded-lg border border-purple-200 shadow-sm"
                                            >
                                                {chord}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <p className="text-sm text-gray-700 leading-relaxed flex-1">
                                {song.description}
                            </p>

                            {song.youtubeUrl ? (
                                <div className="mt-6 pt-4 border-t border-gray-100">
                                    <a
                                        href={song.youtubeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 hover:scale-105 shadow-md"
                                    >
                                        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                        Listen on YouTube
                                    </a>
                                </div>
                            ) : (
                                <div className="mt-6 pt-4 border-t border-gray-100">
                                    <div className="text-center text-gray-500 text-sm">
                                        <svg className="size-4 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                        Song not found on YouTube
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SongSuggestions;