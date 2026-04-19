"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSettings } from '@/context/settings-context'

const translations = [
  // English translations
  { value: 'en.sahih', label: 'Sahih International (English)' },
  { value: 'en.asad', label: 'Muhammad Asad (English)' },
  { value: 'en.pickthall', label: 'Marmaduke Pickthall (English)' },
  { value: 'en.yusufali', label: 'Abdullah Yusuf Ali (English)' },
  { value: 'en.shakir', label: 'Mohammad Habib Shakir (English)' },
  { value: 'en.hilali', label: 'Hilali & Khan (English)' },
  { value: 'en.arberry', label: 'Arthur John Arberry (English)' },
  { value: 'en.daryabadi', label: 'Ahmed Ali (English)' },
  { value: 'en.qaribullah', label: 'Talal Itani (English)' },
  { value: 'en.maududi', label: 'Abul Ala Maududi (English)' },
  // Urdu translations
  { value: 'ur.ahmedali', label: 'Ahmed Ali (Urdu)' },
  { value: 'ur.jalandhry', label: 'Fateh Muhammad Jalandhry (Urdu)' },
  { value: 'ur.maududi', label: 'Abul Ala Maududi (Urdu)' },
  // Other languages
  { value: 'bn.bengali', label: 'Muhiuddin Khan (Bengali)' },
  { value: 'id.indonesian', label: 'Indonesian Ministry (Indonesian)' },
  { value: 'tr.diyanet', label: 'Diyanet Isleri (Turkish)' },
  { value: 'fr.hamidullah', label: 'Muhammad Hamidullah (French)' },
  { value: 'de.aburida', label: 'Abu Rida (German)' },
  { value: 'es.cortes', label: 'Julio Cortes (Spanish)' },
  { value: 'ru.kuliev', label: 'Elmir Kuliev (Russian)' },
  { value: 'it.piacenza', label: 'Italian (Hamza Roberto)' },
  { value: 'nl.suhail', label: 'Dutch (Suhail)' },
  { value: 'fa.ansarian', label: 'Hussein Towsifizadeh (Persian)' },
  { value: 'zh.majian', label: 'Ma Jian (Chinese)' },
  { value: 'ja.kobayashi', label: 'Japanese (Kobayashi)' },
  { value: 'ml.abdulhaq', label: 'Abdul Haq (Malayalam)' },
  { value: 'sw.barwani', label: 'Ali Rajab Barwani (Swahili)' },
  { value: 'am.samat', label: 'Dinberu Semat (Amharic)' },
]

const reciters = [
  { value: 'ar.alafasy', label: 'Mishary Rashid Alafasy' },
  { value: 'ar.abdulbasit', label: 'Abdul Basit Abdul Samad' },
  { value: 'ar.abdurrahmaansudais', label: 'Abdurrahman As-Sudais' },
  { value: 'ar.hudhaify', label: 'Ali Al-Hudhaify' },
  { value: 'ar.mahermuaiqly', label: 'Maher Al-Muaiqly' },
  { value: 'ar.minshawi', label: 'Mohamed Siddiq El-Minshawi' },
  { value: 'ar.muhammadayyoub', label: 'Muhammad Ayyoub' },
  { value: 'ar.muhammadjibreel', label: 'Muhammad Jibreel' },
  { value: 'ar.saaborimawaddh', label: 'Saood Al-Shuraim' },
  { value: 'ar.ghamdi', label: 'Saad Al-Ghamdi' },
  { value: 'ar.buhairi', label: 'Abdul Aziz Buheiri' },
  { value: 'ar.husary', label: 'Mahmoud Khalil Al-Husary' },
  { value: 'ar.mishary', label: 'Mishary Al-Afasy (Murattal)' },
  { value: 'ar.qubail', label: 'Ali Jaber' },
  { value: 'ar.ghamdi_mujamdi', label: 'Saad Al-Ghamdi (Mujamdi)' },
  { value: 'ar.husary_muallim', label: 'Mahmoud Khalil Al-Husary (Muallim)' },
]

