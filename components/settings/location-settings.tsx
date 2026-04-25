"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSettings } from '@/context/settings-context'
import { MapPin, Navigation, RefreshCw, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LocationSettings() {
  const { settings, updateNestedSettings } = useSettings()
  const [isDetecting, setIsDetecting] = useState(false)
  const [manualLat, setManualLat] = useState(settings.location.latitude?.toString() || '')
  const [manualLng, setManualLng] = useState(settings.location.longitude?.toString() || '')
  const [manualCity, setManualCity] = useState(settings.location.city || '')
  const [manualCountry, setManualCountry] = useState(settings.location.country || '')
  const [saveSuccess, setSaveSuccess] = useState(false)

  const detectLocation = () => {
    setIsDetecting(true)

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      setIsDetecting(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          const geoRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
          const geoData = await geoRes.json()

          const city = geoData.city || geoData.locality || 'Unknown'
          const country = geoData.countryName || 'Unknown'

          updateNestedSettings('location', {
            latitude,
            longitude,
            city,
            country,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })

          setManualLat(latitude.toString())
          setManualLng(longitude.toString())
          setManualCity(city)
          setManualCountry(country)
        } catch {
          updateNestedSettings('location', {
            latitude,
            longitude,
            city: 'Unknown',
            country: 'Unknown',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })

          setManualLat(latitude.toString())
          setManualLng(longitude.toString())
        }

        setIsDetecting(false)
      },
      (err) => {
        alert('Unable to retrieve your location. Please allow location access or enter coordinates manually.')
        setIsDetecting(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

  const saveManualLocation = () => {
    const lat = parseFloat(manualLat)
    const lng = parseFloat(manualLng)

    if (isNaN(lat) || isNaN(lng)) {
      alert('Please enter valid latitude and longitude values')
      return
    }

    if (lat < -90 || lat > 90) {
      alert('Latitude must be between -90 and 90')
      return
    }

    if (lng < -180 || lng > 180) {
      alert('Longitude must be between -180 and 180')
      return
    }

    updateNestedSettings('location', {
      latitude: lat,
      longitude: lng,
      city: manualCity || 'Custom Location',
      country: manualCountry || '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })

    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Current Location */}
      <Card className="overflow-hidden border-primary/10">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle>Current Location</CardTitle>
              <CardDescription>
                Your location is used to calculate accurate prayer times
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {settings.location.latitude && settings.location.longitude ? (
            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-lg">
                  {settings.location.city}
                  {settings.location.country && `, ${settings.location.country}`}
                </p>
                <p className="text-sm text-muted-foreground">
                  Latitude: {settings.location.latitude.toFixed(6)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Longitude: {settings.location.longitude.toFixed(6)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Timezone: {settings.location.timezone}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 text-muted-foreground">
              <MapPin className="h-6 w-6" />
              <p>No location set. Please detect or enter your location below.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Automatic Detection */}
      <Card className="overflow-hidden border-accent/20">
        <CardHeader className="bg-gradient-to-r from-accent/10 to-transparent border-b border-accent/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <Navigation className="h-4 w-4 text-accent-foreground" />
            </div>
            <div>
              <CardTitle>Automatic Detection</CardTitle>
              <CardDescription>
                Use your browser&apos;s location services to detect your position
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            onClick={detectLocation}
            disabled={isDetecting}
            className="gap-2"
          >
            {isDetecting ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Detecting...
              </>
            ) : (
              <>
                <Navigation className="h-4 w-4" />
                Detect My Location
              </>
            )}
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Your browser will ask for permission to access your location.
          </p>
        </CardContent>
      </Card>

      {/* Manual Entry */}
      <Card className="overflow-hidden border-muted-foreground/10">
        <CardHeader className="bg-gradient-to-r from-muted/50 to-transparent border-b border-muted-foreground/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </div>
            <div>
              <CardTitle>Manual Entry</CardTitle>
              <CardDescription>
                Enter your coordinates manually if automatic detection is not available
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="e.g., New York"
                value={manualCity}
                onChange={(e) => setManualCity(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="e.g., United States"
                value={manualCountry}
                onChange={(e) => setManualCountry(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                placeholder="e.g., 40.7128"
                value={manualLat}
                onChange={(e) => setManualLat(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Range: -90 to 90 (negative for South)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                placeholder="e.g., -74.0060"
                value={manualLng}
                onChange={(e) => setManualLng(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Range: -180 to 180 (negative for West)
              </p>
            </div>
          </div>

          <Button 
            onClick={saveManualLocation}
            className={cn(
              "gap-2",
              saveSuccess && "bg-green-600 hover:bg-green-600"
            )}
          >
            {saveSuccess ? (
              <>
                <Check className="h-4 w-4" />
                Saved!
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4" />
                Save Location
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="overflow-hidden border-primary/10">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div>
              <CardTitle>Finding Your Coordinates</CardTitle>
              <CardDescription>
                Tips for finding your exact location coordinates
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <strong>Google Maps:</strong> Right-click on your location and the coordinates will appear at the top of the menu.
            </li>
            <li>
              <strong>iPhone:</strong> Open the Compass app and your coordinates are shown at the bottom.
            </li>
            <li>
              <strong>Android:</strong> Open Google Maps, tap and hold on your location, and coordinates appear at the top.
            </li>
            <li>
              <strong>Common Cities:</strong>
              <ul className="ml-4 mt-1 space-y-1">
                <li>Makkah: 21.4225, 39.8262</li>
                <li>Madinah: 24.5247, 39.5692</li>
                <li>Jerusalem: 31.7683, 35.2137</li>
                <li>Istanbul: 41.0082, 28.9784</li>
              </ul>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
