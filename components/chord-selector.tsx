'use client'

import { useState } from 'react'
import ChordDiagram from './chordDiagram'
import { chordData } from '@/app/constants'

interface ChordSelectorProps {
    onSelectionChange: (selectedChords: string[]) => void;
    onClearComplementary?: () => void;
}

export default function ChordSelector({ onSelectionChange, onClearComplementary }: ChordSelectorProps) {
    const [selectedChords, setSelectedChords] = useState<string[]>([])
    const [selectedRoot, setSelectedRoot] = useState<string | null>(null)

    const toggleChordSelection = (shortName: string) => {
        const newSelection = selectedChords.includes(shortName) 
            ? selectedChords.filter(chord => chord !== shortName)
            : [...selectedChords, shortName]
        
        setSelectedChords(newSelection)
        onSelectionChange(newSelection)
        
        // Clear complementary chords when selection changes
        if (onClearComplementary) {
            onClearComplementary()
        }
    }

    const selectRoot = (root: string) => {
        setSelectedRoot(selectedRoot === root ? null : root)
    }

    // Group chords by root note
    const chordGroups = chordData.reduce((groups, chord) => {
        const root = chord.shortName.charAt(0)
        if (!groups[root]) {
            groups[root] = { Major: null, Minor: null, '7': null, 'm7': null, 'Maj7': null }
        }
        
        if (chord.shortName === root) {
            groups[root].Major = chord
        } else if (chord.shortName === root + 'm') {
            groups[root].Minor = chord
        } else if (chord.shortName === root + '7') {
            groups[root]['7'] = chord
        } else if (chord.shortName === root + 'm7') {
            groups[root]['m7'] = chord
        } else if (chord.shortName === root + 'Maj7') {
            groups[root]['Maj7'] = chord
        }
        
        return groups
    }, {} as Record<string, { Major: any; Minor: any; '7': any; 'm7': any; 'Maj7': any }>)

    const rootNotes = Object.keys(chordGroups).sort()

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-600">Guitar Chord Selector</h1>
            <p className="text-center mb-8 text-gray-600">To get started, select a root note to see all chords for that note.</p>
            
            {/* Root Note Buttons */}
            <div className="flex justify-center gap-4 mb-8 sticky top-4 z-10 py-4">
                {rootNotes.map((root) => {
                    // Check if any chord from this root note group is selected
                    const hasSelectedChords = selectedChords.some(chord => chord.startsWith(root))
                    
                    return (
                        <button
                            key={root}
                            onClick={() => selectRoot(root)}
                            className={`px-6 py-3 text-xl font-bold rounded-lg border-2 transition-all duration-300 ${
                                selectedRoot === root
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105'
                                    : hasSelectedChords
                                    ? 'bg-green-100 text-green-700 border-green-400 hover:bg-green-200'
                                    : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:scale-102 hover:text-gray-600'
                            }`}
                        >
                            {root}
                        </button>
                    )
                })}
            </div>
            
            {/* Chord Variations Display */}
            <div className="min-h-[160px]">
                {selectedRoot && (
                    <div 
                        key={selectedRoot} 
                        className="mb-8 transform transition-all duration-500 ease-out opacity-100 translate-y-0"
                    >

                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center justify-content-center">
                                {['Major', 'Minor', '7', 'm7', 'Maj7'].map((type, index) => {
                                    const chord = chordGroups[selectedRoot][type as keyof typeof chordGroups[typeof selectedRoot]]
                                    return (
                                        <div 
                                            key={`${selectedRoot}-${type}`} 
                                            className="text-center transform transition-all duration-500 ease-out opacity-100 translate-y-0"
                                            style={{ 
                                                transitionDelay: `${index * 100}ms`,
                                                animation: `slideInUp 0.5s ease-out ${index * 100}ms both`
                                            }}
                                        >
                                            {chord ? (
                                                <div 
                                                    className="inline-block cursor-pointer transform transition-all duration-500 ease-out opacity-100 scale-100"
                                                    style={{ transitionDelay: `${index * 200}ms` }}
                                                    onClick={() => toggleChordSelection(chord.shortName)}
                                                >
                                                    <div 
                                                        className="bg-white rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md"
                                                        style={{
                                                            outline: selectedChords.includes(chord.shortName) ? '6px solid #3b82f6' : 'none',
                                                            outlineOffset: '0px'
                                                        }}
                                                    >
                                                        <ChordDiagram chord={chord}/>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-32 h-40 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-300 rounded-lg transform transition-all duration-500 ease-out opacity-100" 
                                                    style={{ transitionDelay: `${index * 200}ms` }}>
                                                    Not Available
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Selected Chords Summary */}
            {selectedChords.length > 0 && (
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-semibold text-blue-700">
                            Selected Chords ({selectedChords.length}):
                        </h2>
                        <button
                            onClick={() => {
                                setSelectedChords([])
                                onSelectionChange([])
                                if (onClearComplementary) {
                                    onClearComplementary()
                                }
                            }}
                            className="px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm font-medium hover:bg-red-200 transition-colors duration-200"
                        >
                            Clear All
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {selectedChords.map(chord => (
                            <div 
                                key={chord}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium"
                            >
                                <span>{chord}</span>
                                <button
                                    onClick={() => {
                                        const newSelection = selectedChords.filter(c => c !== chord)
                                        setSelectedChords(newSelection)
                                        onSelectionChange(newSelection)
                                        if (onClearComplementary) {
                                            onClearComplementary()
                                        }
                                    }}
                                    className="text-red-500 hover:text-red-700 text-xs font-bold hover:scale-110 transform transition-all duration-200"
                                    title={`Remove ${chord}`}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <style jsx>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    )
}