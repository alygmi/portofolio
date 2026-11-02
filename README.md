<div align="center">
  <img src="./public/logo.svg" alt="Al Adiyat Logo" width="72" height="72" />

  # Al Adiyat Nur Rusuli Jaya — Engineering Portfolio

  **Backend-Leaning Fullstack Developer**  
  *Laravel • TypeScript (Bun, Hono, Next.js) • Python (FastAPI) • Java (Spring Boot) • React 19 • SQL Server & SAP B1*

  [![GitHub](https://img.shields.io/badge/GitHub-@alygmi-18181b?style=flat-square&logo=github)](https://github.com/alygmi)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-aladiyat-0a66c2?style=flat-square&logo=linkedin)](https://linkedin.com/in/aladiyat)
  [![Stack](https://img.shields.io/badge/Built_With-React_19_+_TypeScript_+_Tailwind_v4-10b981?style=flat-square)](https://react.dev/)
</div>

---

## Overview

An interactive **Engineering Case Study & System Architecture Portfolio** designed to showcase backend-heavy fullstack work, production codebase migrations, enterprise ERP/database bottlenecks, and API contract design.

Rather than a standard static gallery, this portfolio presents NDA-safe architectural deep dives, interactive API contract simulations, and step-locked career progression.

---

## Key Features & UI/UX Engineering

- **Quantified Impact Bento Grid:** Highlights production metrics (`3x` codebase migrations led, `94%` image payload reduction from `24 MB` to `1.3 MB`, `340+` commits in 3 months across SQL Server & SAP Business One services).
- **Interactive 3x Codebase Migration Comparison:** Side-by-side *Before vs. After* architectural code inspection for:
  - `Golang` → `Python (FastAPI) + PostgreSQL`
  - `Legacy PHP Zend` → `ReactJS Component Architecture`
  - `Scattered Node.js` → `Laravel Ecosystem + SQL Server Batched Chunking`
- **Step-Locked Career Timeline:** Sticky scroll-driven experience showcase with dual-point Top/Bottom lock for detailed roles and an *Under-The-Hood Architecture Drawer* (covering SQL Server's 2,100-parameter limit batching, multi-level VAT margin calculation fixes, and POS/MDR financial reconciliation).
- **Live Mock API Contract Inspector:** Interactive JSON payload previews for featured systems and open-source repositories.
- **Command Palette (`Ctrl + K`):** Keyboard-first developer navigation across sections, case studies, and external links.
- **Anti-Scraper & Cloudflare Turnstile Contact Protection:**
  - Email and phone credentials are stored as obfuscated character-code chunks (`src/utils/contactSecurity.ts`) so static HTML/JS regex scrapers cannot harvest raw contact strings.
  - Credentials unlock in browser memory only after passing **Cloudflare Turnstile** verification, paired with an invisible **Honeypot** field on the quick message composer.
- **Custom Inertia Scroll & Staggered Reveal:** Smooth 60/120fps momentum scrolling (`useButterScroll`) that automatically yields to step-locked sections, combined with `IntersectionObserver` entrance animations (`RevealOnScroll`).

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | React 19, TypeScript, Vite 6 |
| **Styling & UI** | Tailwind CSS v4, Lucide Icons, Custom SVG Monogram |
| **Security / Anti-Bot** | Cloudflare Turnstile (Explicit Render API), Char-Code Obfuscation, Honeypot Trap |
| **Deployment Target** | Vercel (Static / Edge CDN) |

---

## Project Structure

```text
├── public/
│   └── logo.svg                     # Custom geometric "A" SVG monogram & favicon
├── src/
│   ├── components/
│   │   ├── BrandLogo.tsx            # Reusable inline SVG logo component
│   │   ├── CommandPalette.tsx       # Ctrl+K quick navigation modal
│   │   ├── ExperienceSection.tsx    # Step-locked timeline & architecture drawer
│   │   ├── Footer.tsx               # Footer metadata
│   │   ├── HeroBento.tsx            # Hero & 4-card Bento Impact Grid
│   │   ├── MigrationShowcase.tsx    # Interactive 3x codebase migration tabs
│   │   ├── Navbar.tsx               # Sticky glassmorphism header
│   │   ├── ProjectsSection.tsx      # Featured projects + GitHub repos + API simulator
│   │   ├── ProtectedContact.tsx     # Turnstile-protected contact & honeypot form
│   │   ├── RevealOnScroll.tsx       # IntersectionObserver entrance animations
│   │   └── SkillsAndEducation.tsx   # Tech stack matrix & academic background
│   ├── data/
│   │   └── portfolioData.ts         # Single source of truth for all portfolio content
│   ├── utils/
│   │   ├── contactSecurity.ts       # Anti-scraper char-code encoding/decoding
│   │   └── useButterScroll.ts       # Custom inertia smooth scroll engine
│   ├── App.tsx                      # Root application layout
│   ├── index.css                    # Tailwind v4 imports & subtle grid pattern
│   └── main.tsx                     # Application entry point
└── package.json
```

---

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables (Optional for local dev):**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(By default, local development falls back to Cloudflare Turnstile's official test site key so contact unlocking works out of the box).*

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## License

Designed and engineered by **Al Adiyat Nur Rusuli Jaya** ([github.com/alygmi](https://github.com/alygmi)).
