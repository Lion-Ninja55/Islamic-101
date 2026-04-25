"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface Settings {
  // Accent Color
  accentColor: string
  
  // Quran Settings
  quranFontSize: number
  quranTranslation: string
  quranReciter: string
  showTranslation: boolean
  ayahNumbering: 'arabic' | 'urdu' | 'english'
  
  // Salah Settings
  calculationMethod: string
  asrJuristic: 'standard' | 'hanafi'
  highLatitudeRule: string
  midnightMode: 'standard' | 'jafari'
  adjustments: {
    fajr: number
    sunrise: number
    dhuhr: number
    asr: number
    maghrib: number
    isha: number
  }
  notifications: {
    enabled: boolean
    fajr: boolean
    sunrise: boolean
    dhuhr: boolean
    asr: boolean
    maghrib: boolean
    isha: boolean
    beforeAdhan: number
  }
  
  // Location
  location: {
    latitude: number | null
    longitude: number | null
    city: string
    country: string
    timezone: string
  }
  
  // General
  hijriAdjustment: number
  timeFormat: '12h' | '24h'
  dateFormat: string
}

const defaultSettings: Settings = {
  // Accent Color
  accentColor: 'green',
  
  // Quran Settings
  quranFontSize: 28,
  quranTranslation: 'en.sahih',
  quranReciter: 'ar.alafasy',
  showTranslation: true,
  ayahNumbering: 'english',
  
  // Salah Settings
  calculationMethod: '2', // ISNA
  asrJuristic: 'standard',
  highLatitudeRule: 'angle',
  midnightMode: 'standard',
  adjustments: {
    fajr: 0,
    sunrise: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0,
  },
  notifications: {
    enabled: false,
    fajr: true,
    sunrise: false,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
    beforeAdhan: 15,
  },
  
  // Location
  location: {
    latitude: null,
    longitude: null,
    city: '',
    country: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
  
  // General
  hijriAdjustment: 0,
  timeFormat: '12h',
  dateFormat: 'dd_MM_yyyy',
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
  updateNestedSettings: <K extends keyof Settings>(
    key: K,
    value: Partial<Settings[K]>
  ) => void
  resetSettings: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('nurplus-settings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings({ ...defaultSettings, ...parsed })
      } catch (e) {
        console.error('Failed to parse settings:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('nurplus-settings', JSON.stringify(settings))
    }
  }, [settings, isLoaded])

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  const updateNestedSettings = <K extends keyof Settings>(
    key: K,
    value: Partial<Settings[K]>
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: { ...(prev[key] as object), ...(value as object) },
    }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    localStorage.removeItem('nurplus-settings')
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, updateNestedSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
