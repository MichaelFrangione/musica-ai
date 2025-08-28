'use client';

import { useState, useEffect } from 'react';
import SongSuggestionItem from './song-suggestion-item';

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
    spotifyUrl?: string;
    spotifyThumbnail?: string;
}

interface SongSuggestionsProps {
    songSuggestions: string | Song[];
    loadingSongs?: boolean;
}

function SongSuggestions({ songSuggestions, loadingSongs }: SongSuggestionsProps) {
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

        // Fetch streaming links for each song
        if (parsedSongs.length > 0) {
            fetchStreamingLinks(parsedSongs);
        }
    }, [songSuggestions]);

    const fetchStreamingLinks = async (songList: Song[]) => {
        setLoading(true);

        try {
            const updatedSongs = await Promise.all(
                songList.map(async (song) => {
                    if (song.youtubeUrl && song.spotifyUrl) return song; // Already has both links

                    const searchQuery = `${song.artist} ${song.songName}`;
                    let updatedSong = { ...song };

                    // Fetch YouTube link if not already present
                    if (!song.youtubeUrl) {
                        try {
                            const youtubeResponse = await fetch('/api/youtube-search', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ query: `${searchQuery} official audio` })
                            });

                            if (youtubeResponse.ok) {
                                const data = await youtubeResponse.json();
                                updatedSong = {
                                    ...updatedSong,
                                    youtubeUrl: data.url,
                                    youtubeThumbnail: data.thumbnail
                                };
                            }
                        } catch (error) {
                            console.error('Failed to fetch YouTube link for:', song.songName, error);
                        }
                    }

                    // Fetch Spotify link if not already present
                    if (!song.spotifyUrl) {
                        try {
                            const spotifyResponse = await fetch('/api/spotify-search', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ query: searchQuery })
                            });

                            if (spotifyResponse.ok) {
                                const data = await spotifyResponse.json();
                                if (data.url) {
                                    updatedSong = {
                                        ...updatedSong,
                                        spotifyUrl: data.url,
                                        spotifyThumbnail: data.thumbnail
                                    };
                                }
                            }
                        } catch (error) {
                            console.error('Failed to fetch Spotify link for:', song.songName, error);
                        }
                    }

                    return updatedSong;
                })
            );

            setSongs(updatedSongs);
        } catch (error) {
            console.error('Error fetching streaming links:', error);
        } finally {
            setLoading(false);
        }
    };

    // Show the section if we're loading songs or if we have songs to display
    if (!loadingSongs && (!songSuggestions || songs.length === 0)) return null;



    return (
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl border-2 border-green-200 shadow-2xl p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-green-800 mb-3">Song Suggestions</h2>
                <p className="text-green-700 text-lg">AI-generated recommendations based on your chord selection</p>
                <div className="w-24 h-1 bg-green-400 mx-auto mt-4 rounded-full" />

                {loadingSongs && (
                    <div className="mt-4 flex justify-center items-center gap-3">
                        <div className="animate-spin rounded-full size-6 border-b-2 border-green-600" />
                        <span className="text-lg text-green-800 font-medium">Getting song suggestions...</span>
                    </div>
                )}

                {loading && (
                    <div className="mt-4 flex justify-center items-center gap-2">
                        <div className="animate-spin rounded-full size-5 border-b-2 border-green-600" />
                        <span className="text-green-600 text-sm">Finding streaming links...</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {songs.map((song) => (
                    <SongSuggestionItem
                        key={`${song.artist}-${song.songName}`}
                        song={song}
                        isLoading={loading}
                    />
                ))}
            </div>
        </div>
    );
}

export default SongSuggestions;