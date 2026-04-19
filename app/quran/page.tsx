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

function QuranPageContent() {
  const { settings, updateSettings } = useSettings()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [view, setView] = useState<'list' | 'reader'>('list')

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
