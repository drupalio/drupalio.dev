# Portfolio Redesign 2026 — Engineering Dashboard

## What (Problem)
The current portfolio is a single-file 2,535-line `Resume.vue` that renders a traditional vertical CV with carousel sliders, Tokyo Night neon gradients, floating gradient spheres, a noise overlay, and FontAwesome iconography. It communicates "resume" not "engineering capability." It cannot compete for an Awwwards-level nomination in 2026.

## Why (Motivation)
The portfolio should present engineering capability — systems thinking, AI engineering, backend architecture, performance — not a chronological job list. The current design feels like a 2022 template: neon cyber aesthetic, noisy background animations, repeated card templates, and no visual hierarchy. It needs to feel like Linear / Stripe Sessions / Anthropic — minimal, editorial, technical, timeless.

---

## Part 1 — Weaknesses in the Current Design

### 1.1 Architecture / Code Structure
| # | Weakness | Impact |
|---|----------|--------|
| W1 | `Resume.vue` is 2,535 lines — template + script + 1,400 lines of scoped CSS in one file | Unmaintainable. Any change risks breaking something. No separation of concerns. |
| W2 | `App.vue` duplicates theme + language logic that also lives in `Resume.vue` | Two sources of truth for theme/language state. Race conditions on init. |
| W3 | `process.client` / `process.server` checks are used incorrectly throughout (`process` is undefined in Nuxt 3 browser context) | Runtime errors in strict mode. Should use `import.meta.client`. |
| W4 | i18n is manually reimplemented — custom `getNestedValue`, custom `t`/`tm` wrappers with `console.log` debug noise | vue-i18n is already installed. The wrappers add bugs, not value. |
| W5 | `store/languageStore.js` imports from `../i18n/translations` which does not exist | Dead code. Pinia store is never used. |
| W6 | `main.js` and `index.html` exist but Nuxt doesn't use them — Nuxt has its own entry | Confusing. Dead files. |
| W7 | PrimeVue is registered globally (Button, Card, Divider, Avatar) but never used in templates | 3MB of unused JS shipped to client. |
| W8 | `html2pdf.js` is dynamically imported at top of `setup()` with `await` — blocks component init | Adds 200KB+ to client bundle for a commented-out feature. |
| W9 | GSAP plugin registered but only used for one `animateHero` call that does a simple fade | Overkill. CSS transitions suffice. |
| W10 | No `pages/` directory, no routing — entire app is `App.vue` → `Resume.vue` | No SEO per page, no code-splitting, no lazy loading. |
| W11 | `@nuxt/content` is installed and configured but zero content files exist in `content/` (only blueprints/internal docs) | Wasted dependency. Blog/projects could be content-driven. |
| W12 | `@nuxt/image` installed but `<img>` used directly for profile picture | No image optimization, no lazy loading, no responsive srcset. |

