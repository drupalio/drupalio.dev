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

MOTION 2: hovers con presión táctil, titulares con cinética atada al scroll
(`animation-timeline`, solo transform, contenido siempre visible), grano
estático global tenue. `prefers-reduced-motion` desactiva todo movimiento.
Contenido visible por defecto (A1).

## Profundidad 2026 (dosis estricta, cohesión ante todo)

Tres capas, cada una con motivo escrito; nada se apila por tendencia:
- Escarcha (vidrio 2.0): solo nav al hacer scroll (refracta contenido real)
  y panel de métricas del flagship (refracta placa ámbar). 2 elementos (R-10).
- Brutalismo táctil: sombra dura direccional en botones primarios (presión
  al hover/active) y placa ámbar offset tras métricas. Geometría afilada solo
  donde hay borde estructural (índice, flagship).
- Cinética + grano: titulares display con rise atado al scroll; grano fino
  sobre el sustrato, detrás del contenido (A12).

## Dials

ENERGY 2 / RHYTHM 3 / MOTION 2.

Design Read: revista técnica personal de ingeniería para audiencia técnica
y contratante, en lenguaje editorial denso con profundidad 2026, dial
ENERGY 2 / RHYTHM 3 / MOTION 2.
