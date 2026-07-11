# Loop Engineering — Skill

## Qué es
Disciplina de diseñar el loop que el agente ejecuta — qué hace entre llamadas a herramientas, cuándo verifica su trabajo, y cómo decide que terminó — en lugar de escribir prompts manualmente.

## Los 3 Loops (Andrew Ng)

### Loop 1: Agentic Coding Loop (segundos-minutos)
```
descubrir → planificar → ejecutar → verificar → (repetir)
```
- Lo ejecuta el agente autónomamente
- Se verifica con tests, lint, typecheck
- Stop condition: todos los verificadores pasan o se alcanzó el máximo de intentos

### Loop 2: Developer Feedback Loop (minutos-horas)
```
revisar producto → ajustar especificación → realimentar al agente
```
- Lo ejecuta el desarrollador humano
- Ajusta la dirección basado en revisión del output

### Loop 3: External Feedback Loop (horas-semanas)
```
alpha testers → A/B tests → datos de producción → actualizar visión
```
- Feedback del mundo real
- Alimenta la visión del producto

## Open Loop vs Closed Loop

| Aspecto | Open Loop | Closed Loop |
|---------|-----------|-------------|
| Qué es | Meta amplia, condiciones sueltas | Criterios de éxito fijos |
| Cuándo usarlo | Exploración, features novedosos | Tareas predecibles y repetitivas |
| Riesgo | Quema de tokens, degradación | No sorprende, hace lo especificado |
| Verificador | Crítico (es lo único que separa exploración de slop) | Crítico (define el stop condition) |

## Checklist para Diseñar un Loop
1. [ ] Definir "done" en términos medibles
2. [ ] Fijar verificadores por adelantado
3. [ ] Elegir open vs closed según necesidad × presupuesto
4. [ ] Adjuntar datos de ejecución al resultado
5. [ ] Usar el harness menos autónomo que funcione
6. [ ] Fijar el trigger (cron, webhook, manual)
7. [ ] Compartir artefactos entre loops

## Formato de Tarea con Loop
```markdown
## Tarea: [nombre]

### Goal
[qué se quiere lograr, medible]

### Loop
[secuencia de pasos]

### Stop Condition
- [ ] Condición 1
- O después de [N] intentos

### Verificadores
- [ ] Test: [comando]
- [ ] Lint: [comando]
```

## Referencias
- https://www.aibuilderclub.com/blog/loop-engineering-guide-2026
- `AGENTS.md` (sección Loop Engineering)