### 1.2 Visual Design
| # | Weakness | Impact |
|---|----------|--------|
| V1 | **Tokyo Night neon palette** (blue #7aa2f7, purple #bb9af7, pink #f7768e) reads as "cyberpunk VS Code theme" not "premium engineering portfolio" | Feels like a developer's terminal theme, not Linear/Stripe/Anthropic. |
| V2 | **3 floating gradient spheres** with `blur(60px)` animating across the viewport | Distracting. Tastes like 2021 Webflow template. Kills performance (GPU compositing). |
| V3 | **Noise overlay** (SVG turbulence as base64 background) | Adds visual clutter. Premature texture. Linear/Vercel don't do this. |
| V4 | **Grid overlay** (40px grid lines at 3% opacity) | Futuristic-cliché. Conflicts with "editorial" direction. |
| V5 | **Gradient text** on the name (`-webkit-background-clip: text`) | Dated 2020 trend. Apple/Linear use solid typography, not gradient text. |
| V6 | **Every section is the same card** — same border, same radius, same shadow, same hover glow | Monotonous. No visual hierarchy. No bento variation. |
| V7 | **Carousel pattern** used 3 times (work, skills, pet projects) — hidden content, manual navigation, floating progress indicators | Carousels hide content. Bad for SEO, bad for UX, bad for mobile. Users shouldn't fight a carousel to read experience. |
| V8 | **Floating progress indicator** shows "42%" in the center of the carousel on transition | Gimmicky. Feels like a loading screen, not an info display. |
| V9 | **No whitespace rhythm** — sections are 2rem padded boxes stacked with 2rem gap | No breathing room. No editorial spacing. Everything feels the same weight. |
| V10 | **Font: Inter + Space Mono** via Google Fonts `@import` in `<style>` | Render-blocking. No variable font axes used. Space Mono is decorative, not premium. |
| V11 | **No typography scale** — titles are 1.8rem, subtitles 1.6rem, body 1.1rem | Flat hierarchy. Editorial design needs dramatic size contrast (e.g. 4rem hero → 1rem body). |
| V12 | **Dancing Script cursive font** loaded in tailwind.css but never used | Dead font load. |

### 1.3 UX / Interaction
| # | Weakness | Impact |
|---|----------|--------|
| U1 | **Theme toggle is a floating circle stuck to the right edge** — no nav bar, no header | No navigation at all. Users can't jump to sections. No way to navigate the page except scroll. |
| U2 | **Language toggle is a tiny "ES/EN" circle** | Discoverable only by accident. No proper language switcher. |
| U3 | **Carousels require clicking left/right arrows** to see content | Content is hidden. On mobile, the arrows are off-screen (`left: -5rem`). |
| U4 | **No scroll progress indicator** | Long page with no sense of where you are. |
| U5 | **No keyboard navigation** for carousels | Accessibility failure. |
| U6 | **`neo-section:hover` adds glow to every section** — the entire page glows as you scroll | Distracting. Sections shouldn't react to hover unless interactive. |
| U7 | **No focus-visible styles** anywhere | Keyboard users can't see where they are. |
| U8 | **No reduced-motion support** — GSAP animations and CSS transitions ignore `prefers-reduced-motion` | Accessibility failure. |
| U9 | **PDF generation is commented out** but code + html2pdf dependency remain | Dead weight. |

### 1.4 Performance
| # | Weakness | Impact |
|---|----------|--------|
| P1 | FontAwesome **entire library** added (`library.add(fas, far, fab)`) | Ships ~300KB of icon SVGs. Should use tree-shaken individual icons or `@nuxt/icon` (already installed). |
| P2 | Google Fonts `@import` in CSS | Render-blocking request. Should use `@nuxt/fonts` (already installed). |
| P3 | Background image `background.jpg` is 1.1MB | Not used in current design but exists in public/. |
| P4 | No lazy loading of any component or image | Everything renders at once. |
| P5 | PrimeVue CSS + PrimeIcons loaded but unused | ~50KB wasted. |
| P6 | `better-sqlite3` in dependencies — native module, heavy, unused in frontend | Build complexity for no reason. |

### 1.5 SEO / Meta
| # | Weakness | Impact |
|---|----------|--------|
| S1 | `index.html` has a static `<title>` — Nuxt doesn't use it | No dynamic meta. No `useHead`, no `useSeoMeta`. |
| S2 | No Open Graph tags | No social sharing preview. |
| S3 | No structured data (JSON-LD) | No Person schema. |
| S4 | `robots.txt` exists but is 24 bytes — likely just a placeholder | No sitemap reference. |
| S5 | No `lang` attribute dynamic switching | `<html lang="en">` hardcoded. |

### 1.6 Content
| # | Weakness | Impact |
|---|----------|--------|
| C1 | Content is in JSON locale files, not `@nuxt/content` | No Markdown. Projects are one-line descriptions. No case studies. No blog. |
| C2 | `petProjects` key is referenced in `Resume.vue` but doesn't exist in locale JSON | Silent failure — section renders empty. |
| C3 | Skills are a flat list of "Expert/Experienced/Proficient" tags | Not informative. No context of where/how used. |
| C4 | Work experience is a carousel of company cards with project bullets | Not case studies. No metrics. No architecture diagrams. No results. |

---

## Part 2 — Redesign Plan

### 2.1 Design System

**Typography**
- Primary: **Geist** (variable font, via `@nuxt/fonts` self-hosted)
- Mono: **Geist Mono** (for code/metrics labels)
- Scale: `text-sm` 14px / `text-base` 16px / `text-xl` 20px / `text-2xl` 24px / `text-4xl` 36px / `text-6xl` 60px / `text-7xl` 72px
- Titles: tight tracking (`tracking-tight`), font-weight 600, not bold
- Body: `text-base`, `leading-relaxed`, `text-muted` color

**Color (Dark first)**
```
--bg: #0a0a0b         (near-black, not pure)
--surface: #131316     (card)
--surface-2: #1a1a1f   (elevated)
--border: #26262b      (subtle)
--text: #ededed        (high contrast)
--text-muted: #8a8a93  (secondary)
--accent: #6366f1      (indigo — restrained, used only on interactive elements)
--accent-muted: rgba(99, 102, 241, 0.1)
```
**Light mode**
```
--bg: #fafafa
--surface: #ffffff
--surface-2: #f4f4f5
--border: #e4e4e7
--text: #18181b
--text-muted: #71717a
--accent: #6366f1
```

**Spacing**: 8pt system (8, 16, 24, 32, 48, 64, 96, 128)
**Radius**: `rounded-xl` (12px) for cards, `rounded-2xl` (16px) for large surfaces
**Shadows**: `shadow-sm` only. No colored glows. Ever.

**Motion**
- Duration: 150ms default, 200ms for entrances
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (Apple-style ease-out)
- Properties: opacity, transform (translate/scale), filter (blur on entrance only)
- `prefers-reduced-motion`: disable all transforms
- No infinite animations. No floating spheres. No noise.

### 2.2 Layout — Bento Grid

Replace single-column sections with a CSS Grid bento layout. Desktop: 12-column grid, `gap-4`. Mobile: single column.

```
┌─────────────────────────────┐
│  HEADER (sticky, minimal)   │  nav + theme/lang toggle
├──────────────┬──────────────┤
│              │              │
│   HERO       │   STATUS     │  name, title, status card (available/	location)
│   (col-7)    │   (col-5)    │
├──────────────┴──────────────┤
│  ABOUT (col-12, prose)      │  editorial paragraph
├──────────────┬──────────────┤
│  EXPERIENCE  │  TECH STACK  │  timeline left, stack grid right
│  (col-8)     │  (col-4)     │
├──────────────┴──────────────┤
│  FEATURED PROJECTS (col-12) │  3 case study cards, each different
├──────────────┬──────────────┤
│  AI LAB      │  GITHUB      │  mini bento
│  (col-6)     │  (col-6)     │
├──────────────┴──────────────┤
│  TIMELINE (col-12)          │  horizontal career timeline
├─────────────────────────────┤
│  CONTACT / FOOTER (col-12)  │
└─────────────────────────────┘
```

Every card has a different treatment:
- **Hero card**: no card border, just typography on bg
- **Status card**: small card, `surface-2` bg, dot indicator
- **About**: no card, just prose with a section label
- **Experience**: vertical timeline, no card per entry
- **Tech stack**: grid of pills, `surface` bg
- **Featured projects**: 3 distinct layouts — one wide, one tall, one with screenshot
- **AI Lab**: dark card with code snippet aesthetic
- **GitHub**: contribution graph + stats
- **Timeline**: horizontal scroll with year markers
- **Contact**: minimal, just email + social links

### 2.3 Component Architecture

```
components/
├── layout/
│   ├── AppHeader.vue          # sticky nav, minimal
│   ├── AppFooter.vue
│   └── ScrollProgress.vue     # thin top bar
├── bento/
│   ├── HeroCard.vue
│   ├── StatusCard.vue
│   ├── AboutSection.vue
│   ├── ExperienceTimeline.vue
│   ├── TechStackGrid.vue
│   ├── FeaturedProjects.vue
│   ├── ProjectCaseStudy.vue    # used 3x with different layouts via props
│   ├── AILabCard.vue
│   ├── GitHubCard.vue
│   ├── CareerTimeline.vue
│   └── ContactCard.vue
├── ui/
│   ├── BentoCard.vue          # base card wrapper (slot, variant prop)
│   ├── ThemeToggle.vue
│   ├── LanguageToggle.vue
│   ├── AnimatedNumber.vue     # count-up on intersect
│   └── SectionLabel.vue       # "01 — About" style label
└── content/                    # for @nuxt/content rendering
    └── (none needed initially)

composables/
├── useTheme.ts                # theme state, localStorage, system pref
├── useLocale.ts               # language state
└── useInView.ts               # IntersectionObserver wrapper
```

### 2.4 Data Architecture

Move content from JSON locale files to `@nuxt/content` Markdown files:

```
content/
├── en/
│   ├── about.md
│   ├── projects/
│   │   ├── banking-modernization.md
│   │   ├── ai-interview-system.md
│   │   └── recommendation-engine.md
│   └── experience/
│       └── (structured YAML frontmatter + MD body)
├── es/
│   └── (mirrored)
└── config.json
```

Each project case study Markdown file:
```markdown
---
title: Banking Platform Modernization
company: Banco Nacional del Perú
period: 2021-2023
role: Java Microservices Developer
stack: [Java, Spring Boot, Kubernetes, GCP]
metrics:
  - label: Latency
    value: "-73%"
  - label: Throughput
    value: "12M req/day"
status: shipped
---

## Challenge
...

## Architecture
...

## Results
...
```

For Phase 1, keep JSON locale data but restructure it. Migrate to Content in Phase 3.

---

## Part 3 — Migration Roadmap

### Phase 1: Foundation (this session)
**Goal**: Clean architecture, design system, working homepage with bento layout.

1. **Clean up dependencies** — remove PrimeVue, PrimeIcons, html2pdf, GSAP, FontAwesome-full, better-sqlite3. Add `@nuxt/icon` usage, keep `@nuxt/fonts`, `@nuxt/image`.
2. **Create design tokens** — `assets/css/tokens.css` with CSS custom properties for both themes.
3. **Create composables** — `useTheme`, `useLocale`, `useInView`.
4. **Create UI components** — `BentoCard`, `ThemeToggle`, `LanguageToggle`, `SectionLabel`, `AnimatedNumber`.
5. **Create bento components** — break `Resume.vue` into the component tree above.
6. **Create `pages/index.vue`** — compose bento components.
7. **Update `App.vue`** — minimal: theme init, font loading, `<NuxtPage />`.
8. **Add SEO** — `useSeoMeta` in index page, JSON-LD Person schema.
9. **Delete dead code** — `main.js`, `index.html`, `store.js`, `HarvardCV.vue`, old `Resume.vue`, `animations.js`, `animations.css`, `tailwind.css` cursive font.

**Verifiers**:
- `npm run dev` works
- Lighthouse > 90 on Performance, Accessibility, Best Practices, SEO
- No console errors
- Mobile responsive

### Phase 2: Content Migration (next session)
- Move experience data to `content/en/experience/*.md`
- Move projects to `content/en/projects/*.md` as full case studies
- Query with `queryContent()` in components
- i18n via `@nuxt/content` locale routing

### Phase 3: Polish (next session)
- View Transitions API for theme/language switching
- Animated numbers on scroll into view
- GitHub contribution graph (server route via Nitro)
- Case study detail pages with `pages/projects/[slug].vue`
- Blog via `content/en/blog/*.md`

### Phase 4: Performance (next session)
- `@nuxt/image` for all images
- Lazy components (`LazyProjectCaseStudy`)
- Font subsetting via `@nuxt/fonts`
- Critical CSS inlining
- Preload hero content

---

## Verificadores
- Test: `npm run dev && open http://localhost:3000` (visual)
- Lint: `npm run lint`
- Typecheck: `npx nuxi typecheck`
- Build: `npm run build`
- Lighthouse: Chrome DevTools → Lighthouse → All categories