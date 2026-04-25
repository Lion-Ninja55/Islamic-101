# Nur+ | Islamic Companion

Your comprehensive Islamic companion for Quran reading and accurate prayer times — built with modern web technology and thoughtful design.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.0-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)]()

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Theme & Customization](#theme--customization)
- [Pages & Navigation](#pages--navigation)
- [Settings](#settings)
- [External APIs](#external-apis)
- [Project Structure](#project-structure)
- [Development Guidelines](#development-guidelines)
- [Known Issues & Limitations](#known-issues--limitations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

---

## Features

### Prayer Times (Home Page)

- Modern and Hijri date display at the top of the page
- Real-time countdown to the next prayer, updating every second
- Current location indicator with checkmark
- Automatic location detection using browser geolocation and reverse geocoding
- Manual coordinate entry with latitude/longitude or city search
- 15 calculation methods supporting different Islamic organizations worldwide:
  - ISNA (Islamic Society of North America)
  - Muslim World League
  - Umm Al-Qura University, Makkah
  - Egyptian General Authority of Survey
  - And 11 more regional methods
- Asr juristic methods: Standard (Shafi, Maliki, Hanbali) and Hanafi
- High latitude rules for extreme latitudes (angle, oneseventh, midnight)
- Manual time adjustments: ±30 minutes per prayer
- Hijri date display with Arabic month name
- Hijri date adjustment: ±2 days for local moon sighting
- 12/24-hour time format toggle
- Next prayer highlighted with a ring indicator

### Quran Reader

- Browse all 114 surahs with Arabic names, English translations, and revelation types
- Search surahs by name (English/Arabic) or number; shows "No results found" when empty
- Bookmark surahs for quick access to favorite readings
- Previous/Next navigation between surahs
- Arabic text from the Mishary Rashid Alafasy recitation
- English translation (Sahih International) with potential for additional languages
- Adjustable Arabic font size (18–48px) with live preview
- Toggle translation visibility on or off
- Bismillah displayed separately before each surah (except Surah At-Tawbah)
- Clean verse numbering with circular badges
- Smooth scrolling and responsive layout
- Direct linking via URL query parameter (?surah=1)

### Theme & Colors

- Dark mode with deep navy/black palette
- Light mode with soft cream backgrounds
- Seven accent colors: green (default), gold, blue, cyan, red, purple, orange
- Dark mode accent variants: lighter, more vibrant tones including silver and gray
- System theme auto-detection (follows OS preference)
- Custom Arabic font (Amiri) for Quranic text
- Modern sans-serif (Geist) for UI elements

### Comprehensive Settings

All settings are persisted to localStorage and automatically synchronized across app sessions.

**General**
- Theme selection (Light, Dark, System)
- Accent color picker with dark mode variants
- Interface language (8 options)
- Time format (12h or 24h)
- Hijri date adjustment (±2 days)
- Date format (6 options: DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD, etc.)
- Date language (9 options)
- Reset all settings to defaults

**Quran**
- Arabic font size slider (18–48px) with live preview
- Line spacing control (8–20 lines) — UI ready, pending implementation
- Translation language selector (28+ languages available)
- Toggle translation on/off
- Toggle transliteration (setting present, data pending)
- Ayah numbering language: English, Arabic, or Urdu
- Quran theme selector (classic, modern, sepia) — prepared for future use

**Salah (Prayer)**
- 15 calculation methods from around the world
- Asr juristic method: Standard vs Hanafi
- High latitude rule selection
- Midnight calculation method (Standard or Jafari)
- Per-prayer time adjustments: ±30 minutes
- Notification configuration (master enable, per-prayer toggles, before-adhan reminder 0–60 minutes)

**Location**
- Automatic detection via browser geolocation
- Manual entry of coordinates with validation
- Display of current city and country

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Lion-Ninja55/Islamic-101.git
   cd Islamic-101
   ```

2. Install dependencies:
   ```bash
   npm install
   # or yarn install
   # or pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or yarn dev
   # or pnpm dev
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

The application will be available at `http://localhost:3000`.

---

## Theme & Customization

### Color System

Nur+ uses OKLCH color space for perceptually uniform, accessible colors. The accent color system dynamically updates the `--primary`, `--accent`, and `--ring` CSS variables throughout the application.

### Changing Accent Color

1. Navigate to Settings → General
2. Click any of the color circles in the Accent Color section
3. All interactive elements update instantly to reflect the new color

**Light mode palette**

| Color | OKLCH Value |
|-------|-------------|
| Green (default) | oklch(0.45 0.12 160) |
| Gold | oklch(0.65 0.15 55) |
| Blue | oklch(0.50 0.12 220) |
| Cyan | oklch(0.50 0.14 190) |
| Red | oklch(0.55 0.15 25) |
| Purple | oklch(0.55 0.15 290) |
| Orange | oklch(0.65 0.18 35) |

Dark mode uses lighter, more vibrant variants of each color for better contrast.

---

## Pages & Navigation

### Home Page (/)

**What you'll see**

1. Date bar showing the modern Gregorian date (in selected language) and the Hijri date
2. Bismillah header in beautiful Arabic calligraphy with English translation
3. Prayer times section:
   - Next prayer card with a live countdown timer
   - Grid displaying all six prayer times (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha)
   - Hijri date with Arabic month name
   - "Update Location" button to refresh location manually
4. Footer with an Islamic greeting

**Behavior**

- On first visit, the browser requests location permission.
- If granted, prayer times are fetched from the AlAdhan API.
- If denied, coordinates can be entered manually in Settings → Location.
- The countdown timer ticks every second to show time remaining until the next prayer.

### Quran Page (/quran)

Two views are available:

**Surah List**

- Responsive grid (3 columns on desktop, 1 on mobile)
- Each card displays:
  - Surah number inside a primary-colored circle
  - Arabic name in Amiri font
  - English name and translation
  - Number of ayahs
  - Revelation type (Meccan or Medinan)
- Search bar filters surahs in real time; helpful message appears when no results match

**Quran Reader**

Sticky header contains:
- Back button (returns to list)
- Current surah name and ayah count
- Search dropdown for quick surah navigation
- Show/Hide Translation toggle

Reading view presents:
- Bismillah at the top (omitted for Surah At-Tawbah)
- Each ayah in a separate block:
  - Verse number inside a small circle
  - Arabic text aligned to the right (RTL)
  - Translation displayed below if enabled
- Comfortable bottom padding for scrolling
- Smooth transitions

Navigation:
- Use the search dropdown to jump directly to any surah.
- URL updates automatically; share links preserve the selected surah.

### Settings Page (/settings)

Four tabs organize configuration:

**General**
- Theme picker (Light, Dark, System)
- Accent color selector
- Interface language (8 options)
- Time format (12h/24h)
- Hijri date offset (±2 days)
- Date format (six options)
- Date language (nine options)
- Reset all settings button with confirmation dialog

**Location**
- Displays current coordinates and city/country
- Automatic detection button
- Manual entry fields with validation
- Reference list of common city coordinates

**Quran**
- Font size and line spacing sliders
- Translation language selection
- Toggle translation and transliteration
- Ayah numbering language selector
- Quran statistics card

**Salah**
- Calculation method dropdown (15 regional methods)
- Asr method (Standard or Hanafi)
- High latitude rule selector
- Midnight calculation mode
- Per-prayer adjustment sliders
- Notification settings (enable, per-prayer toggles, before-adhan reminder)

---

## Settings Reference

### Configuration Schema

```typescript
// Accent Color
accentColor: 'green' | 'gold' | 'blue' | 'cyan' | 'red' | 'purple' | 'orange'

// Quran
quranFontSize: number (18–48, default: 28)
quranTranslation: string (e.g., 'en.sahih')
quranReciter: string (default: 'ar.alafasy')
showTranslation: boolean (default: true)
showTransliteration: boolean (default: false)
quranTheme: 'classic' | 'modern' | 'sepia' (default: 'classic')
linesPerPage: number (8–20, default: 16)
ayahNumbering: 'english' | 'arabic' | 'urdu' (default: 'english')

// Salah
calculationMethod: string ('0'–'15', default: '2' = ISNA)
asrJuristic: 'standard' | 'hanafi' (default: 'standard')
highLatitudeRule: 'angle' | 'oneseventh' | 'midnight' (default: 'angle')
midnightMode: 'standard' | 'jafari' (default: 'standard')
adjustments: {
  fajr: number (-30 to 30)
  sunrise: number
  dhuhr: number
  asr: number
  maghrib: number
  isha: number
}

// Notifications
notifications: {
  enabled: boolean (default: false)
  fajr: boolean (default: true)
  sunrise: boolean (default: false)
  dhuhr: boolean (default: true)
  asr: boolean (default: true)
  maghrib: boolean (default: true)
  isha: boolean (default: true)
  beforeAdhan: number (0–60, step 5, default: 15)
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
language: 'en' | 'ar' | 'ur' | 'bn' | 'id' | 'tr' | 'fr' | 'ms' (default: 'en')
hijriAdjustment: -2 | -1 | 0 | 1 | 2 (default: 0)
timeFormat: '12h' | '24h' (default: '12h')
dateFormat: string (default: 'dd_MM_yyyy')
dateLanguage: string (default: 'en')
```

### Prayer Calculation Methods

| Value | Method | Region |
|-------|--------|--------|
| 0 | Jafari / Shia Ithna-Ashari | Shia Muslims |
| 1 | University of Islamic Sciences, Karachi | Pakistan, Bangladesh |
| 2 | Islamic Society of North America (ISNA) | USA, Canada |
| 3 | Muslim World League | Europe, Far East, Africa |
| 4 | Umm Al-Qura University, Makkah | Saudi Arabia |
| 5 | Egyptian General Authority of Survey | North Africa, Syria, Lebanon |
| 7 | Institute of Geophysics, University of Tehran | Iran |
| 8 | Gulf Region | Gulf countries |
| 9 | Kuwait | Kuwait |
| 10 | Qatar | Qatar |
| 11 | Majlis Ugama Islam Singapura | Singapore |
| 12 | Union Organization Islamic de France | France |
| 13 | Diyanet Isleri Baskanligi | Turkey |
| 14 | Spiritual Administration of Muslims of Russia | Russia |
| 15 | Moonsighting Committee Worldwide | Global |

---

## External APIs

### AlAdhan Prayer Times API
- **Endpoint**: `https://api.aladhan.com/v1/timings/{date}`
- **Purpose**: Provides accurate prayer times based on geographic location and calculation method
- **Rate limit**: Free, no API key required
- **Documentation**: [aladhan.com/apidocs](http://aladhan.com/apidocs)

### AlQuran Cloud API
- **Base URL**: `https://api.alquran.cloud/v1`
- **Endpoints used**:
  - `/surah` — Retrieve list of all 114 surahs
  - `/surah/{number}/ar.alafasy` — Arabic text for a surah
  - `/surah/{number}/en.sahih` — English translation
- **Editions**: 1 Arabic edition (alafasy) + multiple translation editions
- **Documentation**: [alquran.cloud/api](https://alquran.cloud/api)

### BigDataCloud Reverse Geocoding
- **Endpoint**: `https://api.bigdatacloud.net/data/reverse-geocode-client`
- **Purpose**: Converts latitude and longitude into readable city and country names
- **Rate limit**: 500 requests per day on the free tier
- **Documentation**: [bigdatacloud.com/geocoding](https://www.bigdatacloud.com/geocoding)

---

## Project Structure

```
NurPlus/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (ThemeProvider, SettingsProvider)
│   ├── page.tsx                  # Home page (prayer times)
│   ├── globals.css               # Global styles, CSS variables, fonts
│   ├── quran/
│   │   └── page.tsx              # Quran page (list + reader)
│   └── settings/
│       └── page.tsx              # Settings hub with tabs
│
├── components/
│   ├── navigation.tsx             # Responsive header with mobile sheet
│   ├── theme-provider.tsx         # next-themes wrapper
│   ├── accent-color-handler.tsx   # Applies accent color data attribute
│   │
│   ├── quran/
│   │   ├── surah-list.tsx         # Grid of surah cards
│   │   ├── quran-reader.tsx       # Full reading view with Bismillah handling
│   │   └── quran-facts.tsx        # Rotating Quran facts card
│   │
│   ├── settings/
│   │   ├── general-settings.tsx   # Theme, colors, language, date/time format
│   │   ├── quran-settings.tsx     # Font, translation, display options
│   │   ├── salah-settings.tsx     # Prayer calculation & notifications
│   │   └── location-settings.tsx  # Location management
│   │
│   └── ui/                        # shadcn/ui component library
│
├── context/
│   └── settings-context.tsx       # Global settings state + localStorage sync
│
├── hooks/
│   ├── use-toast.ts               # Toast notification hook
│   └── use-mobile.ts              # Mobile breakpoint detection
│
├── lib/
│   ├── utils.ts                   # Tailwind class merging utility
│   └── api-config.json            # API endpoints documentation
│
├── public/                        # Static assets (icons, images)
│
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── next.config.mjs                # Next.js configuration
├── postcss.config.mjs             # PostCSS with Tailwind v4
├── tailwind.config.js             # Tailwind configuration
├── components.json                # shadcn/ui configuration
├── eslint.config.mjs              # ESLint flat config (Next.js)
├── .eslintignore                 # ESLint ignore patterns
└── README.md                      # Project documentation
```

---

## Development Guidelines

### Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.0 | React framework with App Router |
| React | 19.2.4 | UI library |
| TypeScript | 5.7.3 | Type safety |
| Tailwind CSS | 4.2.0 | Utility-first CSS |
| next-themes | 0.4.6 | Dark/light theme management |
| Radix UI | Various | Accessible UI primitives |
| shadcn/ui | — | Pre-built UI components |
| lucide-react | — | Icon library |

### State Management

- Settings are managed via React Context (`SettingsProvider`) with automatic `localStorage` persistence.
- UI state (loading, search, dropdowns) is kept in local component state using `useState`.
- No external state library (Redux/Zustand) is used; Context is sufficient for this scope.

### Data Fetching

- Client-side `fetch` API; no SWR or React Query.
- Parallel requests for Arabic text and translation in the Quran reader.
- No caching layer; data is refetched each time a surah is opened (future optimization possible).

### Styling Approach

- Tailwind CSS v4 with `@tailwindcss/postcss` plugin.
- CSS custom properties for theming (OKLCH color space).
- Mobile-first responsive design.
- Google Fonts: Amiri (Arabic), Geist (sans-serif), Geist Mono (monospace).
- `word-break: break-word` for Arabic text to handle long ayahs gracefully.

### Code Quality

- TypeScript with strict mode enabled.
- ESLint with Next.js recommended rules (`eslint-config-next`).
- Prettier formatting (if configured in editor).
- Accessible components built on Radix UI primitives.

---

## Known Issues & Limitations

The following items are noted for future development:

- Transliteration setting is present but data is not fetched or displayed.
- Quran theme options (classic/modern/sepia) have no visual effect yet.
- Line spacing (`linesPerPage`) is not applied in the current reader layout.
- Push notifications are not implemented; settings only store preferences.
- Interface localization is pending; only English text is currently used.
- Audio playback from the API is not integrated.
- Ayah numbering language selection is not yet applied in the reader.
- No image optimization pipeline (not required for current feature set).

Performance considerations:
- All API calls are uncached; repeated navigation refetches data.
- Settings are stored under a single `nurplus-settings` key in localStorage.
- No code splitting at the route level; could be optimized for large surahs.

---

## Roadmap

High priority items:
- Implement translation selection (respect `quranTranslation` setting)
- Add dedicated Salah page with full-screen countdown
- Implement push notifications for prayer reminders
- Integrate audio recitation with playback controls
- Display transliteration for each ayah

Medium priority:
- Bookmark individual ayahs, not just surahs
- In-surah text search
- Juz (30th portion) navigation
- True black OLED night mode
- Offline caching of recently read surahs
- Memorization (Hafiz) mode with repeat and hide features
- Home screen widgets for quick prayer time glance

Nice to have:
- Full UI localization into supported languages
- Tafsir (exegesis) display per ayah
- Hadith collections
- Daily Dua library
- Community features (events, announcements)
- Reading history and streak tracking
- Voice commands for navigation

---

## Contributing

This is an open-source educational project. Contributions, suggestions, and bug reports are welcome via GitHub Issues.

### Development Workflow

1. Fork the repository and create a feature branch (`git checkout -b feature/your-feature`).
2. Follow the existing code style and patterns.
3. Ensure TypeScript compiles without errors (`npx tsc --noEmit`).
4. Run the linter (`npm run lint`) and fix any warnings.
5. Commit with clear, descriptive messages (Conventional Commits recommended).
6. Push to your fork and open a pull request.

### Coding Standards

- Use TypeScript; avoid `any` types.
- Prefer Radix UI or shadcn/ui components for accessibility.
- Keep components small and focused.
- Add comments only when necessary; aim for self-documenting code.
- Write accessible markup (ARIA attributes, keyboard navigation).

### Running Checks

```bash
npm run lint           # ESLint
npx tsc --noEmit      # TypeScript type checking
npm run build         # Production build verification
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions, feedback, or feature requests, please open an issue on the GitHub repository:

**[github.com/Lion-Ninja55/Islamic-101](https://github.com/Lion-Ninja55/Islamic-101)**

---

## Acknowledgements

- **AlQuran Cloud** — Quran text, translations, and metadata
- **AlAdhan API** — Accurate worldwide prayer times
- **BigDataCloud** — Reverse geocoding services
- **shadcn/ui** — Beautiful, accessible UI component library
- **Tailwind CSS** — Utility-first CSS framework
- **Next.js** — React framework for production
- **Amiri font** — Arabic typeface designed by Khaled Hosny
- **Geist fonts** — Modern sans-serif and mono families from Vercel

---

*May this application be a benefit to the community. If you find any issues or have suggestions for improvement, please contribute.*

> "Indeed, We have sent down the Reminder, and indeed, We will preserve it."  
> — Qur'an 15:9
