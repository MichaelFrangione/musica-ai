import type { Chord } from "svguitar";

export interface ChordData extends Chord {
    shortName: string
}

export const chordData: ChordData[] = [
    {
        title: 'A Major',
        shortName: 'A',
        fingers: [[2, 2], [3, 2], [4, 2], [5, 0], [6, 'x']],
        barres: [{ fromString: 4, toString: 2, fret: 2 }], // Barre across D, G, B strings
        position: 1,
    },
    {
        title: 'A Minor',
        shortName: 'Am',
        fingers: [[2, 1], [3, 2], [4, 2], [5, 0], [6, 'x']],
        barres: [], // No barre
        position: 1,
    },
    {
        title: 'B Major',
        shortName: 'B',
        fingers: [[1, 2], [2, 4], [3, 4], [4, 4], [5, 2], [6, 'x']],
        barres: [{ fromString: 5, toString: 1, fret: 2 }], // Barre across A, D, G, B, E strings
        position: 1,
    },
    {
        title: 'B Minor',
        shortName: 'Bm',
        fingers: [[1, 2], [2, 3], [3, 4], [4, 4], [5, 2], [6, 'x']],
        barres: [{ fromString: 5, toString: 1, fret: 2 }], // Barre across A, D, G, B, E strings
        position: 1,
    },
    {
        title: 'C Major',
        shortName: 'C',
        fingers: [[1, 0], [2, 1], [3, 0], [4, 2], [5, 3], [6, 'x']],
        barres: [], // No barre
        position: 1,
    },
    {
        title: 'C Minor',
        shortName: 'Cm',
        fingers: [[1, 3], [2, 4], [3, 5], [4, 5], [5, 3], [6, 'x']],
        barres: [{ fromString: 5, toString: 1, fret: 3 }], // Barre across A, D, G, B, E strings
        position: 3,
    },
    {
        title: 'D Major',
        shortName: 'D',
        fingers: [[1, 2], [2, 3], [3, 2], [4, 0], [5, 'x'], [6, 'x']],
        barres: [], // No barre
        position: 1,
    },
    {
        title: 'D Minor',
        shortName: 'Dm',
        fingers: [[1, 1], [2, 3], [3, 2], [4, 0], [5, 'x'], [6, 'x']],
        barres: [], // No barre
        position: 1,
    },
    {
        title: 'E Major',
        shortName: 'E',
        fingers: [[1, 0], [2, 0], [3, 1], [4, 2], [5, 2], [6, 0]],
        barres: [], // No barre
        position: 1,
    },
    {
        title: 'E Minor',
        shortName: 'Em',
        fingers: [[1, 0], [2, 0], [3, 0], [4, 2], [5, 2], [6, 0]],
        barres: [], // No barre
        position: 1,
    },
    {
        title: 'F Major',
        shortName: 'F',
        fingers: [[1, 1], [2, 1], [3, 2], [4, 3], [5, 3], [6, 1]],
        barres: [{ fromString: 6, toString: 1, fret: 1 }], // Barre across all strings
        position: 1,
    },
    {
        title: 'F Minor',
        shortName: 'Fm',
        fingers: [[1, 1], [2, 1], [3, 1], [4, 3], [5, 3], [6, 1]],
        barres: [{ fromString: 6, toString: 1, fret: 1 }], // Barre across all strings
        position: 1,
    },
    {
        title: 'G Major',
        shortName: 'G',
        fingers: [[1, 3], [2, 0], [3, 0], [4, 0], [5, 2], [6, 3]],
        barres: [], // No barre
        position: 1,
    },
    {
        title: 'G Minor',
        shortName: 'Gm',
        fingers: [[5,3], [4,3]],
        barres: [{ fromString: 5, toString: 1, fret: 1 }], // Barre across A, D, G, B, E strings
        position: 3,
    },
    // Minor 7th chords
    {
        title: 'A Minor 7',
        shortName: 'Am7',
        fingers: [[1, 0], [2, 0], [3, 2], [4, 2], [5, 1], [6, 'x']],
        barres: [],
        position: 1,
    },
    {
        title: 'E Minor 7',
        shortName: 'Em7',
        fingers: [[1, 0], [2, 0], [3, 0], [4, 2], [5, 2], [6, 0]],
        barres: [],
        position: 1,
    },
    {
        title: 'D Minor 7',
        shortName: 'Dm7',
        fingers: [[1, 1], [2, 3], [3, 2], [4, 0], [5, 'x'], [6, 'x']],
        barres: [],
        position: 1,
    },
    {
        title: 'B Minor 7',
        shortName: 'Bm7',
        fingers: [[1, 2], [2, 3], [3, 4], [4, 4], [5, 2], [6, 'x']],
        barres: [{ fromString: 5, toString: 1, fret: 2 }], // Barre across A, D, G, B, E strings
        position: 1,
    },
    // Dominant 7th chords
    {
        title: 'A7',
        shortName: 'A7',
        fingers: [[1, 0], [2, 2], [3, 0], [4, 2], [5, 0], [6, 'x']],
        barres: [],
        position: 1,
    },
    {
        title: 'E7',
        shortName: 'E7',
        fingers: [[1, 0], [2, 0], [3, 1], [4, 0], [5, 2], [6, 0]],
        barres: [],
        position: 1,
    },
    {
        title: 'D7',
        shortName: 'D7',
        fingers: [[1, 2], [2, 1], [3, 2], [4, 0], [5, 'x'], [6, 'x']],
        barres: [],
        position: 1,
    },
    {
        title: 'G7',
        shortName: 'G7',
        fingers: [[1, 3], [2, 0], [3, 0], [4, 0], [5, 2], [6, 3]],
        barres: [],
        position: 1,
    },
    {
        title: 'C7',
        shortName: 'C7',
        fingers: [[1, 0], [2, 1], [3, 0], [4, 2], [5, 3], [6, 'x']],
        barres: [],
        position: 1,
    },
    // Major 7th chords
    {
        title: 'C Major 7',
        shortName: 'CMaj7',
        fingers: [[1, 0], [2, 1], [3, 0], [4, 2], [5, 0], [6, 'x']],
        barres: [],
        position: 1,
    },
    {
        title: 'G Major 7',
        shortName: 'GMaj7',
        fingers: [[1, 3], [2, 0], [3, 0], [4, 0], [5, 2], [6, 2]],
        barres: [],
        position: 1,
    },
    {
        title: 'D Major 7',
        shortName: 'DMaj7',
        fingers: [[1, 2], [2, 3], [3, 2], [4, 0], [5, 'x'], [6, 'x']],
        barres: [],
        position: 1,
    },
    {
        title: 'A Major 7',
        shortName: 'AMaj7',
        fingers: [[1, 0], [2, 2], [3, 2], [4, 2], [5, 0], [6, 'x']],
        barres: [],
        position: 1,
    },
    {
        title: 'E Major 7',
        shortName: 'EMaj7',
        fingers: [[1, 0], [2, 0], [3, 1], [4, 1], [5, 2], [6, 0]],
        barres: [],
        position: 1,
    },
    {
        title: 'F Major 7',
        shortName: 'FMaj7',
        fingers: [[1, 1], [2, 1], [3, 2], [4, 3], [5, 3], [6, 1]],
        barres: [{ fromString: 6, toString: 1, fret: 1 }], // Barre across all strings
        position: 1,
    },
    // Additional missing chords
    {
        title: 'B Major 7',
        shortName: 'BMaj7',
        fingers: [[1, 2], [2, 4], [3, 4], [4, 4], [5, 2], [6, 'x']],
        barres: [{ fromString: 5, toString: 1, fret: 2 }], // Barre across A, D, G, B, E strings
        position: 1,
    },
    {
        title: 'B7',
        shortName: 'B7',
        fingers: [[1, 2], [2, 4], [3, 4], [4, 4], [5, 2], [6, 'x']],
        barres: [{ fromString: 5, toString: 1, fret: 2 }], // Barre across A, D, G, B, E strings
        position: 1,
    },
    {
        title: 'C Minor 7',
        shortName: 'Cm7',
        fingers: [[1, 3], [2, 4], [3, 5], [4, 5], [5, 3], [6, 'x']],
        barres: [{ fromString: 5, toString: 1, fret: 3 }], // Barre across A, D, G, B, E strings
        position: 3,
    },
    {
        title: 'F7',
        shortName: 'F7',
        fingers: [[1, 1], [2, 1], [3, 2], [4, 3], [5, 3], [6, 1]],
        barres: [{ fromString: 6, toString: 1, fret: 1 }], // Barre across all strings
        position: 1,
    },
    {
        title: 'F Minor 7',
        shortName: 'Fm7',
        fingers: [[1, 1], [2, 1], [3, 1], [4, 3], [5, 3], [6, 1]],
        barres: [{ fromString: 6, toString: 1, fret: 1 }], // Barre across all strings
        position: 1,
    },
    {
        title: 'G Minor 7',
        shortName: 'Gm7',
        fingers: [[1, 3], [2, 3], [3, 3], [4, 5], [5, 5], [6, 'x']],
        barres: [{ fromString: 5, toString: 1, fret: 3 }], // Barre across A, D, G, B, E strings
        position: 1,
    },
    // Sharp chords - F#
    {
        title: 'F# Major',
        shortName: 'F#',
        fingers: [[1, 2], [2, 2], [3, 3], [4, 4], [5, 4], [6, 2]],
        barres: [{ fromString: 6, toString: 1, fret: 2 }], // Barre across all strings
        position: 2,
    },
    {
        title: 'F# Minor',
        shortName: 'F#m',
        fingers: [[1, 2], [2, 2], [3, 2], [4, 4], [5, 4], [6, 2]],
        barres: [{ fromString: 6, toString: 1, fret: 2 }], // Barre across all strings
        position: 2,
    },
    {
        title: 'F#7',
        shortName: 'F#7',
        fingers: [[1, 2], [2, 2], [3, 3], [4, 4], [5, 4], [6, 2]],
        barres: [{ fromString: 6, toString: 1, fret: 2 }], // Barre across all strings
        position: 2,
    },
    {
        title: 'F# Minor 7',
        shortName: 'F#m7',
        fingers: [[1, 2], [2, 2], [3, 2], [4, 4], [5, 4], [6, 2]],
        barres: [{ fromString: 6, toString: 1, fret: 2 }], // Barre across all strings
        position: 2,
    },
    {
        title: 'F# Major 7',
        shortName: 'F#Maj7',
        fingers: [[1, 2], [2, 2], [3, 3], [4, 4], [5, 4], [6, 2]],
        barres: [{ fromString: 6, toString: 1, fret: 2 }], // Barre across all strings
        position: 2,
    },
    // Sharp chords - G#
    {
        title: 'G# Major',
        shortName: 'G#',
        fingers: [[1, 3], [2, 3], [3, 4], [4, 5], [5, 5], [6, 3]],
        barres: [{ fromString: 6, toString: 1, fret: 3 }], // Barre across all strings
        position: 3,
    },
    {
        title: 'G# Minor',
        shortName: 'G#m',
        fingers: [[1, 3], [2, 3], [3, 3], [4, 5], [5, 5], [6, 3]],
        barres: [{ fromString: 6, toString: 1, fret: 3 }], // Barre across all strings
        position: 3,
    },
    {
        title: 'G#7',
        shortName: 'G#7',
        fingers: [[1, 3], [2, 3], [3, 4], [4, 5], [5, 5], [6, 3]],
        barres: [{ fromString: 6, toString: 1, fret: 3 }], // Barre across all strings
        position: 3,
    },
    {
        title: 'G# Minor 7',
        shortName: 'G#m7',
        fingers: [[1, 3], [2, 3], [3, 3], [4, 5], [5, 5], [6, 3]],
        barres: [{ fromString: 6, toString: 1, fret: 3 }], // Barre across all strings
        position: 3,
    },
    {
        title: 'G# Major 7',
        shortName: 'G#Maj7',
        fingers: [[1, 3], [2, 3], [3, 4], [4, 5], [5, 5], [6, 3]],
        barres: [{ fromString: 6, toString: 1, fret: 3 }], // Barre across all strings
        position: 3,
    },
    // Sharp chords - A#
    {
        title: 'A# Major',
        shortName: 'A#',
        fingers: [[1, 1], [2, 1], [3, 2], [4, 3], [5, 3], [6, 1]],
        barres: [{ fromString: 6, toString: 1, fret: 1 }], // Barre across all strings
        position: 1,
    },
    {
        title: 'A# Minor',
        shortName: 'A#m',
        fingers: [[1, 1], [2, 1], [3, 1], [4, 3], [5, 3], [6, 1]],
        barres: [{ fromString: 6, toString: 1, fret: 1 }], // Barre across all strings
        position: 1,
    },
    {
        title: 'A#7',
        shortName: 'A#7',
        fingers: [[1, 1], [2, 1], [3, 2], [4, 3], [5, 3], [6, 1]],
        barres: [{ fromString: 6, toString: 1, fret: 1 }], // Barre across all strings
        position: 1,
    },
    {
        title: 'A# Minor 7',
        shortName: 'A#m7',
        fingers: [[1, 1], [2, 1], [3, 1], [4, 3], [5, 3], [6, 1]],
        barres: [{ fromString: 6, toString: 1, fret: 1 }], // Barre across all strings
        position: 1,
    },
    {
        title: 'A# Major 7',
        shortName: 'A#Maj7',
        fingers: [[1, 1], [2, 1], [3, 2], [4, 3], [5, 3], [6, 1]],
        barres: [{ fromString: 6, toString: 1, fret: 1 }], // Barre across all strings
        position: 1,
    },
    // Sharp chords - C#
    {
        title: 'C# Major',
        shortName: 'C#',
        fingers: [[1, 1], [2, 2], [3, 1], [4, 3], [5, 4], [6, 'x']],
        barres: [],
        position: 1,
    },
    {
        title: 'C# Minor',
        shortName: 'C#m',
        fingers: [[1, 4], [2, 5], [3, 6], [4, 6], [5, 4], [6, 'x']],
        barres: [{ fromString: 5, toString: 1, fret: 4 }], // Barre across A, D, G, B, E strings
        position: 4,
    },
    {
        title: 'C#7',
        shortName: 'C#7',
        fingers: [[1, 1], [2, 2], [3, 1], [4, 3], [5, 4], [6, 'x']],
        barres: [],
        position: 1,
    },
    {
        title: 'C# Minor 7',
        shortName: 'C#m7',
        fingers: [[1, 4], [2, 5], [3, 6], [4, 6], [5, 4], [6, 'x']],
        barres: [{ fromString: 5, toString: 1, fret: 4 }], // Barre across A, D, G, B, E strings
        position: 4,
    },
    {
        title: 'C# Major 7',
        shortName: 'C#Maj7',
        fingers: [[1, 1], [2, 2], [3, 1], [4, 3], [5, 1], [6, 'x']],
        barres: [],
        position: 1,
    },
    // Sharp chords - D#
    {
        title: 'D# Major',
        shortName: 'D#',
        fingers: [[1, 3], [2, 4], [3, 3], [4, 1], [5, 'x'], [6, 'x']],
        barres: [],
        position: 1,
    },
    {
        title: 'D# Minor',
        shortName: 'D#m',
        fingers: [[1, 2], [2, 4], [3, 3], [4, 1], [5, 'x'], [6, 'x']],
        barres: [],
        position: 1,
    },
    {
        title: 'D#7',
        shortName: 'D#7',
        fingers: [[1, 3], [2, 4], [3, 3], [4, 1], [5, 'x'], [6, 'x']],
        barres: [],
        position: 1,
    },
    {
        title: 'D# Minor 7',
        shortName: 'D#m7',
        fingers: [[1, 2], [2, 4], [3, 3], [4, 1], [5, 'x'], [6, 'x']],
        barres: [],
        position: 1,
    },
    {
        title: 'D# Major 7',
        shortName: 'D#Maj7',
        fingers: [[1, 3], [2, 4], [3, 3], [4, 1], [5, 'x'], [6, 'x']],
        barres: [],
        position: 1,
    },
]