"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSettings } from '@/context/settings-context'
import { useTheme } from 'next-themes'
import { Moon, Sun, Monitor, RotateCcw, Calendar } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const languages = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'العربية (Arabic)' },
  { value: 'ur', label: 'اردو (Urdu)' },
  { value: 'bn', label: 'বাংলা (Bengali)' },
  { value: 'id', label: 'Bahasa Indonesia' },
  { value: 'tr', label: 'Türkçe (Turkish)' },
  { value: 'fr', label: 'Français (French)' },
  { value: 'ms', label: 'Bahasa Melayu' },
]

const accentColors = [
  { value: 'green', label: 'Green', color: 'bg-green-500' },
  { value: 'gold', label: 'Gold', color: 'bg-amber-500' },
  { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
  { value: 'cyan', label: 'Cyan', color: 'bg-cyan-500' },
  { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
  { value: 'red', label: 'Red', color: 'bg-red-500' },
  { value: 'orange', label: 'Orange', color: 'bg-orange-500' },
]

const darkModeAccentColors = [
  { value: 'gold', label: 'Gold', color: 'bg-amber-400' },
  { value: 'silver', label: 'Silver', color: 'bg-slate-300' },
  { value: 'green', label: 'Green', color: 'bg-green-400' },
  { value: 'cyan', label: 'Cyan', color: 'bg-cyan-400' },
  { value: 'blue', label: 'Blue', color: 'bg-blue-400' },
  { value: 'purple', label: 'Purple', color: 'bg-purple-400' },
  { value: 'red', label: 'Red', color: 'bg-red-400' },
  { value: 'orange', label: 'Orange', color: 'bg-orange-400' },
  { value: 'gray', label: 'Gray', color: 'bg-gray-400' },
]

export function GeneralSettings() {
  const { settings, updateSettings, resetSettings } = useSettings()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === 'dark'
  const availableAccents = isDark ? darkModeAccentColors : accentColors

  if (!mounted) {
    return (
      <div className="space-y-6">
        <Card className="overflow-hidden border-primary/10">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-primary/10">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sun className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of the application
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Theme</Label>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="gap-2" disabled>
                  <Sun className="h-4 w-4" />
                  Light
                </Button>
                <Button variant="outline" className="gap-2" disabled>
                  <Moon className="h-4 w-4" />
                  Dark
                </Button>
                <Button variant="outline" className="gap-2" disabled>
                  <Monitor className="h-4 w-4" />
                  System
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Theme Settings */}
      <Card className="overflow-hidden border-primary/10">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sun className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of the application
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Theme</Label>
            <div className="flex flex-wrap gap-3">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                className="gap-2"
                onClick={() => setTheme('light')}
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                className="gap-2"
                onClick={() => setTheme('dark')}
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
              <Button
                variant={theme === 'system' ? 'default' : 'outline'}
                className="gap-2"
                onClick={() => setTheme('system')}
              >
                <Monitor className="h-4 w-4" />
                System
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Accent Color</Label>
            <div className="flex flex-wrap gap-3">
              {availableAccents.map((accent) => (
                <button
                  key={accent.value}
                  onClick={() => {
                    updateSettings({ accentColor: accent.value })
                  }}
                  className={`h-10 w-10 rounded-full ${accent.color} transition-transform hover:scale-110 ${
                    settings.accentColor === accent.value 
                      ? 'ring-2 ring-offset-2 ring-primary scale-110' 
                      : 'ring-1 ring-border'
                  }`}
                  title={accent.label}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Choose your preferred accent color. Options change based on theme.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card className="overflow-hidden border-accent/20">
        <CardHeader className="bg-gradient-to-r from-accent/10 to-transparent border-b border-accent/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-accent-foreground">ع</span>
            </div>
            <div>
              <CardTitle>Language</CardTitle>
              <CardDescription>
                Choose your preferred language for the interface
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Interface Language</Label>
            <Select
              value={settings.language}
              onValueChange={(value) => updateSettings({ language: value })}
            >
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Time Format */}
      <Card className="overflow-hidden border-muted-foreground/10">
        <CardHeader className="bg-gradient-to-r from-muted/50 to-transparent border-b border-muted-foreground/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
              <span className="text-sm font-mono font-semibold">12</span>
            </div>
            <div>
              <CardTitle>Time Format</CardTitle>
              <CardDescription>
                Choose how times are displayed throughout the app
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Time Format</Label>
            <div className="flex gap-3">
              <Button
                variant={settings.timeFormat === '12h' ? 'default' : 'outline'}
                onClick={() => updateSettings({ timeFormat: '12h' })}
              >
                12-hour (AM/PM)
              </Button>
              <Button
                variant={settings.timeFormat === '24h' ? 'default' : 'outline'}
                onClick={() => updateSettings({ timeFormat: '24h' })}
              >
                24-hour
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hijri Calendar */}
      <Card className="overflow-hidden border-primary/10">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Moon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle>Hijri Calendar</CardTitle>
              <CardDescription>
                Adjust the Hijri date if it differs from your local sighting
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Hijri Date Adjustment</Label>
              <span className="text-sm text-muted-foreground">
                {settings.hijriAdjustment > 0 ? '+' : ''}{settings.hijriAdjustment} days
              </span>
            </div>
            <Slider
              value={[settings.hijriAdjustment]}
              min={-2}
              max={2}
              step={1}
              onValueChange={([value]) => updateSettings({ hijriAdjustment: value })}
              className="max-w-md"
            />
            <p className="text-sm text-muted-foreground">
              Adjust if the Hijri date shown differs from your local moon sighting
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Date Format */}
      <Card className="overflow-hidden border-accent/20">
        <CardHeader className="bg-gradient-to-r from-accent/10 to-transparent border-b border-accent/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-accent-foreground" />
            </div>
            <div>
              <CardTitle>Date Format</CardTitle>
              <CardDescription>
                Choose how dates are displayed throughout the app
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Date Format</Label>
            <Select
              value={settings.dateFormat}
              onValueChange={(value) => updateSettings({ dateFormat: value })}
            >
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dd_MM_yyyy">DD/MM/YYYY (18/04/2026)</SelectItem>
                <SelectItem value="MM_dd_yyyy">MM/DD/YYYY (04/18/2026)</SelectItem>
                <SelectItem value="yyyy_MM_dd">YYYY-MM-DD (2026-04-18)</SelectItem>
                <SelectItem value="dd_MMMM_yyyy">18 April 2026</SelectItem>
                <SelectItem value="MMMM_dd_yyyy">April 18, 2026</SelectItem>
                <SelectItem value="d_MMMM_yyyy">18th April 2026</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Date Language</Label>
            <Select
              value={settings.dateLanguage}
              onValueChange={(value) => updateSettings({ dateLanguage: value })}
            >
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية (Arabic)</SelectItem>
                <SelectItem value="ur">اردو (Urdu)</SelectItem>
                <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                <SelectItem value="id">Bahasa Indonesia</SelectItem>
                <SelectItem value="tr">Türkçe (Turkish)</SelectItem>
                <SelectItem value="fr">Français (French)</SelectItem>
                <SelectItem value="de">Deutsch (German)</SelectItem>
                <SelectItem value="es">Español (Spanish)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Language used for displaying the modern (Gregorian) date
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Reset Settings */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Reset Settings</CardTitle>
          <CardDescription>
            Reset all settings to their default values
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset All Settings
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset all your settings to their default values. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetSettings}>
                  Reset Settings
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}
