---
materia: Frontend
tipo: taller
fecha: 2026-11-20
entrega: 2026-11-24
tags: [clase, frontend, taller]
---

# Taller · Puesta al día: el catálogo completo con datos de prueba

**Programación IV · Frontend · UNIAJC · 20 de noviembre de 2026**
En parejas, en casa. **Entrega: 24-nov-2026.** Es la base del taller de datos reales desde la API: sin este catálogo terminado, no hay dónde mostrar los datos de la API.

Guía de apoyo (paso a paso con el proyecto de ejemplo): [[Live coding 2026-11-20 - Puesta al dia del catalogo]]

## Objetivo

Que todos los proyectos queden donde quedó SaborU en la última clase, con las correcciones aplicadas:

- El listado se ve como su mockup, con **seis elementos de prueba** que tienen la forma de los datos de su API.
- Tarjetas (`Card`) que reciben el elemento por props, en una rejilla (`CardGrid`) que se acomoda sola.
- Buscador, filtros y paginación **visibles** (todavía no funcionan: eso llega con JavaScript).
- Página `/estados` con los cuatro estados: cargando, con datos, vacío y error.
- Tres destacados en la portada.
- Sitio publicado desde la rama `gh-pages` e integrado en `main`.

**No se copia SaborU: se traduce.** Si su API es de películas, la tarjeta muestra título, año y género; si es de países, bandera, nombre y región.

## Cómo apoyarse en el proyecto de ejemplo

En el repositorio de SaborU (grupo 10) está la rama **`puesta-al-dia-catalogo`**. Empieza exactamente donde quedó el live coding y tiene **un commit por paso**. En GitHub: *Code → rama `puesta-al-dia-catalogo` → Commits*. Abran cada commit y verán, en verde y rojo, qué se agregó y qué se corrigió.

| Commit | Qué hace | Parte del taller |
|---|---|---|
| 1 | Tarjeta: import de `Etiqueta`, `dificultad`, ícono y cuerpo con título y etiquetas | Parte 1 y 2 |
| 2 | Rejilla: la clase del CSS es `.rejilla`, igual que en el HTML | Parte 1 y 2 |
| 3 | Buscador: `viewBox`, `stroke-width` y `aria-hidden` del ícono | Parte 1 y 2 |
| 4 | Imágenes de prueba de las seis recetas | Parte 2 |
| 5 | Componentes `Estado` y `Esqueleto` | Parte 3 |
| 6 | Página `/estados` | Parte 3 |
| 7 | Tres destacadas en la portada | Parte 4 |
| 8 | Publicar desde la rama `gh-pages` | Parte 5 |

## Antes de empezar (10 min)

- [ ] El taller del 12-nov está en `main`: `Layout`, `Header`, `Footer`, `Boton`, `Etiqueta`, portada y sus seis rutas.
- [ ] `git switch main`, `git pull` y `npm run build` sin errores.
- [ ] Rama nueva: `git switch -c feature/catalogo`.
- [ ] Abran en el navegador una respuesta real de su API y anoten los campos que va a mostrar la tarjeta.

## Parte 1 · Revisar los errores que quedaron en el live coding

En SaborU quedaron seis errores. **Ninguno rompió el build** (`npm run build` decía *Complete*): un error de tipeo en CSS, en un atributo o en un SVG no avisa, solo se ve mal. Revisen si alguno está en su código:

| # | Error | Qué se ve | Corrección |
|---|---|---|---|
| 1 | `import { Etiqueta } from "../ui/Etiqueta.astro"` | El build falla en cuanto se usa la etiqueta | Un `.astro` se importa **sin llaves**: `import Etiqueta from …` |
| 2 | Un campo mal escrito al desestructurar (`dficultad`) | El dato sale vacío | El nombre debe ser idéntico al del objeto de datos |
| 3 | La tarjeta sin `tarjeta__cuerpo` | Foto sin título, sin enlace y sin etiquetas | Título con enlace, línea de datos y etiquetas |
| 4 | `.rejila` en el CSS y `rejilla` en el HTML | Las tarjetas salen una debajo de otra también en escritorio | La clase del CSS y la del HTML deben ser **idénticas** |
| 5 | `viewBox="0 24 24"`, `stro-width`, `aria-hiddden` | Ícono deformado; el lector de pantalla lo anuncia | `viewBox="0 0 24 24"`, `stroke-width`, `aria-hidden` |
| 6 | Imágenes que no existen en `public/` | Imágenes rotas | Cada ruta de los datos debe existir en `public/` y usarse con `${base}` |

