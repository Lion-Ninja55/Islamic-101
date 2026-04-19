"use client"

import { Navigation } from '@/components/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { QuranSettings } from '@/components/settings/quran-settings'
import { SalahSettings } from '@/components/settings/salah-settings'
import { GeneralSettings } from '@/components/settings/general-settings'
import { Book, Clock, Settings } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/5 via-background to-background">
      <Navigation />
      
      <main className="flex-1 container px-4 py-6">
        {/* Header with accent */}
        <div className="mb-8 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute top-0 right-0 w-16 h-16 bg-accent/20 rounded-full blur-xl" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Settings className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold">Settings</h1>
            </div>
            <p className="text-muted-foreground ml-13">
              Customize your Nur+ experience
            </p>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto bg-muted/50 p-1.5 rounded-xl border border-border/50">
            <TabsTrigger value="general" className="gap-2 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-primary/20">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="quran" className="gap-2 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-primary/20">
              <Book className="h-4 w-4" />
              <span className="hidden sm:inline">Quran</span>
            </TabsTrigger>
            <TabsTrigger value="salah" className="gap-2 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-primary/20">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Salah</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>

          <TabsContent value="quran">
            <QuranSettings />
          </TabsContent>

          <TabsContent value="salah">
            <SalahSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
