---
materia: Frontend
tipo: taller
fecha: 2026-11-13
entrega: 2026-11-20
tags: [clase, frontend, taller]
---

# Taller · Componentes del catálogo con datos de prueba

**Programación IV · Frontend · UNIAJC · 13 de noviembre de 2026**
En parejas. 40 minutos en clase y el resto en casa. **Entrega: antes de la próxima clase (20-nov-2026).**

Volver a 2026-11-13 - Componentes del catalogo · Guía del profesor: Guia 2026-11-13 - Componentes del catalogo

## Objetivo

Que la página de listado de **su** proyecto se vea como su mockup, con tarjetas que reciben datos de prueba por props, y que exista su pantalla de estados.

**No se copia SaborU: se traduce.** Si su API es de películas, la tarjeta muestra título, año y género; si es de países, bandera, nombre y región. Los campos salen de **su** API.

## Antes de empezar (5 min)

- [ ] El taller de ayer está publicado: Layout, Header, Footer, Boton, portada y sus seis rutas.
- [ ] `npm run build` termina sin errores.
- [ ] Abran en el navegador una respuesta real de su API y anoten qué campos van a mostrar en la tarjeta.

## Parte 1 · En clase (35 min)

| Orden | Qué | Listo cuando… |
|---|---|---|
| 1 | `src/data/datos-de-prueba.js` con **seis** elementos de su dominio y `export const` | Los campos tienen los mismos nombres en los seis objetos y corresponden a datos que su API sí entrega |
| 2 | `Card.astro` que recibe **un** elemento por props | No hay ningún texto escrito a mano dentro de la tarjeta: todo sale del objeto |
| 3 | La imagen de la tarjeta con `width`, `height`, `alt` y `aspect-ratio` | Con *Slow 3G* el contenido no salta |
| 4 | `CardGrid.astro` con `repeat(auto-fit, minmax(…, 1fr))` | Una columna a 375 px y tres en escritorio, sin `@media` |
| 5 | Su página de listado usa `CardGrid` con los seis elementos | Se ve como su mockup |
| 6 | `npm run build`, commit y `push` | Check verde en Actions |

## Parte 2 · En casa (hasta el 20-nov)

1. **Toda la tarjeta clicable** con el `::after` del enlace del título, y un botón de acción (favorito u otro) de 44 × 44 px que quede encima.
2. **Filtros, buscador y paginación** como en su mockup. Todavía no funcionan, solo se ven. En el celular, filtros en fila; en escritorio, como diga su mockup.
3. **Su página `/estados`** con los cuatro estados: cargando (`Esqueleto`), con datos, vacío y error (`Estado`). Los textos de vacío y error en español, sin códigos, y cada uno con una salida.
4. Tres elementos destacados en su portada con `slice(0, 3)`.
5. **Prueba de 320 px** en el listado y en estados. En la consola debe salir `true`:

   ```javascript
   document.documentElement.scrollWidth === document.documentElement.clientWidth
   ```

## Entrega (aula virtual o README)

1. URL publicada de su listado y de su `/estados`.
2. Captura del listado a 320 px y en escritorio, al lado de su mockup.
3. Su archivo `datos-de-prueba.js` y, en dos líneas, de qué campos de la API sale cada dato de la tarjeta.
4. Enlace al último commit. En **Insights → Contributors** deben aparecer los dos integrantes.

## Calificación (100 puntos)

| Criterio | Puntos |
|---|---|
| Datos de prueba con la forma de su API (seis elementos, mismos campos) | 15 |
| `Card` recibe el elemento por props, sin textos fijos | 20 |
| Imagen con `width`, `height`, `alt` y proporción fija | 10 |
| `CardGrid` con `auto-fit` y `minmax`, sin media queries | 15 |
| Listado igual al mockup, con filtros, buscador y paginación visibles | 15 |
| Página `/estados` con los cuatro estados | 15 |
| 320 px sin desplazamiento horizontal y sitio publicado con Actions en verde | 10 |

- Un `npm run build` que falla en Actions resta 15 puntos.
- **Reto opcional (+5):** que los filtros se generen solos desde los datos con `new Set()`, sin escribir las categorías a mano.

## Errores frecuentes

| Síntoma | Solución |
|---|---|
| `Cannot read properties of undefined` | La prop no se llama igual en los dos lados: `<Card receta={receta} />` y `const { receta } = Astro.props` |
| `.map is not a function` | A `CardGrid` le llegó algo que no es un arreglo |
| `does not provide an export named …` | El `import { x }` con llaves necesita `export const x` en el archivo |
| Las imágenes no aparecen | Falta `${base}` en el `src` |
| El clic en el botón de la tarjeta abre el enlace | Falta `z-index` en el botón |
| Desplazamiento horizontal a 320 px | Falta `min-width: 0` en una columna de Grid o en la fila de filtros |
| El contenido salta al cargar | Faltan `width` y `height` en el `<img>` |