> Truco: en VS Code, `Ctrl+F` sobre el nombre de una clase del CSS. Si no aparece en el HTML del mismo archivo, está mal escrita.

## Parte 2 · Datos de prueba, tarjeta y rejilla

| Orden | Qué | Listo cuando… |
|---|---|---|
| 1 | `src/data/datos-de-prueba.js` con **seis** elementos de su dominio y `export const` | Los seis objetos tienen los mismos campos, con nombres que corresponden a datos que su API sí entrega |
| 2 | Listas para los filtros calculadas con `[...new Set(…)]` | No hay categorías escritas a mano |
| 3 | `Card.astro` recibe **un** elemento por props | Ningún texto escrito a mano dentro de la tarjeta: todo sale del objeto |
| 4 | Imagen con `width`, `height`, `alt` y `aspect-ratio` | Con *Slow 3G* en DevTools el contenido no salta |
| 5 | Toda la tarjeta clicable con el `::after` del enlace del título, y el botón de favorito de 44 × 44 px encima (`z-index: 2`) | El clic en el favorito no abre el enlace |
| 6 | `CardGrid.astro` con `repeat(auto-fit, minmax(260px, 1fr))` | Una columna a 375 px y tres en escritorio, sin `@media` |
| 7 | Buscador, filtros y paginación como en su mockup | Se ven; en el celular los filtros van en fila y no desbordan (`min-width: 0`) |
| 8 | Su página de listado usa todo lo anterior | Se ve como su mockup |

## Parte 3 · Estados: cargando, vacío y error

1. `Estado.astro`: **vacío** y **error** comparten estructura (ícono, título, mensaje y una salida); solo cambian el ícono, el color y los textos. El de error lleva `role="alert"`.
2. `Esqueleto.astro`: bloques grises con la forma de la tarjeta, no una rueda girando.
3. Página `/estados` con los cuatro estados uno debajo del otro: cargando (`Esqueleto`), con datos (tres tarjetas), vacío y error. Los textos en español, sin códigos técnicos, y cada uno con una salida ("Ver todo", "Intentar de nuevo").

## Parte 4 · Destacados en la portada

Reemplacen el recuadro de "aquí van los destacados" por:

```astro
<CardGrid recetas={recetas.slice(0, 3)} />
```

(con el nombre de su colección y de su prop) y borren el CSS del recuadro que ya no se usa.

## Parte 5 · Publicar desde la rama `gh-pages`

GitHub Actions está bloqueado por facturación en la organización (*"your account is locked due to a billing issue"*), así que se publica **desde una rama**: construyen en su computador y suben solo `dist/` a la rama `gh-pages`. Muchos repositorios tienen hoy Pages apuntando a `main` / `(root)`: eso publica el **código fuente** (se ve el README y `/catalogo` da 404).

**Una sola vez:**

1. `base` en `astro.config.mjs` = el nombre exacto de su repositorio (`"/frontend-programacion-iv-crear-repo-group-N/"`).
2. Archivo vacío `public/.nojekyll` (sin él, Jekyll esconde la carpeta `_astro/` y el sitio sale sin estilos):

   ```bash
   touch public/.nojekyll          # Git Bash. En PowerShell: New-Item public/.nojekyll
   ```

3. `npm install -D gh-pages`
4. En `package.json`, dentro de `"scripts"`:

   ```json
   "deploy": "astro build && gh-pages -d dist --dotfiles -m \"deploy: sitio construido\""
   ```

5. En `.github/workflows/deploy.yml`, el disparador a manual (para que cada push no deje una X roja):

   ```yaml
   on:
       workflow_dispatch:
   ```

**Después del merge a `main`:**

```bash
git switch main
git pull
npm install           # por si cambiaron de rama: deja instalado gh-pages
npm run deploy        # debe terminar con: Published
```

Y una sola vez en GitHub: **Settings → Pages → Deploy from a branch → `gh-pages` / `(root)` → Save**. En *Actions* aparece *pages build and deployment* (ese sí funciona con el bloqueo); con el check verde, abran su URL.

