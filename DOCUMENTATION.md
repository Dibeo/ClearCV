# 📄 Documentation – **cv-editor**

> **TL;DR** – This repository is a modern React‑TypeScript CV editor.
> It stores CV data in a Zustand store (persisted to `localStorage`), provides a UI for editing, previewing with multiple themes, and exporting to PDF.
> The project is fully typed, lint‑checked, unit‑tested (Vitest) and CI‑ready (GitHub Actions).

---

## Table of Contents

1. [Project Overview](#1-project-overview)  
2. [Getting Started](#2-getting-started)  
3. [Folder Structure](#3-folder-structure)  
4. [Data Model (`CVData`)](#4-data-model-cvdata)  
5. [State Management – `useCvStore`](#5-state-management--usecvstore)  
   - 5.1 [Reset / Example actions](#51-reset--example-actions)  
   - 5.2 [Persisted storage & migrations](#52-persisted-storage--migrations)  
6. [Core Services](#6-core-services)  
   - 6.1 [Image utilities](#61-image-utilities)  
   - 6.2 [PDF generation](#62-pdf-generation)  
   - 6.3 [Storage migration (`migrateCVData`)](#63-storage-migration-migratecvdata)  
7. [UI Components](#7-ui-components)  
   - 7.1 [Editor, Form, Preview](#71-editor-form-preview)  
   - 7.2 [Themes (Modern, Classic, …)](#72-themes-modern-classic-)  
8. [Internationalisation (i18n)](#8-internationalisation-i18n)  
9. [Testing](#9-testing)  
10. [Coverage & CI](#10-coverage--ci)  
11. [Adding New Features / Extending the CV](#11-adding-new-features--extending-the-cv)  
12. [FAQ & Common Gotchas](#12-faq--common-gotchas)  
13. [License & Credits](#13-license--credits)

---

## 1. Project Overview

- **Framework**: **React 18** + **Vite 7** (TSX/TS).  
- **State**: **Zustand** with the `persist` middleware → data survives page reloads (saved in `localStorage` under the key `cv-storage`).  
- **Styling**: **Tailwind 4** + custom CSS.  
- **Export**: `html2pdf.js` (client‑side PDF generation).  
- **Testing**: **Vitest 2** (v8 coverage provider) + React Testing Library.  
- **CI**: **GitHub Actions** runs lint, tests, generates coverage and posts a PR comment.

---

## 2. Getting Started

```bash
# Clone the repo
git clone https://github.com/your-org/cv-editor.git
cd cv-editor

# Install dependencies (npm ci respects the lock‑file)
npm ci
# or: npm install

# Run the development server
npm run dev           # → http://localhost:5173

# Lint the code
npm run lint

# Run tests (without coverage)
npm test

# Run tests with coverage
npm run test -- --coverage
```

> **Node version** – the CI uses **Node 20 LTS**. Using the same locally prevents mismatches.

---

## 3. Folder Structure

```
src/
 ├─ assets/                # static assets (icons, images)
 ├─ core/
 │   ├─ config/            # app‑wide configuration (e.g. language.ts)
 │   ├─ domain/            # TypeScript types + constant data (CVData, INITIAL_CV_DATA)
 │   ├─ services/
 │   │   ├─ image/         # image utilities (getBase64ImageFromURL)
 │   │   ├─ pdf/           # PDF generation (cv‑export.service.ts, cv‑pdf‑engine.ts)
 │   │   └─ storage/       # migration helpers (migrateCVData.ts)
 │   ├─ store/             # Zustand store (useCvStore.ts)
 │   └─ utils/             # generic helpers
 ├─ features/
 │   ├─ cv-editor/         # main editor UI (CvEditor.tsx)
 │   ├─ cv-form/           # form components (sections, contacts, skills…)
 │   ├─ cv-preview/        # preview UI with selectable themes
 │   └─ shared/            # reusable UI components (Sidebar, TopBar, Loading)
 ├─ hooks/                # custom hooks (useTheme.ts)
 ├─ routes/               # routing (AppRouter.tsx)
 └─ main.tsx              # entry point

public/                 # static assets (lang, icons)
```

---

## 4. Data Model (`CVData`)

The CV data is typed as `CVData` (see `src/core/domain/cv.types.ts`).

```ts
interface CVData {
  id: string;                        // random UUID
  metadata: {
    name: string;                   // e.g. "CV Alice Blue - 2026"
    lastModified: number;            // timestamp
    layout: string;                  // selected theme (e.g. "modern")
    language: string;                // "fr" | "en"
  };
  personalInfo: {
    fullName: string;
    title: string;                   // e.g. "Fullstack Developer"
    summary: string;                 // short bio
    photoUrl?: string;               // optional avatar
    contacts: Array<{ id: string; label: string; value: string }>;
    socials: Array<{ id: string; platform: string; url: string }>;
  };
  experiences: Array<Experience>;   // work history
  educations: Array<Education>;      // degrees
  skills: string[];                 // list of skills
  languages: Array<Language>;       // spoken languages
  certifications: Array<Certification>;
}
```

> **Note**: `INITIAL_CV_DATA` (in `cv.constants.ts`) contains a **sample CV** (filled with example data).
> `EMPTY_CV_DATA` is a blank template (empty arrays, empty strings).

---

## 5. State Management – `useCvStore`

The global store (`src/core/store/useCvStore.ts`) is a **Zustand** store with the `persist` middleware.

### 5.1 Reset / Example actions

- **`reset()`** – clears the store to `EMPTY_CV_DATA` (blank CV).
- **`exemple()`** – resets to `INITIAL_CV_DATA` (sample CV).

Both actions show a **SweetAlert2** confirmation dialog before proceeding.

```ts
// Example: reset the store
const { reset } = useCvStore();
reset();
```

### 5.2 Persisted storage & migrations

- **Storage**: `localStorage` under the key `cv-storage`.
- **Migration**: `migrateCVData` ensures backward compatibility (e.g. missing fields are filled with defaults).

---

## 6. Core Services

### 6.1 Image utilities

- `getBase64ImageFromURL(url: string): Promise<string>` – loads an image from a URL and returns a base64 data URL.
- Used for avatars and other images.

### 6.2 PDF generation

- `cv-export.service.ts` – generates a PDF from the current CV data using `html2pdf.js`.
- `cv-pdf-engine.ts` – renders the CV into a hidden HTML element before exporting.

### 6.3 Storage migration (`migrateCVData`)

- Ensures old data structures are migrated to the latest schema.
- Called automatically by Zustand’s `onRehydrateStorage`.

---

## 7. UI Components

### 7.1 Editor, Form, Preview

- **`CvEditor.tsx`** – main editor layout.
- **`CvForm.tsx`** – form sections (identity, experiences, skills, etc.).
- **`CvPreview.tsx`** – preview pane with selectable themes.

### 7.2 Themes (Modern, Classic, …)

- Themes are React components in `src/features/cv-preview/themes/`.
- Each theme renders the same `CVData` with different styling.
- The selected theme is stored in `metadata.layout`.

---

## 8. Internationalisation (i18n)

- Uses `i18next` + `react-i18next`.
- Translations are in `public/lang/{en,fr}/*.json`.

---

## 9. Testing

- **Vitest** + **React Testing Library**.
- Tests are in `src/**/__tests__/*.test.ts`.
- Mocking: `vi.mock` (Vitest), `vi.stubGlobal` for globals.

---

## 10. Coverage & CI

- **Coverage provider**: `v8` (built-in).
- **GitHub Actions**: `.github/workflows/ci.yml` runs lint, tests, and posts coverage on PRs.

---

## 11. Adding New Features / Extending the CV

- Add new fields to `CVData` (e.g. `projects`, `volunteering`).
- Update `INITIAL_CV_DATA` and `EMPTY_CV_DATA`.
- Add form components in `cv-form/`.
- Update themes to render the new fields.

---

## 12. FAQ & Common Gotchas

- **Q**: Why is the store empty after reset?
  **A**: `reset()` sets the store to `EMPTY_CV_DATA` (blank CV). Use `exemple()` to load the sample.

- **Q**: How to add a new theme?
  **A**: Create a new React component in `src/features/cv-preview/themes/` and add it to `ThemeIndex.ts`.

---

## 13. License & Credits

- **License**: MIT.
- **Dependencies**: see `package.json`.

---

🎉 **Happy coding!**
