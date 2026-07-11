# Nuxt Content Workflow — Skill

## Estructura de Contenido
```
content/
├── config.json          # Configuración global de @nuxt/content
├── internal/            # Documentación interna (no pública)
│   ├── constitution.md
│   ├── architecture.md
│   └── workflow.md
└── blueprints/          # Especificaciones de features
    └── template.md
```

## Configuración (content/config.json)
```json
{
  "navigation": {
    "fields": ["title", "description", "icon"]
  },
  "locales": ["en", "es"],
  "defaultLocale": "en"
}
```

## Frontmatter para archivos de contenido
```yaml
---
title: "Título del artículo"
description: "Breve descripción"
date: 2024-01-01
icon: "heroicons:document-text"
locale: es
---
```

## Reglas
- Contenido público en `content/` raíz o subdirectorios
- Contenido interno en `content/internal/` (no enrutado automáticamente)
- Blueprints en `content/blueprints/` (especificaciones, no contenido publicado)
- Usar `locale` en frontmatter para contenido bilingüe
- Las imágenes van en `public/images/`

## Comandos Útiles
```bash
# Ver contenido en desarrollo
npm run dev

# Generar sitio estático
npm run generate

# Vista previa del build
npm run preview
```

## Referencias
- https://content.nuxt.com/
- `content/config.json`
