---
materia: Frontend
tipo: guia
fecha: 2026-11-20
probado: 2026-11-20
tags: [clase, frontend, live-coding]
---

# Live coding · Puesta al día del catálogo

**Programación IV · Frontend · UNIAJC · unos 50 minutos**

Taller de los estudiantes: [[Taller 2026-11-20 - Puesta al dia del catalogo]] · Explicación de los cambios: [[Ajustes del 13-nov - que se corrigio y por que]]

## Qué fue la clase del 13-nov y dónde quedó

En la clase del 13-nov se construyó el **catálogo de SaborU con datos de prueba**: seis recetas falsas con la misma forma que los datos de TheMealDB, la tarjeta (`Card`), la rejilla (`CardGrid`), el buscador, los filtros y la paginación (visibles, sin JavaScript), los estados (`Estado` y `Esqueleto`), la página `/estados` y las tres destacadas de la portada.

En vivo se alcanzó a escribir la parte del catálogo, y eso quedó en `main` como `(main): add footer and catalogo` (commit `30f8ac2`). Es lo que hoy ven los estudiantes en GitHub. Faltaron dos cosas:

1. **Seis errores de tipeo** que no rompían el build, pero sí la página.
2. **Las piezas que no se alcanzaron:** las imágenes de prueba, `Estado`, `Esqueleto`, `/estados` y las destacadas.

El taller de ese día no se dejó, así que los proyectos de los grupos están más o menos en el mismo punto. Esta guía y su taller ponen a todos al día.

## La rama del live coding

Rama **`puesta-al-dia-catalogo`**, aparte de `main`. Empieza en `30f8ac2` (donde quedó la clase) y tiene **un commit por paso**. Al final, el código es idéntico al de `main`: 6 páginas, 0 archivos `.js`.

```bash
git log --oneline 30f8ac2..puesta-al-dia-catalogo
```

| Paso | Commit | Minutos |
|---|---|---|
| 1 | `fix: tarjeta: import de Etiqueta, dificultad, icono y cuerpo con titulo y etiquetas` | 10 |
| 2 | `fix: rejilla: la clase del CSS es .rejilla, igual que en el HTML` | 3 |
| 3 | `fix: buscador: viewBox, stroke-width y aria-hidden del icono` | 3 |
| 4 | `feat: imagenes de prueba de las seis recetas` | 2 |
| 5 | `feat: componentes Estado (vacio y error) y Esqueleto (cargando)` | 10 |
| 6 | `feat: pagina /estados con los cuatro estados` | 7 |
| 7 | `feat: tres recetas destacadas en la portada` | 5 |
| 8 | `build: publicar en GitHub Pages desde la rama gh-pages con npm run deploy` | 10 |

### Dos maneras de usarla

**A. Programar en vivo** sobre una rama de práctica que arranca donde quedó la clase:

```bash
git switch -c practica-catalogo 30f8ac2
npm install
npm run dev
```

Y si algo se rompe, mostrar cómo debe quedar el paso N: `git show <commit>` o, en VS Code, el panel *Source Control → Graph*.

**B. Recorrer los commits** (si hay poco tiempo): `git switch --detach <commit>` paso por paso, abriendo en VS Code el archivo cambiado y la vista de diferencias. Para volver: `git switch main`.

En los dos casos, los estudiantes pueden seguir los mismos commits en GitHub: *Code → rama `puesta-al-dia-catalogo` → Commits*.

### Fragmentos de VS Code

La rama ya trae `.vscode/live-coding.code-snippets` del 13-nov. Los `-todo` son **idénticos** a la solución (verificado):

| Prefijo | Archivo |
|---|---|
| `lc2-card-todo` · `lc2-card` (solo marcado) · `lc2-card-css` | `Card.astro` |
| `lc3-grid-todo` | `CardGrid.astro` |
| `lc4-busqueda-todo` | `BarraDeBusqueda.astro` |
| `lc6-estado-todo` · `lc6-esqueleto-todo` | `Estado.astro` · `Esqueleto.astro` |
| `lc7-estados-todo` | `estados.astro` |

