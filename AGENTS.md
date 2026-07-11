# drupalio.dev — Harness Principal

Este archivo es el punto de entrada para cualquier agente AI que trabaje en este proyecto.
Sigue los principios de **Spec-Driven Development**, **Harness Engineering** y **Loop Engineering**.

---

## 1. Constitución del Proyecto

### Propósito
Portfolio personal de Drupalio — sitio Nuxt 3 con contenido bilingüe (en/es), CV interactivo, y blog técnico sobre desarrollo web, seguridad y AI.

### Principios Rectores
- **Specs primero, código después**: Toda funcionalidad comienza con una especificación en `content/blueprints/`
- **Verificador explícito**: Nunca declarar una tarea como completa sin pasar sus verificadores
- **Bucles, no prompts**: Diseñar loops que el agente ejecuta autónomamente, no prompts que requieren intervención humana
- **Repositorio como sistema de registro**: Cada decisión, especificación y verificación vive en el repo
- **Legible + Ejecutable + Verificable**: El código base debe ser las tres cosas

### Stack
- **Framework**: Nuxt 3.16+ (Vue 3.5, Vite)
- **UI**: Nuxt UI v3, PrimeVue 4, GSAP animaciones
- **Contenido**: @nuxt/content v3 (Markdown en `content/`)
- **i18n**: @nuxtjs/i18n (en/es)
- **Estado**: Pinia
- **Estilo**: ESLint flat config, TypeScript
- **Despliegue**: GitHub Pages via GitHub Actions

---

## 2. Especificación (Spec Kit /specify)

Antes de implementar cualquier funcionalidad, crear una especificación en `content/blueprints/`.

### Formato de Especificación
```markdown
# [Nombre del Feature]

## Qué (What)
Descripción del problema o necesidad desde la perspectiva del usuario.

## Por qué (Why)
Justificación de negocio o valor.

## Criterios de Aceptación
- [ ] Verificable automáticamente
- [ ] Medible
- [ ] Sin ambigüedad

## Stack Técnico
Tecnologías y patrones a usar.

## Verificadores
- Test: [comando para verificar]
- Lint: [comando para verificar]
- Typecheck: [comando para verificar]
- Preview: [comando para verificar]
```

### Flujo Spec Kit
1. `/specify` — Definir qué construir (guardar en `content/blueprints/`)
2. `/clarify` — Resolver ambigüedades
3. `/plan` — Crear plan técnico
4. `/tasks` — Desglosar en tareas
5. `/analyze` — Verificar consistencia
6. `/implement` — Ejecutar implementación

---

## 3. Harness Engineering — El Sistema de Trabajo

### Archivos de Conocimiento (el Harness)
| Archivo | Propósito |
|---------|-----------|
| `AGENTS.md` | Este archivo — punto de entrada, constitución, reglas |
| `.opencode/AGENTS.md` | Configuración específica de opencode |
| `.opencode/skills/*.md` | Skills del proyecto (metodologías, patrones) |
| `.understand-anything/knowledge-graph.json` | Grafo de conocimiento del código (generado por `/understand`) |
| `content/internal/*.md` | Documentación interna (arquitectura, decisiones) |
| `content/blueprints/*.md` | Especificaciones de features |

### Reglas de Comportamiento del Agente
1. **Leer AGENTS.md primero** antes de cualquier acción
2. **No declarar victoria temprano** — siempre ejecutar verificadores antes de marcar como completo
3. **Dejar estado limpio** — al finalizar una sesión, commitear cambios y documentar en el log
4. **Contexto a través de archivos** — no confiar en la ventana de contexto; escribir decisiones en archivos
5. **Un feature por sesión** — no mezclar features no relacionados en el mismo commit

### Verificadores del Proyecto
```bash
# Lint
npm run lint

# Typecheck
npx nuxi typecheck

# Build
npm run build

# Generate (static export)
npm run generate

# Preview
npm run preview
```

---

## 4. Loop Engineering — Procesos de Tareas

