"use client"

import { useEffect } from 'react'
import { useSettings } from '@/context/settings-context'

export function AccentColorHandler() {
  const { settings } = useSettings()

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', settings.accentColor)
  }, [settings.accentColor])

  return null
}