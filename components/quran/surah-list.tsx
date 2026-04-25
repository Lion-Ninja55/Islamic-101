"use client"

import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import type { Surah } from '@/app/quran/page'

interface SurahListProps {
  surahs: Surah[]
  isLoading: boolean
  onSelect: (surahNumber: number) => void
}

export function SurahList({ surahs, isLoading, onSelect }: SurahListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {surahs.map((surah) => (
        <Card 
          key={surah.number}
          className="p-4 cursor-pointer hover:bg-secondary/50 transition-colors"
          onClick={() => onSelect(surah.number)}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold">
              {surah.number}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate">{surah.englishName}</h3>
                <span className="font-[var(--font-amiri)] text-lg text-primary" dir="rtl">
                  {surah.name}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {surah.englishNameTranslation}
              </p>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="mb-1">
                {surah.numberOfAyahs} Ayahs
              </Badge>
              <p className="text-xs text-muted-foreground capitalize">
                {surah.revelationType}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
