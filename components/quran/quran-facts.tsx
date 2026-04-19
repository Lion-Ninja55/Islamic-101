"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb } from 'lucide-react'

interface QuranFact {
  fact: string
  note?: string
  reliable: boolean
}

const quranFacts: QuranFact[] = [
  { fact: 'The Quran has 114 chapters (Surahs)', reliable: true },
  { fact: 'The Quran has 6,236 verses (Ayahs)', reliable: true },
  { fact: 'The Quran has 30 sections (Juz)', reliable: true },
  { fact: 'Surah Al-Fatiha is the first chapter of the Quran', reliable: true },
  { fact: 'Surah Al-Baqarah is the longest chapter with 286 verses', reliable: true },
  { fact: 'Surah Al-Kawthar is the shortest chapter with 3 verses', reliable: true },
  { fact: 'The Quran was revealed over 23 years', reliable: true },
  { fact: 'The Quran was revealed to Prophet Muhammad (peace be upon him)', reliable: true },
  { fact: 'The Quran was revealed in Mecca and Medina', reliable: true },
  { fact: 'The Quran uses the Basmala (Bismillah) except in Surah At-Tawbah', reliable: true },
  { fact: 'There are 14 sajdah (prostration) verses in the Quran', reliable: true, note: 'Some scholars count 14, others count 15' },
  { fact: 'Surah Al-Fatiha is also known as the "Mother of the Book"', reliable: true },
  { fact: 'The Quran is written in Arabic language', reliable: true },
  { fact: 'The Quran has approximately 77,430 words', reliable: true },
  { fact: 'The Quran has approximately 323,671 letters', reliable: true },
  { fact: 'The first revelation was Surah Al-Alaq (96:1-5)', reliable: true },
  { fact: 'Surah At-Tawbah is the only Surah that does not begin with Bismillah', reliable: true },
  { fact: 'The Quran mentions 25 prophets by name', reliable: true },
  { fact: 'The word "Quran" appears 70 times in the Quran itself', reliable: true },
  { fact: 'The first word revealed was "Read" (Iqra)', reliable: true },
  { fact: 'The Quran was compiled in a single manuscript during Caliphate of Abu Bakr', reliable: true },
  { fact: 'The Quran is also known as "Al-Kitab" (The Book)', reliable: true },
  { fact: 'Surah Al-Ikhlas is equal to one-third of the Quran in reward', reliable: true },
  { fact: 'The Quran has 77 pages in the standard print edition', reliable: true },
  { fact: 'The Quran uses various literary styles including poetry, prose, and law', reliable: true },
  { fact: 'The Quran addresses all of humanity, not just Muslims', reliable: true },
  { fact: 'The Quran was preserved through both oral transmission and written manuscripts', reliable: true },
  { fact: 'The word "Allah" appears 2,697 times in the Quran', reliable: true },
  { fact: 'Surah Al-Mulk (67) is recommended to be read before sleeping', reliable: true },
  { fact: 'The Quran has 114 names according to hadith', reliable: true },
]

export function QuranFacts() {
  const [dailyFact, setDailyFact] = useState<QuranFact | null>(null)

  useEffect(() => {
    const today = new Date()
    const startOfYear = new Date(today.getFullYear(), 0, 0)
    const diff = today.getTime() - startOfYear.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const dayOfYear = Math.floor(diff / oneDay)
    const factIndex = dayOfYear % quranFacts.length
    setDailyFact(quranFacts[factIndex])
  }, [])

  if (!dailyFact) return null

  return (
    <Card className="mt-8 border-amber-500/20 bg-amber-500/5">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          <CardTitle className="text-lg">Daily Quran Fact</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-base font-medium mb-2">{dailyFact.fact}</p>
        {dailyFact.note && (
          <p className="text-sm text-muted-foreground italic mb-2">
            Note: {dailyFact.note}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Note: Some of these facts may be partially accurate. Double check other sources for more accurate information.
        </p>
      </CardContent>
    </Card>
  )
}