**Regla:** los errores (pasos 1 a 3) se corrigen **a mano y en voz alta**, porque eso es lo que se enseña. Lo que es nuevo y largo (pasos 5 y 6) se pega con el fragmento y se explica leyendo.

---

## Paso 1 (10 min) · La tarjeta

Abre `/catalogo` en `npm run dev`: las tarjetas tienen foto (rota) y nada más. Abre `src/components/catalogo/Card.astro`.

> **Ojo: la tarjeta solo se ve bien después de 1.4.** Los subpasos 1.1, 1.2 y 1.3 corrigen errores que **todavía no se ven**: la etiqueta, la dificultad y el ícono se usan en el cuerpo de la tarjeta, que se agrega en 1.4. Después de 1.1 la página se ve **igual que antes**, y eso es lo esperado. Y la foto sigue rota hasta el **Paso 4**, porque las imágenes todavía no existen en `public/`. Díselo al grupo antes de empezar para que nadie piense que algo falló.

**1.1** El import:

```astro
import { Etiqueta } from "../ui/Etiqueta.astro";   // antes
import Etiqueta from "../ui/Etiqueta.astro";       // ahora
```

> Qué decir: "Un componente `.astro` se exporta **por defecto**: se importa sin llaves. Las llaves son para lo que se exporta con nombre, como `export const recetas`. Este error no rompió el build porque la tarjeta todavía no usaba la etiqueta: en cuanto la usemos, falla. Por eso, al corregirlo, la página **no cambia**: la etiqueta aparece cuando agreguemos el cuerpo en 1.4."

**1.2** La desestructuración: `dficultad` → `dificultad`.

> Qué decir: "El nombre tiene que ser **idéntico** al del objeto. JavaScript no avisa: simplemente da `undefined`."

**1.3** El ícono del corazón: en el `path`, `…L12 21.2l8.8.8a5.5…` → `…L12 21.2l8.8-8.8a5.5…`.

**1.4** El cuerpo de la tarjeta, después del `</div>` de `tarjeta__medio` (o pega `lc2-card` y compara):

```astro
  <div class="tarjeta__cuerpo">
    <h3 class="tarjeta__titulo">
      <a class="tarjeta__enlace" href={`${base}catalogo/${id}`}>{nombre}</a>
    </h3>
    <p class="tarjeta__meta">{categoria} · {area}</p>
    <div class="tarjeta__etiquetas">
      <Etiqueta>{dificultad}</Etiqueta>
      <Etiqueta>{minutos} min aprox.</Etiqueta>
    </div>
  </div>
```

> Qué decir: "El enlace del título tiene un `::after` que cubre toda la tarjeta (está en el CSS): por eso toda la tarjeta es clicable con un solo enlace. El favorito queda encima con `z-index: 2`."

**Qué debe salir (después de 1.4):** tarjetas con título enlazado, "Pollo · Japonesa" y dos etiquetas ("Media", "45 min aprox."). Todavía una debajo de otra (se arregla en el Paso 2) y con la foto rota (se arregla en el Paso 4).

## Paso 2 (3 min) · La rejilla

`src/components/catalogo/CardGrid.astro`: el CSS dice `.rejila` y el HTML dice `class="rejilla"`.

```css
.rejila {    /* antes: una sola l */
.rejilla {   /* ahora */
```

> Qué decir: "Este es el error más común del curso. El navegador no avisa: si la clase del CSS no coincide con la del HTML, simplemente no aplica. Truco: `Ctrl+F` con el nombre de la clase; si no aparece en el HTML, está mal escrita."

**Qué debe salir:** tres columnas en escritorio, una en el celular, sin una sola media query.

## Paso 3 (3 min) · El ícono del buscador

`src/components/catalogo/BarraDeBusqueda.astro`, en el `<svg>`:

