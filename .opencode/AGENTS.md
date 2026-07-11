# opencode Configuration — drupalio.dev

## Agent Behavior
- **Mode**: plan + auto — primero planificar, luego ejecutar
- **Max turns per task**: 25 (evitar loops infinitos)
- **Verification required**: siempre ejecutar verificadores antes de declarar completo

## Permissions
- **File operations**: read/write en todo el proyecto
- **Git operations**: commit/push solo con aprobación explícita
- **Network access**: permitido para npm install, fetch de documentación

## MCP Servers
- **codebase-memory-mcp**: indexar el proyecto para navegación estructural

## Skills Disponibles
Ver `.opencode/skills/` para skills específicas del proyecto.

## Reglas Adicionales
1. No modificar archivos fuera del workspace sin preguntar
2. No ejecutar `npm install` sin verificar primero si ya está instalado
3. No crear archivos de documentación a menos que se solicite explícitamente
4. Preferir ediciones pequeñas y frecuentes sobre cambios masivos