export function QuranSettings() {
  const { settings, updateSettings } = useSettings()

  return (
    <div className="space-y-6">
      {/* Display Settings */}
      <Card className="overflow-hidden border-primary/10">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="font-[var(--font-amiri)] text-primary text-lg">أ</span>
            </div>
            <div>
              <CardTitle>Display</CardTitle>
              <CardDescription>
                Customize how Quran text appears
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Font Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Arabic Font Size</Label>
              <span className="text-sm text-muted-foreground">{settings.quranFontSize}px</span>
            </div>
            <Slider
              value={[settings.quranFontSize]}
              min={18}
              max={48}
              step={2}
              onValueChange={([value]) => updateSettings({ quranFontSize: value })}
              className="max-w-md"
            />
            <p 
              className="font-[var(--font-amiri)] text-right mt-4 p-4 rounded-lg bg-secondary/50" 
              dir="rtl"
              style={{ fontSize: `${settings.quranFontSize}px` }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>

          {/* Line Spacing */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Line Spacing</Label>
              <span className="text-sm text-muted-foreground">{settings.linesPerPage} lines/page</span>
            </div>
            <Slider
              value={[settings.linesPerPage]}
              min={8}
              max={20}
              step={2}
              onValueChange={([value]) => updateSettings({ linesPerPage: value })}
              className="max-w-md"
            />
          </div>
        </CardContent>
      </Card>

      {/* Translation Settings */}
      <Card className="overflow-hidden border-accent/20">
        <CardHeader className="bg-gradient-to-r from-accent/10 to-transparent border-b border-accent/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <span className="text-sm font-semibold">EN</span>
            </div>
            <div>
              <CardTitle>Translation</CardTitle>
              <CardDescription>
                Choose translation language and display
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Translation</Label>
              <p className="text-sm text-muted-foreground">
                Display translation below Arabic text
              </p>
            </div>
            <Switch
              checked={settings.showTranslation}
              onCheckedChange={(checked) => updateSettings({ showTranslation: checked })}
            />
          </div>

          <div className="space-y-3">
            <Label>Translation Language</Label>
            <Select
              value={settings.quranTranslation}
              onValueChange={(value) => updateSettings({ quranTranslation: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select translation" />
              </SelectTrigger>
              <SelectContent>
                {translations.map((translation) => (
                  <SelectItem key={translation.value} value={translation.value}>
                    {translation.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Transliteration</Label>
              <p className="text-sm text-muted-foreground">
                Display Arabic transliteration in Latin script
              </p>
            </div>
            <Switch
              checked={settings.showTransliteration}
              onCheckedChange={(checked) => updateSettings({ showTransliteration: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Ayah Numbering & Recitation */}
      <Card className="overflow-hidden border-accent/20">
        <CardHeader className="bg-gradient-to-r from-accent/10 to-transparent border-b border-accent/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <span className="text-sm font-semibold">#</span>
            </div>
            <div>
              <CardTitle>Ayah Numbering</CardTitle>
              <CardDescription>
                Choose how verse numbers are displayed
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Numbering Language</Label>
            <Select
              value={settings.ayahNumbering}
              onValueChange={(value: 'arabic' | 'urdu' | 'english') => updateSettings({ ayahNumbering: value })}
            >
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Select numbering language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English (1, 2, 3...)</SelectItem>
                <SelectItem value="arabic">Arabic (١، ٢، ٣...)</SelectItem>
                <SelectItem value="urdu">Urdu (۱، ۲، ۳...)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Select the script for displaying Ayah (verse) numbers
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quran Information */}
      <Card className="overflow-hidden border-primary/10">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-lg">📖</span>
            </div>
            <div>
              <CardTitle>Quran Information</CardTitle>
              <CardDescription>
                About the Holy Quran
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 rounded-lg bg-secondary/50">
              <span className="text-muted-foreground">Chapters</span>
              <p className="text-lg font-semibold">114 Surahs</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <span className="text-muted-foreground">Verses</span>
              <p className="text-lg font-semibold">6,236 Ayahs</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <span className="text-muted-foreground">Sections</span>
              <p className="text-lg font-semibold">30 Juz</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <span className="text-muted-foreground">Words</span>
              <p className="text-lg font-semibold">~77,430</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            The Quran was revealed to Prophet Muhammad (peace be upon him) over 23 years.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}