# Understand — Codebase Knowledge Graph

## Qué es
Genera un grafo de conocimiento interactivo del códigobase usando el plugin `understand-anything`. Permite explorar arquitectura, componentes, relaciones y dependencias visualmente.

## Requisitos
- Node.js ≥ 22
- pnpm ≥ 10
- Plugin instalado en `~/.agents/skills/understand`

## Comandos

```bash
# Análisis completo del proyecto
/understand

# Reconstrucción forzada (ignorar caché)
/understand --full

# Revisión con LLM (más profunda, más lenta)
/understand --review

# Actualización automática en cada commit
/understand --auto-update
```

## Archivos que genera
| Archivo | Propósito |
|---------|-----------|
| `.understand-anything/knowledge-graph.json` | Grafo completo (nodos + aristas) |
| `.understand-anything/meta.json` | Metadatos del análisis |
| `.understand-anything/fingerprints.json` | Huellas para updates incrementales |
| `.understand-anything/config.json` | Configuración (auto-update) |
| `.understand-anything/.understandignore` | Patrones de exclusión |

## Ignorar archivos
Editar `.understand-anything/.understandignore` para excluir archivos/directorios del análisis. Misma sintaxis que `.gitignore`.

## Dashboard
Después del análisis, ejecutar `/understand-dashboard` para lanzar el dashboard interactivo.

## Flujo de trabajo
1. Ejecutar `/understand` después de cambios significativos
2. Revisar el grafo en el dashboard
3. Usar `/understand-explain` para deep-dive en archivos específicos
4. Usar `/understand-diff` para analizar cambios entre commits

## Referencias
- `~/.agents/skills/understand/SKILL.md`
- https://github.com/anomalyco/understand-anything
