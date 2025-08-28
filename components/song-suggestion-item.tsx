'use client';

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

interface SongSuggestionItemProps {
    song: Song;
}

export default function SongSuggestionItem({ song }: SongSuggestionItemProps) {
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
        <div className="bg-white rounded-2xl border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 min-h-[320px] flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 text-white min-h-[100px] flex items-center">
                <div className="flex items-start justify-between w-full">
                    <h3 className="text-lg font-bold line-clamp-2 flex-1 mr-3">{song.songName}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border-2 border-white/30 ${getDifficultyColor(song.difficulty)} flex-shrink-0`}>
                        {song.difficulty}
                    </span>
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-lg text-gray-800 font-bold">{song.artist}</p>
                    {song.key && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full border border-blue-200">
                            {song.key}
                        </span>
                    )}
                </div>

                {song.chordProgression && song.chordProgression.length > 0 && (
                    <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Chord Progression:</p>
                        <div className="flex flex-wrap gap-2">
                            {song.chordProgression.map((chord, index) => (
                                <span
                                    key={`${song.artist}-${song.songName}-${chord}-${index}`}
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
    );
}
