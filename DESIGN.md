# DESIGN.md — drupalio.dev (v3)

Dirección de diseño del portfolio. El propietario es el autor; este archivo
solo la transcribe. Reemplaza los intentos anteriores (vidrio expresivo y
oscuro premium), descartados por el propietario. Nueva dirección elegida
desde tendencias 2027 investigadas (scroll coreografiado, fin de lo plano,
serif tecnológica leída como IA, humanidad verificada).

## Identidad

Revista técnica personal de Ricardo Morales, ingeniero de software, bilingüe
(en/es). Audiencia: reclutadores, clientes, pares técnicos. Se lee denso,
editado y humano: titulares enormes, reglas estructurales, dato real.

## Personalidad y mood

Editorial de ingeniería: tinta sobre papel, jerarquía tipográfica fuerte,
números y reglas que ordenan, contenido denso pero respirable. Cero efectos,
cero decoración sin función. La firma es la composición tipográfica.

## Paleta

- Papel `#fafafa` / tinta `#18181b` en light; `#0a0a0b` / `#ededed` en dark
  (se mantienen, con toggle).
- Un solo acento ámbar tonal (`#7a4d0f` light / `#d9a441` dark,
  contrastes 6.95 / 8.8 verificados). Uso reservado: palabra de énfasis,
  estados activos, detalles de índice.
- Reglas (`border`) como estructura visible entre bloques, nunca como adorno.

## Tipografía

- Display: Cabinet Grotesk (Fontshare, `@nuxt/fonts`). Motivo: grotesca con
  carácter para titulares enormes; la serif tecnológica se lee como IA en
  2027 (investigación), así que queda descartada para este sitio (R-06).
- Cuerpo/UI: Geist. Mono (Geist Mono) solo para datos reales: fechas,
  etiquetas de índice, versiones, estado.

## Composición

- Hero: nombre oversize a todo ancho, fila de meta real, entradilla.
- Proyectos home: índice editorial (proyecto / stack / año / caso) en lugar
  de tarjetas; un flagship con despliegue mayor.
- Secciones numeradas con regla superior; ritmo variado por contenido
  (RHYTHM 3): lista densa, prosa ancha, par editorial, tabla de datos.
- Blog: ya es lista; se entona al sistema (titulares display, reglas).
- Footer: colofón compuesto, sin columnas plantilla.

## Movimiento

MOTION 1: hovers y transiciones de color. Contenido visible por defecto (A1),
`prefers-reduced-motion` respetado, sin parallax ni bucles.

## Dials

ENERGY 2 / RHYTHM 3 / MOTION 1.

Design Read: revista técnica personal de ingeniería para audiencia técnica
y contratante, en lenguaje editorial denso y sobrio, dial
ENERGY 2 / RHYTHM 3 / MOTION 1.