### Bucle Interno del Agente (segundos-minutos)
```
descubrir → planificar → ejecutar → verificar → (repetir hasta condición de parada)
```

### Bucle de Feedback del Desarrollador (minutos-horas)
```
revisar producto → ajustar especificación → realimentar al agente
```

### Checklist de Loop Engineering
1. [ ] **Definir "done"** en términos medibles antes de escribir una instrucción
2. [ ] **Fijar los verificadores** (tests, lint, typecheck) por adelantado
3. [ ] **Elegir open vs closed loop** según necesidad de novedad × presupuesto
4. [ ] **Adjuntar datos de ejecución** al resultado (logs, screenshots, evidencia)
5. [ ] **Usar el harness menos autónomo** que logre el resultado
6. [ ] **Fijar el trigger** (cron, webhook, o manual) para que ejecute sin supervisión
7. [ ] **Compartir artefactos** — escribir resultados en archivos que otros loops puedan leer

### Formato de Tarea
```markdown
## Tarea: [nombre]

### Goal
[qué se quiere lograr, en términos medibles]

### Loop
[secuencia de pasos que el agente ejecuta]

### Stop Condition
- [ ] Condición 1
- [ ] Condición 2
- O después de [N] intentos

### Verificadores
- [ ] Test: [comando]
- [ ] Lint: [comando]
- [ ] Typecheck: [comando]
```

---

## 5. Git Hooks — Automatización Local

El proyecto usa hooks en `.githooks/` (configurado via `git config core.hooksPath .githooks`).

| Hook | Disparador | Qué hace |
|------|-----------|----------|
| `pre-commit` | Antes de cada commit | Bloquea `.env`, alerta sobre secrets, verifica frontmatter en `.md` |
| `post-commit` | Después de cada commit | Agrega entrada al log de sesión en `AGENTS.md`, notifica si hay cambios de código para re-indexar |
| `post-merge` | Después de pull/merge | Agrega entrada al log de sesión con archivos fusionados |

Para activar en un clone nuevo:
```bash
git config core.hooksPath .githooks
```

## 6. Estructura del Proyecto

```
drupalio.dev/
├── AGENTS.md                    # Harness principal (este archivo)
├── .opencode/
│   ├── AGENTS.md                # Configuración de opencode
│   └── skills/                  # Skills del proyecto
│       ├── spec-driven-development.md
│       ├── harness-engineering.md
│       ├── loop-engineering.md
│       ├── nuxt-content-workflow.md
│       └── understand.md
├── .githooks/                   # Git hooks (pre-commit, post-commit, post-merge)
├── .understand-anything/        # Knowledge graph del código
├── content/
│   ├── config.json              # Configuración de @nuxt/content
│   ├── internal/                # Documentación interna
│   │   ├── constitution.md
│   │   ├── architecture.md
│   │   └── workflow.md
│   └── blueprints/              # Especificaciones de features
│       └── template.md
├── components/
│   ├── HarvardCV.vue
│   └── Resume.vue
├── plugins/
│   ├── i18n.js                  # vue-i18n con locales/externos
│   ├── pinia.js
│   ├── primevue.js
│   ├── fontawesome.js
│   └── gsap.js
├── locales/
│   ├── en.json
│   └── es.json
├── store/
│   └── languageStore.js
├── assets/
│   ├── animations.css
│   └── tailwind.css
├── animations.js
├── app.config.ts
├── app.vue                      # Entry point (Resume + theme + i18n)
├── nuxt.config.ts
└── package.json
```

---

## 7. Log de Sesión

Al finalizar cada sesión de trabajo, agregar una entrada al final de este archivo:

```
## Sesión: [YYYY-MM-DD]

### Qué se hizo
- [feature/task completada]

### Verificadores ejecutados
- [ ] Lint: pass/fail
- [ ] Typecheck: pass/fail
- [ ] Build: pass/fail

### Estado del proyecto
- Limpio / Pendiente de commit / WIP

### Próximos pasos
- [ ] Siguiente tarea
