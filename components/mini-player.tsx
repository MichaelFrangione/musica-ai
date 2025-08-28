'use client';

import { useMiniPlayer } from '../contexts/mini-player-context';

export default function MiniPlayer() {
    const { currentSong, isVisible, isMinimized, hideMiniPlayer, toggleMinimize } = useMiniPlayer();

    if (!isVisible || !currentSong) {
        return null;
    }

    const getSpotifyTrackId = (spotifyUrl: string) => {
        const match = spotifyUrl.match(/track\/([a-zA-Z0-9]+)/);
        if (match) return match[1];
        const shortMatch = spotifyUrl.match(/spotify\.com\/track\/([a-zA-Z0-9]+)/);
        if (shortMatch) return shortMatch[1];
        return null;
    };

    const spotifyTrackId = currentSong.spotifyUrl ? getSpotifyTrackId(currentSong.spotifyUrl) : null;

    return (
        <>
            {/* Spotify iframe - always rendered to maintain playback */}
            {spotifyTrackId && (
                <div className={`fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 transition-all duration-300 ${isMinimized ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 pointer-events-auto scale-100'
                    }`}>
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-gray-900">Now Playing</h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleMinimize}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                    title="Minimize"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                                </button>
                                <button
                                    onClick={hideMiniPlayer}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                    title="Close"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="w-full">
                            <iframe
                                src={`https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator&autoplay=1`}
                                width="100%"
                                height="152"
                                frameBorder="0"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Minimized overlay - shows when minimized */}
            {isMinimized && spotifyTrackId && (
                <div className="fixed bottom-4 right-4 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {currentSong.spotifyThumbnail && (
                                    <img
                                        src={currentSong.spotifyThumbnail}
                                        alt={`${currentSong.songName} thumbnail`}
                                        className="w-8 h-8 rounded object-cover"
                                    />
                                )}
                                <div className="min-w-0">
                                    <h3 className="font-medium text-gray-900 text-xs truncate">
                                        {currentSong.songName}
                                    </h3>
                                    <p className="text-gray-600 text-xs truncate">
                                        {currentSong.artist}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={toggleMinimize}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                    title="Expand"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                </button>
                                <button
                                    onClick={hideMiniPlayer}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                    title="Close"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Fallback message if no Spotify URL */}
            {!spotifyTrackId && (
                <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-gray-900">Now Playing</h3>
                            <button
                                onClick={hideMiniPlayer}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                title="Close"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="text-center py-4 text-gray-500 text-sm">
                            No Spotify URL available for this song
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