| Antes | Ahora | Por qué |
|---|---|---|
| `viewBox="0 24 24"` | `viewBox="0 0 24 24"` | Son cuatro números: x, y, ancho y alto |
| `stro-width="2"` | `stroke-width="2"` | Un atributo mal escrito se ignora en silencio |
| `aria-hiddden="true"` | `aria-hidden="true"` | El lector de pantalla anunciaba un dibujo sin sentido |

> Qué decir: "Ninguno de estos tres errores rompe nada visible a primera vista. El tercero ni siquiera se ve: solo lo nota quien usa un lector de pantalla."

## Paso 4 (2 min) · Las imágenes de prueba

Aquí se arreglan las **fotos rotas** que venían desde el Paso 1. Los datos dicen `imagen: "img/recetas/pollo-teriyaki.svg"`, pero la carpeta no existe (en DevTools → Red sale `404`). Copia las seis imágenes a `public/img/recetas/`:

```bash
git checkout puesta-al-dia-catalogo -- public/img
```

(o cópialas de `Frontend_programacion_IV/Clase-2026-11-13-Catalogo/codigo-live-coding/public/img/`).

> Qué decir: "Lo que está en `public/` se sirve tal cual, y en el `src` siempre va `${base}` delante, por GitHub Pages."

## Paso 5 (10 min) · `Estado` y `Esqueleto`

Crea `src/components/ui/Estado.astro` (`lc6-estado-todo`) y `src/components/ui/Esqueleto.astro` (`lc6-esqueleto-todo`).

> Qué decir: "Vacío y error se parecen: ícono, título, explicación y una salida. Por eso son **un** componente con una prop `tipo`. El de error lleva `role="alert"` para que el lector de pantalla lo anuncie. Y el cargando no es una rueda: son bloques con la forma de la tarjeta, así el usuario ya sabe qué va a aparecer."

## Paso 6 (7 min) · La página `/estados`

Crea `src/pages/estados.astro` (`lc7-estados-todo`). Recorre los cuatro estados en el navegador: cargando, con datos, vacío y error.

> Qué decir: "Esta página no es para el usuario final: es la referencia del equipo. Cuando conectemos la API, cada estado ya está diseñado."

## Paso 7 (5 min) · Las destacadas de la portada

`src/pages/index.astro`:

```astro
import CardGrid from "../components/catalogo/CardGrid.astro";
import { recetas } from "../data/datos-de-prueba.js";
```

Reemplaza `<p class="pendiente">Aqui van las tres recetas destacadas.</p>` por:

```astro
<CardGrid recetas={recetas.slice(0, 3)} />
```

y borra la regla `.pendiente` del `<style>`.

> Qué decir: "Reutilizamos la misma rejilla y la misma tarjeta. `slice(0, 3)` toma las tres primeras sin modificar el arreglo."

## Paso 8 (10 min) · Publicar desde la rama `gh-pages`

```bash
touch public/.nojekyll
npm install -D gh-pages
```

En `package.json`: `"deploy": "astro build && gh-pages -d dist --dotfiles -m \"deploy: sitio construido\""`. En `.github/workflows/deploy.yml`: `on: workflow_dispatch:`.

> Qué decir: "Actions está bloqueado por facturación, y además Pages estaba publicando `main`, que es el código fuente: por eso se veía el README o un 'Hola Mundo'. Ahora construimos aquí y subimos solo `dist/` a la rama `gh-pages`. `.nojekyll` evita que GitHub esconda la carpeta `_astro`, donde está el CSS."

Después del merge a `main`: `npm run deploy` (termina con `Published`) y, una vez, **Settings → Pages → Deploy from a branch → `gh-pages` / `(root)`**.

## Verificación final

```bash
npm run build      # 6 page(s) built, 0 archivos .js
npm run preview
```

- A 320 px, en Inicio, Catálogo y Estados la consola responde `true`: `document.documentElement.scrollWidth === document.documentElement.clientWidth`.
- `Tab` recorre cada tarjeta y su favorito por separado, y el foco se ve.
- Compara con `main`: `git diff practica-catalogo main -- src public` no debe mostrar nada.
