# 🕌 Nur+ | Islamic Companion

> Your comprehensive Islamic companion for Quran reading and accurate prayer times — built with modern web technology and beautiful design.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.0-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)]()

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🚀 Getting Started](#-getting-started)
- [🎨 Theme & Customization](#-theme--customization)
- [📱 Pages & Navigation](#-pages--navigation)
- [⚙️ Settings](#️-settings)
- [📡 APIs Used](#-apis-used)
- [🏗️ Project Structure](#️-project-structure)
- [🎯 Future Roadmap](#-future-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🕋 Prayer Times (Home Page)

- **Modern and Hijri date display** at the top of the page
- **Real-time countdown** to the next prayer (updates every second)
- **Fixed location display** showing "Current Location ✓"
- **Automatic location detection** via browser geolocation + reverse geocoding
- **Manual location entry** with latitude/longitude or city search
- **15 calculation methods** supporting different Islamic organizations worldwide:
  - ISNA (Islamic Society of North America)
  - MWL (Muslim World League)
  - Umm Al-Qura University (Makkah)
  - Egyptian General Authority of Survey
  - And 11 more regional methods
- **Asr juristic methods**: Standard (Shafi/Maliki/Hanbali) and Hanafi
- **High latitude rules** for extreme latitudes (angle, oneseventh, midnight)
- **Manual adjustments**: ±30 minutes per prayer
- **Hijri date display** with Arabic month name
- **Hijri adjustment**: ±2 days for local moon sighting
- **12/24-hour time format** toggle
- **Next prayer highlighted** with ring indicator

### 📖 Quran Reader

- **Browse all 114 surahs** with Arabic names, English translations, and revelation types
- **Search surahs** by name (English/Arabic) or number with "No results found" feedback
- **Bookmark surahs** - save your favorite surahs for quick access
- **Prev/Next navigation** - easily navigate between surahs
- **Read in Arabic** using the Mishary Rashid Alafasy recitation text
- **View translations** in 28+ languages:
  - English (Sahih International, Yusuf Ali, Pickthall, Asad, Shakir, Hilali & Khan, Arberry, Daryabadi, etc.)
  - Urdu, Bengali, Indonesian, Turkish, French, German, Spanish, Russian, Italian, Dutch, Persian, Chinese, Japanese, Malayalam, Swahili, Amharic
- **Adjustable Arabic font size** (18–48px) with live preview
- **Toggle translation** on/off with one click
- **Bismillah** displayed separately before each surah (except Surah At-Tawbah)
- **Clean verse numbering** with circular badges
- **Smooth scrolling** and responsive layout
- **Direct linking**: Share `?surah=1` to link directly to a surah

### 🎨 Theme & Colors

- **Dark mode** with beautiful deep navy/black palette
- **Light mode** with soft cream backgrounds
- **7 accent colors**: Green (default), Gold, Blue, Cyan, Red, Purple, Orange
- **Dark mode accent variants**: Lighter, more vibrant tones including Silver and Gray
- **System theme** auto-detection (follows OS preference)
- **Custom Arabic font**: Amiri for beautiful Quranic text
- **Modern sans-serif**: Geist for UI elements

### ⚙️ Comprehensive Settings

All settings are **persisted to localStorage** and sync across app restarts.

**General:**
- Theme selection (Light/Dark/System)
- Accent color picker with dark mode variants
- Interface language (8 options)
- Time format (12h/24h)
- Hijri date adjustment (±2 days)
- **Date format** - choose how dates are displayed (DD/MM/YYYY, MM/DD/YYYY, etc.)
- **Date language** - display dates in English, Arabic, Urdu, Bengali, Indonesian, Turkish, French, German, or Spanish
- Reset all settings

**Quran:**
- Arabic font size slider with live preview
- Line spacing control (8–20 lines)
- Translation language selector (28+ languages)
- Toggle translation on/off
- Toggle transliteration (UI ready, data pending)
- **Ayah numbering language** - choose between English (1,2,3), Arabic (١,٢,٣), or Urdu (۱,۲,۳)
- Quran theme selector (classic/modern/sepia — ready for future use)

**Salah (Prayer):**
- 15+ calculation methods from around the world
- Asr juristic method (Standard vs Hanafi)
- High latitude rule selector
- Midnight calculation method
- Per-prayer time adjustments (±30 min)
- Notification configuration:
  - Per-prayer enable/disable
  - Before-Adhan reminder (0–60 min)

**Location:**
- Automatic detection
- Manual coordinate entry
- City and country display

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** or **yarn** or **pnpm** package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Lion-Ninja55/Islamic-101.git
   cd Islamic-101
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

The app will be available at `http://localhost:3000`

---

## 🎨 Theme & Customization

### Color System

Nur+ uses **OKLCH color space** for perceptually uniform, accessible colors. The accent color system dynamically changes `--primary`, `--accent`, and `--ring` CSS variables throughout the app.

### Changing Accent Color

1. Go to **Settings** → **General**
2. Click any color circle in the "Accent Color" section
3. All buttons, badges, rings, and highlights update instantly

**Light mode accent palette:**
| Color | OKLCH Value | Preview |
|-------|------------|---------|
| Green (default) | `oklch(0.45 0.12 160)` | 🟢 |
| Gold | `oklch(0.65 0.15 55)` | 🟡 |
| Blue | `oklch(0.50 0.12 220)` | 🔵 |
| Cyan | `oklch(0.50 0.14 190)` | 🔷 |
| Red | `oklch(0.55 0.15 25)` | 🔴 |
| Purple | `oklch(0.55 0.15 290)` | 🟣 |
| Orange | `oklch(0.65 0.18 35)` | 🟠 |

**Dark mode** uses lighter, more vibrant variants of each color for better contrast.

---

## 📱 Pages & Navigation

### Home Page (`/`)

**What you'll see:**
1. **Date bar** — Modern date (in selected language) and Hijri date displayed together at the top
2. **Bismillah header** — Beautiful Arabic calligraphy with English translation
3. **Prayer times section**:
   - Next prayer card with live countdown
   - Grid of all 6 prayer times (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha)
   - Hijri date with Arabic month name
   - "Update Location" button for manual refresh
4. **Footer** with Islamic greeting

**How it works:**
- On first visit, browser asks for location permission
- If granted, app fetches prayer times from AlAdhan API
- If denied, you can manually enter coordinates in Settings → Salah
- Countdown timer ticks every second to show time remaining

### Quran Page (`/quran`)

**Two views:**

#### View 1: Surah List
- Grid of card displays (3 columns on desktop, 1 on mobile)
- Each card shows:
  - Surah number in primary-colored circle
  - Arabic name (Amiri font)
  - English name + translation
  - Ayah count badge
  - Revelation type (Meccan/Medinan)
- **Search bar** at top filters in real-time
- Click any card to open that surah

#### View 2: Quran Reader
**Sticky header with:**
- Back button (returns to list)
- Current surah name + ayah count
- Search dropdown for quick surah navigation
- "Show/Hide Translation" toggle

**Reading view:**
- Bismillah displayed at top (except Surah 9)
- Each ayah in its own block with:
  - Verse number in circle (left side)
  - Arabic text (right-aligned, RTL)
  - Translation below (if enabled)
- Bottom padding for comfortable reading
- Smooth scrolling

**Navigation:**
- Use the search dropdown to jump to any surah
- URL updates automatically — share links preserve surah

### Settings Page (`/settings`)

**Four tabs:**

#### 🔹 General
- Theme picker (Light/Dark/System)
- Accent color selector
- Interface language (8 options)
- Time format (12h/24h)
- Hijri date offset (±2 days)
- Date format (6 options)
- Date language (9 options)
- Reset all settings button

#### 📍 Location
- Current location display
- Automatic detection button
- Manual entry for coordinates
- Common city coordinates reference

#### 📖 Quran
- Font size slider (18–48px) — live Bismillah preview
- Line spacing slider (8–20)
- Translation language dropdown (28+ options)
- Toggle translation (on by default)
- Toggle transliteration (UI ready, data pending)
- Ayah numbering language (English/Arabic/Urdu)
- Quran statistics card

#### 🕋 Salah
- **Calculation method** dropdown (15 world methods)
- **Asr method**: Standard vs Hanafi
- **High latitude rule**: angle / oneseventh / midnight
- **Midnight mode**: Standard / Jafari
- **Per-prayer adjustments**: Sliders for each prayer (-30 to +30 min)
- **Notifications** (configuration only):
  - Master enable/disable
  - Individual toggles for all 6 prayers
  - Before-Adhan reminder timing (0–60 min)

---

## ⚙️ Settings Reference

### All Configuration Options

```typescript
// Accent Color
accentColor: 'green' | 'gold' | 'blue' | 'cyan' | 'red' | 'purple' | 'orange'

// Quran
quranFontSize: 18–48 (default: 28)
quranTranslation: 'en.sahih' | 'en.asad' | 'en.pickthall' | ... (28+ total)
quranReciter: string (default: 'ar.alafasy')
showTranslation: boolean (default: true)
showTransliteration: boolean (default: false)
quranTheme: 'classic' | 'modern' | 'sepia' (default: 'classic')
linesPerPage: 8–20 (default: 16)
ayahNumbering: 'english' | 'arabic' | 'urdu' (default: 'english')

// Salah
calculationMethod: '0'–'15' (default: '2' = ISNA)
asrJuristic: 'standard' | 'hanafi' (default: 'standard')
highLatitudeRule: 'angle' | 'oneseventh' | 'midnight' (default: 'angle')
midnightMode: 'standard' | 'jafari' (default: 'standard')
adjustments: {
  fajr: number (-30 to 30, default: 0)
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
  beforeAdhan: number 0–60, step 5 (default: 15)
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

| Value | Method Name | Region |
|-------|------------|--------|
| 0 | Jafari / Shia Ithna-Ashari | Shia Muslims |
| 1 | University of Islamic Sciences, Karachi | Pakistan, Bangladesh |
| 2 | Islamic Society of North America (ISNA) | USA, Canada (default) |
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

## 📡 External APIs

### 1. AlAdhan Prayer Times API
- **Base URL:** `https://api.aladhan.com/v1`
- **Endpoint used:** `/timings/{date}`
- **Purpose:** Fetches accurate prayer times based on location and calculation method
- **Rate limit:** Free, no API key required
- **Documentation:** [aladhan.com/apidocs](http://aladhan.com/apidocs)

### 2. AlQuran Cloud API
- **Base URL:** `https://api.alquran.cloud/v1`
- **Endpoints used:**
  - `/surah` — Get list of all 114 surahs
  - `/surah/{number}/ar.alafasy` — Get Arabic text for a surah
  - `/surah/{number}/en.sahih` — Get English translation (or other edition based on settings)
- **Editions:** 1 Arabic edition (alafasy) + 19 translation editions
- **Audio:** CDN URLs available but not currently used
- **Documentation:** [alquran.cloud/api](https://alquran.cloud/api)

### 3. BigDataCloud Reverse Geocoding
- **Base URL:** `https://api.bigdatacloud.net/data`
- **Endpoint used:** `/reverse-geocode-client`
- **Purpose:** Converts lat/lng coordinates into readable city/country names
- **Rate limit:** 500 requests/day free tier
- **Documentation:** [bigdatacloud.com/geocoding](https://www.bigdatacloud.com/geocoding)

---

## 🏗️ Project Structure

```
Islamic-101/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout with ThemeProvider, SettingsProvider
│   ├── page.tsx                  # Home page (prayer times)
│   ├── globals.css               # Global styles, CSS variables, fonts
│   ├── quran/
│   │   └── page.tsx              # Quran page with surah list & reader
│   └── settings/
│       └── page.tsx              # Settings hub with tabs
│
├── components/
│   ├── navigation.tsx             # Responsive navbar with mobile sheet
│   ├── theme-provider.tsx         # next-themes wrapper
│   ├── accent-color-handler.tsx   # Accent color → CSS variables
│   │
│   ├── quran/
│   │   ├── surah-list.tsx         # Grid of surah cards
│   │   ├── quran-reader.tsx       # Full reading view with Bismillah logic
│   │   └── quran-facts.tsx        # Daily rotating Quran facts card
│   │
│   ├── settings/
│   │   ├── general-settings.tsx   # Theme, accent, language, time format
│   │   ├── quran-settings.tsx     # Font, translation, display options
│   │   ├── salah-settings.tsx     # Prayer calculation & notifications
│   │   └── location-settings.tsx  # Location management (⚠️ orphaned, unused)
│   │
│   └── ui/                        # shadcn/ui component library (70+ components)
│
├── context/
│   └── settings-context.tsx       # Global settings state + localStorage sync
│
├── hooks/
│   ├── use-toast.ts               # Toast notification hook
│   └── use-mobile.ts              # Mobile breakpoint detection
│
├── lib/
│   ├── utils.ts                   # cn() utility for Tailwind class merging
│   └── api-config.json            # API endpoints documentation
│
├── public/                        # Static assets (icons, images)
│
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript configuration
├── next.config.mjs                # Next.js config (allows TS build errors)
├── postcss.config.mjs             # PostCSS with Tailwind v4
├── tailwind.config.js             # Tailwind configuration
├── components.json                # shadcn/ui config
└── README.md                      # This file
```

---

## 🎯 User Workflows

### First-Time User Flow

1. **Open app** → See Bismillah header + prayer times section
2. **Grant location permission** → App automatically detects city & fetches prayer times
3. **Browse Quran** → Click "Read Quran" card → Select a surah → Start reading
4. **Customize** → Visit Settings → Change accent color, font size, prayer method, etc.
5. **Everything saves automatically** — close and reopen anytime, preferences persist

### Power User Flow

1. **Set precise location** → Enter exact coordinates for accurate times
2. **Choose calculation method** → Select regional method (e.g., ISNA, MWL)
3. **Adjust prayer times** → Fine-tune each prayer by ±30 minutes if needed
4. **Enable notifications** → Get reminders before each prayer
5. **Pick favorite translation** → Switch from Sahih International to another language
6. **Increase font size** → For comfortable reading on larger screens
7. **Toggle translation** → Hide translations when you want pure Arabic focus

---

## 🔧 Development Notes

### Key Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.0 | React framework with App Router |
| React | 19.2.4 | UI library |
| TypeScript | 5.7.3 | Type safety |
| Tailwind CSS | 4.2.0 | Utility-first CSS |
| next-themes | — | Dark/light theme management |
| Radix UI | — | Accessible UI primitives |
| shadcn/ui | — | Pre-built UI components |
| lucide-react | — | Icon library |
| AlAdhan API | — | Prayer times |
| AlQuran Cloud API | — | Quran text & translations |

### State Management

- **Settings**: React Context (`SettingsProvider`) with localStorage persistence
- **UI State**: Local `useState` within components (loading, search, dropdowns)
- **No Redux/Zustand** — simple Context is sufficient

### Data Fetching

- **Client-side fetching** using native `fetch` API (no SWR/React Query)
- **Parallel requests** for Arabic + translation in Quran reader
- **No caching** — data refetched on every surah view (can be optimized with SWR)

### Styling Approach

- **Tailwind CSS v4** with `@tailwindcss/postcss` plugin
- **CSS custom properties** for dynamic theming (OKLCH colors)
- **Responsive design** with mobile-first approach
- **Custom Arabic font** via Google Fonts (Amiri)
- **Break words** for Arabic text to prevent overflow

---

## ⚠️ Known Issues & Limitations

### Fixed
- **Accent color in dark mode** — Now properly applies across all themes ✅
- **Quran search "No results found"** — Now displays helpful message when no results ✅
- **useSearchParams Suspense** — Wrapped in Suspense boundary ✅
- **Location settings tab** — Now accessible in Settings page ✅
- **Theme toggle** — Simplified, no longer necessary in navigation ✅
- **Quick Actions** — Removed from home page ✅

### Incomplete Features
- **Transliteration**: Setting exists (`showTransliteration`) but no data is fetched or displayed
- **Quran themes**: `quranTheme` setting (classic/modern/sepia) has no visual effect yet
- **Line spacing**: `linesPerPage` setting is unused in current reader layout
- **Push notifications**: Notification settings are config-only; actual push notifications not implemented (requires service worker, VAPID keys)
- **UI localization**: Language setting exists but UI text is only English (no translations)
- **Audio**: API provides audio CDN URLs, but no player built
- **Ayah numbering language**: Setting added but not yet implemented in the reader display

### Performance
- No image optimization (no images in use)
- No code-splitting at route level (could split Quran data separately)
- No SWR/React Query for caching API responses
- All settings stored in single localStorage key (`nurplus-settings`), parsed on every load

---

## 🗺️ Future Roadmap

Based on current codebase, natural next steps:

### High Priority
- [ ] **Fix translation bug** — Use `settings.quranTranslation` instead of hardcoded `en.sahih`
- [ ] **Implement `/salah` page** — Dedicated prayer times display with full-screen countdown
- [ ] **Push notifications** — Service worker for prayer reminders
- [ ] **Audio recitation** — Play Arabic audio with play/pause, repeat, speed controls
- [x] **Bismillah fix** — Strip from first ayah and display separately ✅
- [ ] **Transliteration display** — Fetch and show Latin-script transliteration

### Medium Priority
- [ ] **Bookmarks** — Save favorite surahs/ayahs
- [ ] **Search within surah** — Text search across current surah
- [ ] **Juz navigation** — Browse by 30th portions
- [ ] **Night mode** — True black OLED mode
- [ ] **Offline support** — Cache recently read surahs with service worker
- [ ] **Hafiz mode** — Memorization tools (repeat ayah, hide text)
- [ ] **Widgets** — Desktop/mobile home screen widgets

### Nice-to-Have
- [ ] **UI translations** — Localize interface to 8 supported languages
- [ ] **QuranTafseer** — Add tafsir (exegesis) display
- [ ] **Hadith collection** — Expand beyond Quran
- [ ] **Dua collection** — Daily duas with categories
- [ ] **Community** — Prayer time announcements, events
- [ ] **Export readings** — Track reading history, streaks
- [ ] **Voice control** — "Read Surah Al-Fatiha" etc.

---

## 🤝 Contributing

This is a private educational project. However, suggestions and bug reports are welcome via GitHub Issues.

### Development Guidelines

1. **Branch naming**: `feature/xxx` or `fix/xxx`
2. **Commit messages**: Conventional commits (e.g., `feat: add prayer countdown`, `fix: strip Bismillah from ayah 1`)
3. **Code style**: Follow existing patterns, use `prettier` if configured
4. **TypeScript**: No `any` types unless absolutely necessary
5. **Accessibility**: Use Radix UI components for interactive elements

### Running Tests

```bash
npm run lint     # ESLint
npx tsc --noEmit # TypeScript check
```

### Building for Production

```bash
npm run build    # Compiles and checks for errors
npm start        # Preview production build locally
```

---

## 📄 License

This project is released under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- **AlQuran Cloud API** — Quran data and translations
- **AlAdhan API** — Accurate prayer times worldwide
- **BigDataCloud** — Reverse geocoding services
- **shadcn/ui** — Beautiful, accessible UI components
- **Tailwind CSS** — Utility-first CSS framework
- **Next.js** — React framework for production
- **Amiri font** — Beautiful Arabic typeface by Khaled Hosny

---

## 📞 Contact

For questions, feedback, or feature requests, please open an issue on the GitHub repository:

**[github.com/Lion-Ninja55/Islamic-101](https://github.com/Lion-Ninja55/Islamic-101)**

---

**JazakAllah Khair for using Nur+!** May this app serve as a helpful tool in your daily worship and Quran reading. If you find any issues or have suggestions, please contribute via GitHub.

> "Indeed, We have sent down the Reminder, and indeed, We will preserve it."  
> — *Qur'an 15:9*