## Entrega: el taller debe quedar integrado en `main`

**Se revisa y se califica lo que esté en la rama `main` en la fecha de entrega.** Un trabajo que se quede en `feature/catalogo` sin fusionar no está entregado.

```bash
git add .
git commit -m "feat: catalogo completo con datos de prueba, estados y destacados"
git push -u origin feature/catalogo
```

1. Abran el pull request de `feature/catalogo` hacia `main`; el otro integrante lo revisa y lo aprueba.
2. **Merge pull request → Confirm merge.**
3. Verifiquen y publiquen: `git switch main`, `git pull`, `npm run build`, `npm run deploy`.

> Si GitHub avisa de conflictos: `git switch feature/catalogo`, `git merge main`, corrijan los archivos marcados, `git add .`, `git commit` y `git push`.

## Evidencia (aula virtual o README)

1. Enlace al pull request fusionado en `main`.
2. URL publicada del listado, de `/estados` y de la portada.
3. Captura del listado a 320 px y en escritorio, al lado de su mockup.
4. Su `datos-de-prueba.js` y, en dos líneas, de qué campo de la API sale cada dato de la tarjeta.

## Calificación (100 puntos)

| Criterio | Puntos |
|---|---|
| Revisión de los seis errores: ninguno está en su código | 10 |
| Datos de prueba con la forma de su API (seis elementos, mismos campos) y filtros calculados con `Set` | 15 |
| `Card` recibe el elemento por props, sin textos fijos, clicable completa y con favorito encima | 20 |
| Imagen con `width`, `height`, `alt` y proporción fija | 5 |
| `CardGrid` con `auto-fit` y `minmax`, sin media queries; buscador, filtros y paginación visibles | 15 |
| Página `/estados` con los cuatro estados | 15 |
| Tres destacados en la portada | 5 |
| Publicado desde `gh-pages` (con estilos y sin 404) y 320 px sin desplazamiento horizontal | 15 |

- Solo se califica lo que esté integrado en `main` en la fecha de entrega.
- Un `npm run build` que falla resta 15 puntos. Un fallo del flujo `deploy.yml` por el bloqueo de facturación **no** resta.

## Errores frecuentes

| Síntoma | Solución |
|---|---|
| `Cannot read properties of undefined` | La prop no se llama igual en los dos lados: `<Card receta={receta} />` y `const { receta } = Astro.props` |
| `.map is not a function` | A `CardGrid` le llegó algo que no es un arreglo |
| `does not provide an export named …` | El `import { x }` con llaves necesita `export const x`; un `.astro` va **sin** llaves |
| Las tarjetas salen una debajo de otra en escritorio | La clase del CSS no coincide con la del HTML |
| Las imágenes no aparecen | Falta `${base}` en el `src`, o el archivo no está en `public/` |
| El clic en el favorito abre el enlace | Falta `z-index: 2` en el botón |
| Desplazamiento horizontal a 320 px | Falta `min-width: 0` en la columna de resultados o en la fila de filtros |
| El sitio publicado muestra el README | Pages apunta a `main`: cámbienlo a `gh-pages` |
| El sitio publicado sale sin estilos | Falta `public/.nojekyll` o `--dotfiles` en el script |
| Al hacer clic en una tarjeta sale 404 | **Es lo esperado:** la página de detalle se construye en el taller de datos reales desde la API |
| Todo el código sale como texto o `Astro is not defined` | El archivo `.astro` no empieza con `---` en la línea 1, columna 1. Si pegaron el código corrido, `Shift+Tab` hasta pegarlo al borde |
| Corregí el `import` de la tarjeta y la página se ve igual | Es normal: la etiqueta solo aparece cuando la tarjeta tiene su cuerpo (título y etiquetas) |
| `Parameter 'c' implicitly has an 'any' type` | Aviso del editor (el build pasa): el componente no declara sus props. `interface Props { categorias?: string[]; dificultades?: string[] }` en el frontmatter |
| `git switch main` dice *"Please move or remove them before you switch branches"* | Hay archivos nuevos sin guardar que también existen en la otra rama. Primero `git add -A` y `git commit` (o `git stash push -u`) y después cambien de rama |
| `npm run deploy` dice `Filename too long` | En PowerShell: `$env:CACHE_DIR = "$env:TEMP\ghp"; npm run deploy` |
