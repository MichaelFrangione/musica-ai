'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Song {
    songName: string;
    artist: string;
    spotifyUrl?: string;
    youtubeUrl?: string;
    spotifyThumbnail?: string;
    youtubeThumbnail?: string;
}

interface MiniPlayerContextType {
    currentSong: Song | null;
    isVisible: boolean;
    isMinimized: boolean;
    showMiniPlayer: (song: Song) => void;
    hideMiniPlayer: () => void;
    toggleMinimize: () => void;
}

const MiniPlayerContext = createContext<MiniPlayerContextType | undefined>(undefined);

export function MiniPlayerProvider({ children }: { children: ReactNode; }) {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const showMiniPlayer = (song: Song) => {
        setCurrentSong(song);
        setIsVisible(true);
        setIsMinimized(false);
    };

    const hideMiniPlayer = () => {
        setIsVisible(false);
        setCurrentSong(null);
        setIsMinimized(false);
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <MiniPlayerContext.Provider value={{
            currentSong,
            isVisible,
            isMinimized,
            showMiniPlayer,
            hideMiniPlayer,
            toggleMinimize,
        }}>
            {children}
        </MiniPlayerContext.Provider>
    );
}

export function useMiniPlayer() {
    const context = useContext(MiniPlayerContext);
    if (context === undefined) {
        throw new Error('useMiniPlayer must be used within a MiniPlayerProvider');
    }
    return context;
}
