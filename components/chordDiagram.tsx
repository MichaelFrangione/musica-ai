'use client'

import { type Chord, SVGuitarChord } from 'svguitar'
import { useEffect, useRef } from 'react'
import type { ChordData } from '@/app/constants'

interface ChordDiagramProps {
    chord: ChordData;
}

export default function ChordDiagram({ chord }: ChordDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    const renderChord = () => {
        if (!containerRef.current) return

        containerRef.current.innerHTML = ''

        // Configure and draw the chord diagram
        const chart = new SVGuitarChord(containerRef.current)
            .configure({
                title: chord.title,
                strings: 6,
                frets: 4,
                position: chord.position,
                strokeWidth: 2,
                fingerTextColor: '#FFF',
            })
            .chord(chord as unknown as Chord)
            .draw()
    }

    useEffect(() => {
        renderChord()
    }, [chord])

    return (
        <div className="flex flex-col items-center">
            <div 
                ref={containerRef}
                className="flex justify-center w-32 h-40"
            />
        </div>
    )
}
