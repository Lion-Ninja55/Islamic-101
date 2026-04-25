"use client"

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { SurahList } from '@/components/quran/surah-list'
import QuranReader from '@/components/quran/quran-reader'
import { QuranFacts } from '@/components/quran/quran-facts'
import { Input } from '@/components/ui/input'
import { Search, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useSettings } from '@/context/settings-context'

const AUZIBILLAH = "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ"
const BISMILLAH = "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"

export interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
  bismillah_pre?: boolean
}

interface AyahBookmark {
  [surahNumber: number]: number[]
}

function QuranPageContent() {
  const { settings, updateSettings } = useSettings()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [view, setView] = useState<'list' | 'reader'>('list')
  const [activeTab, setActiveTab] = useState<'surahs' | 'bookmarked'>('surahs')

  useEffect(() => {
    fetchSurahs()
  }, [])

  useEffect(() => {
    const surahParam = searchParams.get('surah')
    if (surahParam) {
      const surahNum = parseInt(surahParam)
      if (!isNaN(surahNum) && surahNum >= 1 && surahNum <= 114) {
        setSelectedSurah(surahNum)
        setView('reader')
      }
    }
  }, [searchParams])

  const fetchSurahs = async () => {
    try {
      const response = await fetch('https://api.alquran.cloud/v1/surah')
      const data = await response.json()
      // API returns data as array directly: { code, status, data: [...] }
      if (data.data && Array.isArray(data.data)) {
        setSurahs(data.data.map((c: any) => ({
          number: c.number,
          name: c.name,
          englishName: c.englishName,
          englishNameTranslation: c.englishNameTranslation,
          numberOfAyahs: c.numberOfAyahs,
          revelationType: c.revelationType,
          bismillah_pre: true,
        })))
      }
    } catch (error) {
      console.error('Failed to fetch surahs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredSurahs = surahs.filter(surah => 
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.number.toString().includes(searchQuery)
  )

  const [surahBookmarks, setSurahBookmarks] = useState<number[]>([])
  const [ayahBookmarks, setAyahBookmarks] = useState<AyahBookmark>({})

  useEffect(() => {
    const savedSurahBookmarks = JSON.parse(localStorage.getItem('quran-bookmarks') || '[]')
    setSurahBookmarks(savedSurahBookmarks)
    const savedAyahBookmarks = JSON.parse(localStorage.getItem('quran-ayah-bookmarks') || '{}')
    setAyahBookmarks(savedAyahBookmarks)
  }, [])

  // Get bookmarked surah objects
  const bookmarkedSurahs = surahs.filter(s => surahBookmarks.includes(s.number))

  // Get bookmarked ayah objects with surah info
    const bookmarkedAyahs = Object.entries(ayahBookmarks).flatMap(([surahNum, ayahNums]) => 
    ayahNums.map((ayahNum: number) => {
      const surah = surahs.find(s => s.number === parseInt(surahNum))
      return {
        surahNumber: parseInt(surahNum),
        surahName: surah?.englishName || '',
        surahNameArabic: surah?.name || '',
        surahTranslation: surah?.englishNameTranslation || '',
        ayahNumber: ayahNum
      }
    })
  )

  const handleSurahSelect = (surahNumber: number) => {
    setSelectedSurah(surahNumber)
    setView('reader')
  }

  const handleBackToList = () => {
    setView('list')
    setSelectedSurah(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container px-4 py-6">
        {view === 'list' ? (
          <>
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-border pb-4">
              <button
                onClick={() => setActiveTab('surahs')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'surahs'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                All Surahs
              </button>
              <button
                onClick={() => setActiveTab('bookmarked')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'bookmarked'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Bookmarked ({surahBookmarks.length + Object.values(ayahBookmarks).reduce((a, b) => a + b.length, 0)})
              </button>
            </div>

            {activeTab === 'bookmarked' ? (
              <>
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-2">Bookmarked</h1>
                  <p className="text-muted-foreground">
                    Your saved surahs and ayahs
                  </p>
                </div>

                      {surahBookmarks.length === 0 && Object.keys(ayahBookmarks).length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground mb-2">No bookmarks yet</p>
                    <p className="text-sm text-muted-foreground">Start bookmarking surahs and ayahs from the All Surahs tab</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Bookmarked Surahs */}
                    {surahBookmarks.length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold mb-4">Surahs ({surahBookmarks.length})</h2>
                        <SurahList 
                          surahs={bookmarkedSurahs} 
                          isLoading={isLoading}
                          onSelect={handleSurahSelect}
                          showBookmarksOnly={true}
                        />
                      </div>
                    )}

                    {/* Bookmarked Ayahs */}
                    {Object.keys(ayahBookmarks).length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold mb-4">Ayahs ({Object.values(ayahBookmarks).reduce((a, b) => a + b.length, 0)})</h2>
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                          {bookmarkedAyahs.map((item, idx) => (
                            <Card 
                              key={`${item.surahNumber}-${item.ayahNumber}-${idx}`}
                              className="p-4 cursor-pointer hover:bg-secondary/50 transition-colors"
                              onClick={() => {
                                setSelectedSurah(item.surahNumber)
                                setView('reader')
                                // Scroll to ayah after a short delay
                                setTimeout(() => {
                                  const el = document.getElementById(`ayah-${item.ayahNumber}`)
                                  if (el) {
                                    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                                    el.style.background = 'var(--accent)'
                                    el.style.borderRadius = '8px'
                                    setTimeout(() => {
                                      el.style.background = ''
                                      el.style.borderRadius = ''
                                    }, 2000)
                                  }
                                }, 100)
                              }}
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm flex-shrink-0">
                                  {item.ayahNumber}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold truncate">{item.surahName}</h3>
                                    <span className="font-[var(--font-amiri)] text-sm text-primary" dir="rtl">
                                      {item.surahNameArabic}
                                    </span>
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    Ayah {item.ayahNumber} · {item.surahTranslation}
                                  </p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary flex-shrink-0 mt-0.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Header with Auzibillah and Bismillah */}
                <Card className="mb-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center justify-center gap-8 flex-wrap">
                      <div className="text-right">
                        <p 
                          className="font-[var(--font-amiri)] text-2xl md:text-3xl lg:text-4xl" 
                          dir="rtl"
                          style={{ fontSize: `${settings.quranFontSize}px` }}
                        >
                          {AUZIBILLAH}
                        </p>
                      </div>
                      <div className="text-right">
                        <p 
                          className="font-[var(--font-amiri)] text-2xl md:text-3xl lg:text-4xl" 
                          dir="rtl"
                          style={{ fontSize: `${settings.quranFontSize}px` }}
                        >
                          {BISMILLAH}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-2">Holy Quran</h1>
                  <p className="text-muted-foreground">
                    Select a Surah to begin reading
                  </p>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by surah name or number..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <SurahList 
                  surahs={filteredSurahs} 
                  isLoading={isLoading}
                  onSelect={handleSurahSelect}
                  searchQuery={searchQuery}
                />
                
                <QuranFacts />
              </>
            )}
          </>
        ) : (
          <QuranReader 
            surahNumber={selectedSurah!}
            surahInfo={surahs.find(s => s.number === selectedSurah) ? {
              englishName: surahs.find(s => s.number === selectedSurah)!.englishName,
              englishNameTranslation: surahs.find(s => s.number === selectedSurah)!.englishNameTranslation,
              numberOfAyahs: surahs.find(s => s.number === selectedSurah)!.numberOfAyahs,
              bismillah_pre: surahs.find(s => s.number === selectedSurah)!.bismillah_pre
            } : undefined}
            surahs={surahs}
            onBack={handleBackToList}
          />
        )}
      </main>
    </div>
  )
}

function QuranLoadingFallback() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container px-4 py-6">
        <div className="mb-8">
          <div className="h-8 w-48 bg-muted rounded animate-pulse mb-2" />
          <div className="h-4 w-64 bg-muted rounded animate-pulse" />
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </main>
    </div>
  )
}

export default function QuranPage() {
  return (
    <Suspense fallback={<QuranLoadingFallback />}>
      <QuranPageContent />
    </Suspense>
  )
}
