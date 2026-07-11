# Harness Engineering — Skill

## Qué es
Sistema de trabajo que constriñe el comportamiento del agente con reglas explícitas, mantiene contexto entre sesiones, y verifica el trabajo automáticamente.

## Los 6 Componentes del Harness

### 1. Contexto
- `AGENTS.md` como punto de entrada (constitución, reglas, estructura)
- Skills en `.opencode/skills/` para conocimiento especializado
- Documentación interna en `content/internal/` para decisiones y arquitectura

### 2. Herramientas
- MCP servers para navegación estructural del código
- Scripts de proyecto para dev, build, test, lint
- Playwright para tests visuales y E2E

### 3. Orquestación
- El agente sigue el flujo: descubrir → planificar → ejecutar → verificar
- Un feature por sesión — no mezclar features no relacionados

### 4. Estado
- El repositorio es el sistema de registro
- Decisiones se escriben en archivos, no se confían a la ventana de contexto
- Log de sesión al final de `AGENTS.md`

### 5. Evaluación
- Verificadores explícitos antes de declarar completo
- Lint, typecheck, build, generate siempre ejecutados
- No declarar victoria temprano

### 6. Recuperación
- Si un verificador falla, el agente debe diagnosticar y corregir
- Máximo de intentos antes de escalar al humano

## Reglas de Comportamiento
1. Leer AGENTS.md primero
2. No declarar victoria temprano
3. Dejar estado limpio al finalizar
4. Contexto a través de archivos
5. Un feature por sesión

## Referencias
- https://walkinglabs.github.io/learn-harness-engineering/en/
- `AGENTS.md` (harness principal)
