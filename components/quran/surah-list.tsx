"use client"

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import type { Surah } from '@/app/quran/page'
import { Bookmark, BookmarkCheck } from 'lucide-react'

interface SurahListProps {
  surahs: Surah[]
  isLoading: boolean
  onSelect: (surahNumber: number) => void
  showBookmarksOnly?: boolean
  searchQuery?: string
}

export function SurahList({ surahs, isLoading, onSelect, showBookmarksOnly = false, searchQuery = '' }: SurahListProps) {
  const [bookmarks, setBookmarks] = useState<number[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('quran-bookmarks')
    if (saved) {
      setBookmarks(JSON.parse(saved))
    }
  }, [])

  const toggleBookmark = (surahNum: number) => {
    // Check if any ayahs of this surah are bookmarked
    const ayahBookmarks = JSON.parse(localStorage.getItem('quran-ayah-bookmarks') || '{}')
    const surahAyahBookmarks = ayahBookmarks[surahNum] || []
    if (surahAyahBookmarks.length > 0) {
      alert('Only one of them is possible. Ayah is preferred in most cases.')
      return
    }
    
    const bookmarks = JSON.parse(localStorage.getItem('quran-bookmarks') || '[]')
    let newBookmarks
    if (bookmarks.includes(surahNum)) {
      newBookmarks = bookmarks.filter((b: number) => b !== surahNum)
    } else {
      newBookmarks = [...bookmarks, surahNum]
    }
    localStorage.setItem('quran-bookmarks', JSON.stringify(newBookmarks))
    setBookmarks(newBookmarks)
  }

  const displayedSurahs = showBookmarksOnly 
    ? surahs.filter(s => bookmarks.includes(s.number))
    : surahs

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

  if (displayedSurahs.length === 0 && searchQuery) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground mb-2">No results found.</p>
        <p className="text-sm text-muted-foreground">Check your spelling or try a different number.</p>
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
             <button
               onClick={(e) => {
                 e.stopPropagation()
                 toggleBookmark(surah.number)
               }}
               className="flex-shrink-0 hover:scale-110 transition-transform"
               title={bookmarks.includes(surah.number) ? 'Remove bookmark' : 'Bookmark surah'}
             >
               {bookmarks.includes(surah.number) ? (
                 <BookmarkCheck className="h-6 w-6 text-primary" />
               ) : (
                 <BookmarkCheck className="h-6 w-6 text-muted-foreground opacity-50" />
               )}
             </button>
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
