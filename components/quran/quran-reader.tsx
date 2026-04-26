"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Bookmark, BookmarkCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSettings } from '@/context/settings-context'
import type { Surah } from '@/app/quran/page'

export interface Ayah {
  id: string
  verse_number: number
  text_arabic: string
}

interface QuranReaderProps {
  surahNumber: number
  surahInfo?: { 
    englishName: string; 
    englishNameTranslation: string; 
    numberOfAyahs: number;
    bismillah_pre?: boolean;
  }
  surahs: Surah[]
  onBack: () => void
}

import { formatAyahNumber } from '@/lib/utils'

export default function QuranReader({ surahNumber, surahInfo, surahs, onBack }: QuranReaderProps) {
  const [ayahs, setAyahs] = useState<Ayah[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showTranslation, setShowTranslation] = useState(true)
  const [translationText, setTranslationText] = useState<Record<number, string>>({})
  const [apiBismillah, setApiBismillah] = useState<string>('')
  const [apiBismillahTrans, setApiBismillahTrans] = useState<string>('')
  
  const router = useRouter()
  const { settings, updateSettings } = useSettings()
  const [surahSearch, setSurahSearch] = useState('')
  const [showSurahDropdown, setShowSurahDropdown] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()
    let isMounted = true

    const loadAyahs = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`, {
          signal: abortController.signal,
        })
        const data = await response.json()

        const translationEdition = settings.quranTranslation || 'en.sahih'
        const transResponse = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${translationEdition}`, {
          signal: abortController.signal,
        })
        const transData = await transResponse.json()

        if (!isMounted) return

        if (data.data && data.data.ayahs) {
          const bismillah = data.data.bismillah || ''
          setApiBismillah(bismillah)

          const verses: Ayah[] = []
          const transObj: Record<number, string> = {}

          data.data.ayahs.forEach((v: any, idx: number) => {
            let text = (v.text || '').trim()
            const verseNum = v.numberInSurah || idx + 1

            if (idx === 0 && surahNumber !== 9 && bismillah) {
              const cleaned = text.replace(/^[\u200B-\u200D\uFEFF]+/, '')
              if (cleaned.startsWith(bismillah)) {
                text = cleaned.slice(bismillah.length).trim()
              }
            }

            verses.push({
              id: `${surahNumber}-${verseNum}`,
              verse_number: verseNum,
              text_arabic: text,
            })
          })

          setAyahs(verses)

          if (transData.data?.ayahs) {
            const bismillahTrans = transData.data.bismillah || ''
            setApiBismillahTrans(bismillahTrans)
            transData.data.ayahs.forEach((v: any) => {
              let trans = v.text
              if (trans && v.numberInSurah === 1 && surahNumber !== 9 && bismillahTrans) {
                const cleanedTrans = trans.replace(/^[\u200B-\u200D\uFEFF]+/, '')
                const bismillahIndex = cleanedTrans.toLowerCase().indexOf(bismillahTrans.toLowerCase())
                if (bismillahIndex !== -1) {
                  trans = cleanedTrans.slice(bismillahIndex + bismillahTrans.length).trim()
                }
              }
              if (trans) {
                transObj[v.numberInSurah] = trans
              }
            })
          }

          setTranslationText(transObj)
        }
      } catch (err) {
        if (!isMounted) return
        if (abortController.signal.aborted) return
        console.error('Failed to fetch:', err)
        setError('Failed to load surah')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadAyahs()

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [surahNumber])

  useEffect(() => {
    setShowTranslation(settings.showTranslation)
  }, [settings.showTranslation])

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('quran-bookmarks') || '[]')
    setIsBookmarked(bookmarks.includes(surahNumber))
  }, [surahNumber])

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('quran-bookmarks') || '[]')
    let newBookmarks
    if (isBookmarked) {
      newBookmarks = bookmarks.filter((b: number) => b !== surahNumber)
    } else {
      newBookmarks = [...bookmarks, surahNumber]
    }
    localStorage.setItem('quran-bookmarks', JSON.stringify(newBookmarks))
    setIsBookmarked(!isBookmarked)
  }

  const handleGotoAyah = (newSurahNumber: number) => {
    router.push(`/quran?surah=${newSurahNumber}`)
  }

  const [surahAyahBookmarks, setSurahAyahBookmarks] = useState<Record<number, number[]>>({})

  useEffect(() => {
    const ayahBookmarks = JSON.parse(localStorage.getItem('quran-ayah-bookmarks') || '{}')
    setSurahAyahBookmarks(ayahBookmarks)
  }, [])

  const toggleAyahBookmark = (ayahNum: number) => {
    const ayahBookmarks = JSON.parse(localStorage.getItem('quran-ayah-bookmarks') || '{}')
    const surahAyahs = ayahBookmarks[surahNumber] || []
    let newSurahAyahs
    if (surahAyahs.includes(ayahNum)) {
      newSurahAyahs = surahAyahs.filter((a: number) => a !== ayahNum)
    } else {
      // Check if surah is bookmarked
      const surahBookmarks = JSON.parse(localStorage.getItem('quran-bookmarks') || '[]')
      if (surahBookmarks.includes(surahNumber)) {
        alert('Only one of them is possible. Ayah is preferred in most cases.')
        return
      }
      newSurahAyahs = [...surahAyahs, ayahNum]
    }
    const newAyahBookmarks = { ...ayahBookmarks, [surahNumber]: newSurahAyahs }
    if (newSurahAyahs.length === 0) {
      delete newAyahBookmarks[surahNumber]
    }
    localStorage.setItem('quran-ayah-bookmarks', JSON.stringify(newAyahBookmarks))
    setSurahAyahBookmarks(newAyahBookmarks)
  }

  const isAyahBookmarked = (ayahNum: number) => {
    return surahAyahBookmarks[surahNumber]?.includes(ayahNum) || false
  }

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(surahSearch.toLowerCase()) ||
    s.englishNameTranslation.toLowerCase().includes(surahSearch.toLowerCase()) ||
    s.number.toString().includes(surahSearch)
  ).slice(0, 8)

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 bg-background/95 backdrop-blur z-10 border-b px-4 py-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => surahNumber > 1 && handleGotoAyah(surahNumber - 1)}
            disabled={surahNumber <= 1}
            title="Previous Surah"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-[200px]">
            <h2 className="font-semibold">{surahInfo?.englishName}</h2>
            <p className="text-sm text-muted-foreground">
              Surah {surahNumber} of 114 • {surahInfo?.numberOfAyahs} Ayahs
            </p>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => surahNumber < 114 && handleGotoAyah(surahNumber + 1)}
            disabled={surahNumber >= 114}
            title="Next Surah"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          
          <div className="relative">
            <Input
              type="text"
              placeholder="Search surah..."
              value={surahSearch}
              onChange={(e) => {
                setSurahSearch(e.target.value)
                setShowSurahDropdown(true)
              }}
              onFocus={() => setShowSurahDropdown(true)}
              className="w-40 h-8"
            />
            {showSurahDropdown && surahSearch && filteredSurahs.length > 0 && (
              <div className="absolute top-full mt-1 right-0 w-64 bg-background border rounded-md shadow-lg z-50 max-h-60 overflow-auto">
                {filteredSurahs.map((s) => (
                  <div
                    key={s.number}
                    className="px-3 py-2 cursor-pointer hover:bg-secondary flex items-center justify-between"
                    onClick={() => {
                      handleGotoAyah(s.number)
                      setSurahSearch('')
                      setShowSurahDropdown(false)
                    }}
                  >
                    <span className="font-medium">{s.englishName}</span>
                     <span className="text-muted-foreground text-sm">{formatAyahNumber(s.number, settings.ayahNumbering)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setShowTranslation(!showTranslation)
              updateSettings({ showTranslation: !showTranslation })
            }}
          >
            {showTranslation ? 'Hide' : 'Show'} Translation
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleBookmark}
            title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-5 w-5 text-primary" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
        {error && (
          <div className="text-center py-8 text-red-500">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded animate-pulse" />
            ))}
          </div>
         ) : (
          <div className="space-y-6">
            {apiBismillah && surahNumber !== 9 && (
              <div className="py-4 px-2 rounded-lg text-center">
                <p 
                  className="font-[var(--font-amiri)] leading-loose inline break-words"
                  dir="rtl"
                  style={{ fontSize: `${settings.quranFontSize}px` }}
                >
                  {apiBismillah}
                </p>
                {showTranslation && apiBismillahTrans && (
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-2 break-words">
                    {apiBismillahTrans}
                  </p>
                )}
              </div>
            )}
            {ayahs.map((ayah) => (
              <div 
                key={ayah.id} 
                id={`ayah-${ayah.verse_number}`}
                className="relative py-3 px-2 rounded-lg"
              >
                <div className="flex items-start gap-3">
                   <div className="flex-shrink-0">
                     <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-xs text-muted-foreground">
                       {formatAyahNumber(ayah.verse_number, settings.ayahNumbering)}
                     </span>
                   </div>
                  
          <div className="flex-1 text-right">
            <p 
              className="font-[var(--font-amiri)] leading-loose inline break-words"
              dir="rtl"
              style={{ fontSize: `${settings.quranFontSize}px` }}
            >
              {ayah.text_arabic}
            </p>
          </div>
                </div>

                 {showTranslation && translationText[ayah.verse_number] && (
                  <div className="mt-3 ml-11">
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed break-words">
                      {translationText[ayah.verse_number]}
                    </p>
                  </div>
                )}
                <button
                  onClick={() => toggleAyahBookmark(ayah.verse_number)}
                  className="mt-2 ml-11 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                  title={isAyahBookmarked(ayah.verse_number) ? 'Remove ayah bookmark' : 'Bookmark this ayah'}
                >
                  {isAyahBookmarked(ayah.verse_number) ? (
                    <>
                      <BookmarkCheck className="h-3.5 w-3.5" />
                      <span>Bookmarked</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-3.5 w-3.5 opacity-50" />
                      <span>Bookmark</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}