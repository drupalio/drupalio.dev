## Task 1: Núcleo Nuxt 4

**Description:** Actualizar `nuxt` a `^4.0.0`, correr `nuxt prepare` y corregir breaking changes manteniendo estructura v3.

**Acceptance criteria:**
- [ ] `package.json` pide `nuxt@^4.0.0`, lock actualizado
- [ ] `nuxi typecheck` sin errores nuevos
- [ ] `pnpm build` completa

**Verification:**
- [ ] Typecheck: `npx nuxi typecheck`
- [ ] Build: `pnpm build`
- [ ] Manual: `pnpm dev` arranca sin warnings de compat

**Dependencies:** None

**Files likely touched:**
- `package.json`
- `pnpm-lock.yaml`
- `nuxt.config.ts`

**Estimated scope:** Medium: 3-5 files

## Task 2: @nuxt/ui v3 → v4

**Description:** Subir `@nuxt/ui` a v4 (requiere Nuxt ≥4.1) y agregar `tailwindcss` si la guía lo pide.

**Acceptance criteria:**
- [ ] `@nuxt/ui@^4` instalado, sin `ButtonGroup/PageMarquee/PageAccordion/nullify` que migrar (verificado: sin usos)
- [ ] CSS principal importa `@nuxt/ui` si v4 lo exige
- [ ] Build en verde

**Verification:**
- [ ] Build: `pnpm build`
- [ ] Manual: revisar `/`, `/blog`, `/projects/quizzer-ai-interview-system`

**Dependencies:** Task 1

**Files likely touched:**
- `package.json`
- `assets/css/main.css`
- `nuxt.config.ts`

**Estimated scope:** Small: 1-2 files

## Task 3: @nuxt/image v2 + @nuxt/icon v2

**Description:** Subir `@nuxt/image` a v2 y `@nuxt/icon` a v2 manteniendo `screens.xs/xxl` explícitos.

**Acceptance criteria:**
- [ ] Versiones v2 instaladas
- [ ] `image.screens` conserva `xs: 320` y `xxl: 1536`
- [ ] Sin providers personalizados que migrar a `defineProvider` (verificar)

**Verification:**
- [ ] Build: `pnpm build`
- [ ] Manual: imágenes de proyectos cargan

**Dependencies:** Task 1

**Files likely touched:**
- `package.json`
- `nuxt.config.ts`

**Estimated scope:** Small: 1-2 files

## Task 4: color-mode v4 + content/fonts minors

**Description:** Subir `@nuxtjs/color-mode` a v4 y `@nuxt/content`/`@nuxt/fonts` a minors vigentes. Verificar toggle de tema.

**Acceptance criteria:**
- [ ] Versiones objetivo instaladas
- [ ] Toggle claro/oscuro funciona (usa `$colorMode` en `composables/useTheme.ts`)
- [ ] `pnpm lint` + typecheck + build + generate en verde

**Verification:**
- [ ] Lint: `pnpm lint`
- [ ] Typecheck: `nuxi typecheck`
- [ ] Build: `pnpm build`
- [ ] Static: `pnpm generate`
- [ ] Manual: toggle de tema en `/`

**Dependencies:** Tasks 1-3

**Files likely touched:**
- `package.json`
- `composables/useTheme.ts`

**Estimated scope:** Small: 1-2 files

## Task 5: Cierre

**Description:** Marcar blueprint `done`, commit en rama `chore/nuxt4-migration`.

**Acceptance criteria:**
- [ ] `content/blueprints/nuxt4-migration.md` en `done` con CAs marcadas
- [ ] Rama pusheable, verificadores finales en verde

**Verification:**
- [ ] `npm outdated` sin majors del ecosistema Nuxt pendientes
- [ ] `pnpm lint`, `nuxi typecheck`, `pnpm build`

**Dependencies:** Tasks 1-4

**Estimated scope:** XS: 1 file

## Checkpoint: Núcleo (tras Task 1)
- [ ] typecheck + build en verde sobre Nuxt 4 con módulos v3

## Checkpoint: Módulos (tras Tasks 2-4)
- [ ] Los 4 verificadores en verde + revisión visual de 3 rutas

## Checkpoint: Complete (tras Task 5)
- [ ] Todas las CAs del blueprint cumplidas, listo para review/merge
