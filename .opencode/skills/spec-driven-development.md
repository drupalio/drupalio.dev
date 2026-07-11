# Spec-Driven Development — Skill

## Qué es
Metodología donde las especificaciones son ejecutables. En lugar de escribir código primero, se escribe una especificación en `content/blueprints/` y luego se implementa.

## Flujo de Trabajo

### 1. `/specify` — Definir
Escribir especificación en `content/blueprints/[feature].md` con:
- Qué (What): problema desde perspectiva del usuario
- Por qué (Why): justificación de valor
- Criterios de Aceptación: verificables, medibles, sin ambigüedad
- Stack Técnico: tecnologías y patrones
- Verificadores: comandos exactos

### 2. `/clarify` — Resolver ambigüedades
El agente pregunta sobre puntos no especificados antes de planificar.

### 3. `/plan` — Plan técnico
Crear plan con arquitectura, componentes, flujo de datos, decisiones técnicas.

### 4. `/tasks` — Desglosar
Dividir el plan en tareas atómicas con verificadores individuales.

### 5. `/analyze` — Verificar consistencia
Cross-artifact check: la especificación, el plan y las tareas están alineados.

### 6. `/implement` — Ejecutar
Implementar cada tarea, ejecutando verificadores después de cada una.

## Reglas
- No implementar nada que no tenga una especificación en `content/blueprints/`
- No saltarse `/clarify` a menos que la especificación esté 100% clara
- Los criterios de aceptación deben ser verificables automáticamente

## Referencias
- https://speckit.org/
- `content/blueprints/template.md`
