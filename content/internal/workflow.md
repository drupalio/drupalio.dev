# Workflow de Desarrollo

## Ciclo de Vida de un Feature

### 1. Especificación
```
/specify → content/blueprints/[feature].md
```
- Escribir qué y por qué
- Definir criterios de aceptación
- Elegir stack técnico

### 2. Planificación
```
/clarify → resolver ambigüedades
/plan → plan técnico detallado
/tasks → desglosar en tareas atómicas
/analyze → verificar consistencia
```

### 3. Implementación
```
/implement → ejecutar tareas una por una
```
- Cada tarea ejecuta sus verificadores
- Si falla, diagnosticar y corregir antes de continuar

### 4. Verificación
```bash
npm run lint        # ESLint
npx nuxi typecheck  # TypeScript
npm run build       # Build de producción
npm run generate    # Exportación estática
npm run preview     # Vista previa local
```

### 5. Commit
- Un feature por commit
- Mensaje descriptivo: `feat: [nombre del feature]`
- No mezclar cambios no relacionados

## Flujo de Trabajo Diario

### Inicio de Sesión
1. Leer `AGENTS.md` (reglas actualizadas)
2. Revisar log de sesión anterior
3. Verificar estado del repo (`git status`)
4. Identificar siguiente tarea del blueprint activo

### Durante la Sesión
1. Una tarea a la vez
2. Ejecutar verificadores después de cada cambio
3. Si algo no funciona, diagnosticar antes de pedir ayuda
4. Documentar decisiones en archivos

### Fin de Sesión
1. Ejecutar verificadores completos
2. Hacer commit si hay cambios completados
3. Agregar entrada al log de sesión en `AGENTS.md`
4. Dejar el repo en estado limpio
5. Si hubo cambios de código, considerar ejecutar `/understand` para actualizar el knowledge graph

## Manejo de Errores

### Verificador falla
1. Leer el error completo
2. Identificar la causa raíz
3. Corregir
4. Re-ejecutar verificador
5. Si persiste después de 3 intentos, escalar al humano

### Contexto perdido
1. Releer `AGENTS.md`
2. Revisar `content/internal/` para decisiones previas
3. Revisar `content/blueprints/` para especificaciones activas
4. Revisar git log para cambios recientes

### Merge conflict
1. No resolver automáticamente
2. Notificar al humano
3. Esperar instrucciones
