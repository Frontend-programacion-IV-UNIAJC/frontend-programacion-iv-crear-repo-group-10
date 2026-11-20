---
materia: Frontend
tipo: guia
fecha: 2026-11-20
probado: 2026-11-20
tags: [clase, frontend, live-coding]
---

# Datos reales desde la API · Guía de la clase del 20-nov-2026

**Programación IV · Frontend · UNIAJC · 3 horas: 1 h 30 de clase y 1 h 20 de taller**

Volver a [[Clase 05 - Datos reales desde la API]] · [[Frontend]]

Hoy SaborU deja los datos de prueba y muestra las recetas reales de **TheMealDB**. Las tarjetas no cambian: solo cambia de dónde salen los datos. Al final, cada receta tiene su propia página.

**Probado hoy sobre el repositorio:** `npm run build` genera **31 páginas** (6 de antes + 25 recetas), **0 archivos `.js`**, y a 320 px las páginas responden `true`. Con la dirección de la API mal escrita, el build termina igual con los datos de prueba (12 páginas) y deja un aviso.

## Cómo usar esta guía

| Momento | Qué leer |
|---|---|
| **Antes de clase (15 min)** | Secciones 1, 2 y la lista "Antes de entrar al salón" |
| **Mientras proyectas las diapositivas** | Sección 5, "Diapositiva por diapositiva" (también está en las **notas del orador** del PowerPoint: *Presentación con diapositivas → Vista del moderador*) |
| **Mientras programas en vivo** | Pasos 1 a 6: el código, qué decir y qué debe salir |
| **Mientras los estudiantes trabajan** | "Taller en parejas": la revisión de un minuto por grupo |
| **Para explicar lo que se ajustó en `main`** | [[Ajustes del 13-nov - que se corrigio y por que]] |

## 1. Qué se hace hoy

| Página | Dirección | Qué cambia hoy |
|---|---|---|
| **Catálogo** | `/catalogo` | Las seis tarjetas salen de TheMealDB; los filtros se calculan con las categorías reales |
| **Inicio** | `/` | Las tres destacadas son recetas reales |
| **Detalle** (nueva) | `/catalogo/52772` … | Una página por receta con `getStaticPaths`: imagen, etiquetas, ingredientes y preparación |

Archivos nuevos: `src/services/api.js` y `src/pages/catalogo/[id].astro`. Cambian: `catalogo.astro`, `index.astro` y una línea de `Card.astro`.

Mockup de referencia del detalle: `docs/04-mockup/detalle-escritorio.png` y `detalle-movil.png`.

## 2. Estado del repositorio al empezar

- **`main` quedó ajustado**: el commit `fix: completa el catalogo del 13-nov` corrige los errores del live coding del 13 y agrega lo que faltó (Estado, Esqueleto, `/estados` y destacadas). Detalle en [[Ajustes del 13-nov - que se corrigio y por que]].
- **La solución de hoy** está en la rama **`api-2026-11-20`**. Si algo se rompe en vivo: `git stash` y `git switch api-2026-11-20` para mostrar cómo debe quedar; `git switch main` y `git stash pop` para volver.
- **Fragmentos de VS Code** en `main`: `.vscode/api-2026-11-20.code-snippets` (sección 4).
- Código de referencia: `Frontend_programacion_IV/Clase-2026-11-20-API/codigo-live-coding/`.

> **GitHub Actions está bloqueado.** Desde el 7-nov todos los repositorios de la organización `Frontend-programacion-IV-UNIAJC` fallan en 5 segundos con *"The job was not started because your account is locked due to a billing issue"*. No es el código: el trabajo no arranca. Se resuelve en **Settings → Billing and plans** de la organización (lo puede hacer solo un propietario). Además, Pages estaba configurado para publicar desde `main` / `(root)`, que es el código fuente: por eso el sitio muestra "Hola Mundo". **Solución, ya aplicada en `main`:** se publica desde la rama **`gh-pages`** con `npm run deploy` (`astro build` + `gh-pages -d dist --dotfiles`), con `public/.nojekyll` para que Jekyll no ignore `_astro/`. El trabajo *pages build and deployment* lo maneja GitHub y sí funciona con el bloqueo. Falta solo, una vez: **Settings → Pages → Deploy from a branch → `gh-pages` / `(root)`**.

### Antes de entrar al salón

```bash
cd frontend-programacion-iv-crear-repo-group-10
git switch main
git pull
npm install
npm run build      # 6 paginas, sin errores
npm run dev        # http://localhost:4321/frontend-programacion-iv-crear-repo-group-10/
```

- Abre en el navegador `https://www.themealdb.com/api/json/v1/1/search.php?s=` y verifica que responde (sin internet, el plan B son los datos de prueba: el `try/catch` del Paso 4 lo hace solo).
- Ten abiertas las diapositivas en *Vista del moderador* y esta guía en la otra pantalla.

## 3. Distribución del tiempo

| Minuto | Qué se hace | Diapositivas |
|---|---|---|
| 0-10 | Repaso: lo que se ajustó en `main` · Actions bloqueado · `git pull` | 1, 2, 3 |
| 10-25 | Conceptos y **Paso 1**: la API en el navegador y en la consola | 4, 5, 6 |
| 25-35 | **Paso 2** · `api.js` primera versión: las tarjetas salen vacías | 8 |
| 35-50 | **Paso 3** · adaptador, imagen, catálogo y portada · error intencional sin `await` · ver código fuente | 9, 10, 11, 7 |
| 50-58 | **Paso 4** · red de seguridad · error intencional con la dirección mal escrita | 12 |
| 58-80 | **Paso 5** · página de detalle con `getStaticPaths` | 13 |
| 80-90 | **Paso 6** · build, 320 px, commit, `npm run deploy` · presentar el taller | 14, 15 |
| 90-100 | Descanso | |
| 100-170 | **Taller en parejas** (70 min) | |
| 170-180 | Cierre: dos parejas muestran su catálogo con datos reales | 16 |

## 4. Cómo escribir más rápido en vivo

En `main` quedó **`.vscode/api-2026-11-20.code-snippets`**. VS Code lo carga solo al abrir la carpeta. En el archivo escribe el prefijo y presiona **Tab**:

| Prefijo | Qué pega | Paso |
|---|---|---|
| `api2-inicio` | `api.js` primera versión: `fetch`, `json()` y `return datos.meals` | 2 |
| `api3-adaptar` | Traducciones de categorías, `estimarMinutos`, `estimarDificultad` y `adaptarReceta` | 3 |
| `api3-card-src` | Las dos líneas de la imagen local o de la API para `Card.astro` | 3 |
| `api3-catalogo` | El frontmatter del catálogo con la API, filtros y paginación | 3 |
| `api4-import` | El `import` de los datos de prueba | 4 |
| `api4-try` | `obtenerRecetas()` con `timeout`, `respuesta.ok` y `try/catch` | 4 |
| `api5-detalle-front` | Frontmatter del detalle con `getStaticPaths` | 5 |
| `api5-detalle` | El marcado del detalle | 5 |
| `api5-detalle-css` | Los estilos del detalle | 5 |
| `api-todo` · `api3-catalogo-todo` · `api5-detalle-todo` | Archivos completos (plan B si vas atrasado) | |

**La regla para no perder tiempo:** escribe a mano lo que se está enseñando y pega lo repetitivo.

| Se escribe a mano (es lo que se enseña) | Se pega con el fragmento (es repetitivo) |
|---|---|
| `await fetch(...)`, `await respuesta.json()` | El diccionario de 14 categorías |
| `.map(adaptarReceta)` | Las fórmulas de estimación |
| `const recetas = await obtenerRecetas();` | El bucle de los 20 ingredientes |
| `try { } catch { }` y `return recetasDePrueba` | El marcado y los estilos del detalle |
| `getStaticPaths` con `params` y `props` | |

Atajos que ayudan: `Ctrl+P` abre un archivo por nombre · `Ctrl+\` divide la pantalla · `Shift+Alt+F` arregla la sangría de lo pegado · `Ctrl+ñ` abre la terminal · `Ctrl+U` en el navegador muestra el código fuente. **Si te atrasas:** pega el `-todo` del paso y explica leyendo.

---

## 5. Diapositiva por diapositiva: qué decir

### 1. Portada · Datos reales: el catálogo se conecta a la API · 1 min

**Qué decir:** Hasta hoy las recetas las inventamos nosotros en datos-de-prueba.js. Hoy las traemos de TheMealDB, una API pública con cientos de recetas. La buena noticia: las tarjetas no cambian, porque desde el principio las diseñamos con la forma de los datos de la API. Lo único que cambia es de dónde salen los datos.

**Cómo hacerlo:** Señale el celular de la derecha: son recetas reales, con fotos reales, en el mismo diseño del mockup.

### 2. Antes de empezar: lo que se ajustó en main · 5 min

**Qué decir:** Revisé lo que quedó en main después del live coding del 13. Había seis detalles: el import de Etiqueta con llaves, dificultad escrita dficultad, la tarjeta sin su cuerpo (sin título ni etiquetas), la clase rejila con una sola l, tres errores de tipeo en el SVG del buscador y las piezas que no alcanzamos (Estado, Esqueleto, la página de estados y las destacadas). Lo importante: ninguno rompió el build. npm run build decía Complete. Un error de tipeo en CSS o en un atributo no avisa: solo se ve mal. Por eso, además del build, siempre hay que mirar la página.

**Cómo hacerlo:** Haga git pull, abra /catalogo y muestre que ahora la rejilla tiene tres columnas y la tarjeta tiene título. Pregunte: ¿quién tuvo alguno de estos errores en su proyecto?

### 3. Actions en rojo: no es el código · 4 min

**Qué decir:** Desde el 7 de noviembre, Actions sale en rojo en 5 segundos en todos los repositorios de la organización, también en los de ustedes. Si entran al trabajo, el mensaje dice que la cuenta está bloqueada por un problema de facturación: el trabajo ni siquiera arranca, así que no hay error de código que buscar. Y había otro problema: Pages estaba publicando desde main, que es el código fuente, no el sitio. Por eso se veía «Hola Mundo». La solución no necesita Actions: construimos en el computador y subimos solo dist/ a una rama llamada gh-pages con npm run deploy. GitHub sirve esa rama tal cual, y ese trabajo sí funciona.

**Cómo hacerlo:** Abra Actions de cualquier repositorio, entre al trabajo en rojo y muestre la anotación. Luego muestre Settings → Pages con la fuente gh-pages y el sitio publicado. El npm run deploy se hace en vivo en el Paso 6.

### 4. ¿Qué es una API? · 4 min

**Qué decir:** Una API es la ventanilla de un sistema que no es nuestro. Le hacemos un pedido con una dirección y nos devuelve datos. TheMealDB guarda las recetas; nosotros no las copiamos, las pedimos. La dirección tiene tres partes: la base, que no cambia; el recurso que pedimos, search.php; y los parámetros, después del signo de pregunta: s= con el texto a buscar. Vacío significa: dame las que tengas.

**Cómo hacerlo:** Pegue la dirección en el navegador y que vean el JSON. Cambie s= por s=chicken y que vean cómo cambia la respuesta.

### 5. Una petición HTTP por dentro · 4 min

**Qué decir:** Cada vez que el navegador abre una página hace una petición GET. Con la API es igual, solo que en vez de HTML vuelve JSON. Lo primero que se mira de una respuesta es el código: 200, todo bien; 404, eso no existe; 500, el servidor falló; 429, pediste demasiado seguido. Si el código no empieza por 2, no hay datos que usar.

**Cómo hacerlo:** F12 → pestaña Red → recargue la dirección de la API. Muestre Status 200 y Content-Type: application/json. Luego, en la Consola: await (await fetch(url)).json().

### 6. Lo que responde TheMealDB · 4 min

**Qué decir:** Miren los nombres: strMeal, strCategory, strMealThumb. Son los nombres de ellos, no los nuestros. Los ingredientes no vienen en una lista: vienen en veinte campos sueltos, strIngredient1 hasta strIngredient20, y muchos están vacíos. Y lo más importante para SaborU: no viene el tiempo de preparación. Eso ya lo sabíamos desde el briefing.

**Cómo hacerlo:** En el JSON del navegador: Ctrl+F «strIngredient» y muestre los vacíos. Pregunte: ¿dónde está el tiempo? (No está).

### 7. ¿Cuándo se piden los datos? · 3 min

**Qué decir:** En Astro, el código entre las dos rayas --- se ejecuta al construir el sitio, no cuando el visitante abre la página. El fetch ocurre una sola vez, en su computador o en GitHub Actions, y el HTML que se publica ya trae las recetas escritas. Ventajas: carga rápido, no se envía JavaScript y, si la API se cae mañana, el sitio publicado sigue igual. El costo: si la API agrega recetas, no aparecen hasta el siguiente build.

**Cómo hacerlo:** Después del Paso 3: Ctrl+U (ver código fuente) y Ctrl+F «Flan». La receta está escrita en el HTML. En dist/ no hay ningún archivo .js.

### 8. Un solo archivo habla con la API · 2 min

**Qué decir:** Las páginas no deben saber de dónde vienen los datos. Si mañana la API cambia de dirección, o cambiamos de API, se toca un solo archivo: src/services/api.js. Las páginas solo llaman a obtenerRecetas() y reciben recetas con nuestra forma.

**Cómo hacerlo:** Recorra el diagrama de izquierda a derecha y señale la flecha punteada: si la API falla, api.js entrega los datos de prueba.

### 9. El adaptador: la API habla otro idioma · 4 min

**Qué decir:** Cuando conectamos sin adaptar, las tarjetas salieron vacías: Card busca receta.nombre y la API manda strMeal. Había dos caminos: cambiar todos los componentes para que hablen el idioma de TheMealDB, o traducir en un solo lugar. adaptarReceta es ese traductor: recibe un meal y devuelve una receta con la forma de nuestros datos de prueba. Por eso Card casi no se toca: solo aprende que la imagen ahora viene con https://.

**Cómo hacerlo:** Muestre esta diapositiva justo después de las tarjetas vacías del Paso 2. Lea la tabla fila por fila.

### 10. Lo que la API no trae, se estima y se dice · 3 min

**Qué decir:** El tiempo y la dificultad no vienen en la API. Decisión del briefing: estimarlos con lo que sí viene, los ingredientes y los pasos, y decirlo en la interfaz con «aprox.». Un número exacto inventado engaña; uno aproximado y avisado, ayuda. Otro aprendizaje: los datos reales vienen incompletos. Seis recetas no traen strArea; usamos strCountry y, si tampoco viene, «Internacional».

**Cómo hacerlo:** Muestre una tarjeta con «40 min aprox.» y el código de estimarMinutos. Pregunte qué dato estimaría su grupo con su API.

### 11. await: esperar la respuesta · 3 min

**Qué decir:** fetch no devuelve los datos: devuelve una promesa, algo que va a llegar. await espera a que llegue. Sin await, recetas es una promesa y no un arreglo, y por eso .map no existe. Es el error más común de hoy.

**Cómo hacerlo:** Error intencional: borre await en catalogo.astro, corra npm run build y lea el error: recetas.map is not a function. Vuelva a ponerlo.

### 12. Si la API falla, el sitio no se rompe · 3 min

**Qué decir:** La API es de otros: se puede caer, cambiar o tardar. Tres defensas: AbortSignal.timeout para no esperar para siempre, revisar respuesta.ok y un try/catch que vuelve a los datos de prueba y avisa en la consola. El build termina y el sitio sigue funcionando.

**Cómo hacerlo:** Error intencional: escriba themealdb.comm, corra npm run build y muestre el aviso [api] y que se construyen 12 páginas en lugar de 31. Corríjalo.

### 13. Una página por receta: getStaticPaths · 4 min

**Qué decir:** La tarjeta enlaza a /catalogo/52772 y hasta hoy esa página daba 404. No vamos a escribir 25 archivos: catalogo/[id].astro es una plantilla, y getStaticPaths le dice a Astro qué páginas construir. params es la dirección de cada página; props, los datos que recibe. 25 recetas, 25 páginas.

**Cómo hacerlo:** Después del build, cuente las carpetas de dist/catalogo. Abra una receta desde su tarjeta y vuelva con «Volver al catálogo».

### 14. Resultado · 2 min

**Qué decir:** 31 páginas, cero archivos JavaScript, y a 320 px todas responden true. Las tarjetas son las mismas del 13 de noviembre: solo cambió de dónde salen los datos. Esa es la ventaja de haber diseñado primero con datos de prueba que tenían la forma de la API.

**Cómo hacerlo:** Abra npm run preview y recorra Inicio, Catálogo y una receta a 320 px con la consola en true.

### 15. Taller: su API, sus datos · 4 min

**Qué decir:** Ahora cada pareja conecta su propia API. Primero miran la respuesta cruda, después escriben su api.js con su adaptador y su red de seguridad, y al final la página de detalle con getStaticPaths. Entrega el 27 de noviembre, integrada en main con pull request: se califica lo que esté en main.

**Cómo hacerlo:** Muestre la rúbrica del taller y la sección «Publicar en GitHub Pages desde la rama gh-pages»: .nojekyll, gh-pages, el script deploy y Settings → Pages.

### 16. En la siguiente: interactividad · 1 min

**Qué decir:** Hoy todo pasa en el build. En la siguiente clase el buscador, los filtros, la paginación y los favoritos empiezan a funcionar con JavaScript en el navegador, sobre las mismas tarjetas.

**Cómo hacerlo:** Pida a dos parejas que muestren su catálogo con datos reales.

---

## Paso 1 (10-25) · La API en el navegador y en la consola

1. Pega en el navegador: `https://www.themealdb.com/api/json/v1/1/search.php?s=`. Activa *Dar formato* si el navegador lo ofrece.
2. Cambia a `?s=chicken` y luego a `?s=zzzz`: la respuesta es `{ "meals": null }`. **Señálalo:** una búsqueda sin resultados no es un error 404, es un `null`. El código tendrá que manejarlo.
3. `F12` → **Red** → recarga: `200`, `application/json`.
4. En la **Consola** (de cualquier pestaña):

```javascript
const r = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
r.status;              // 200
const datos = await r.json();
datos.meals.length;    // 25
datos.meals[0];        // la primera receta, con strMeal, strCategory...
```

> Qué decir: "Esto es exactamente lo que va a hacer Astro, pero en el build, no en el navegador del visitante."

## Paso 2 (25-35) · `api.js` primera versión

Crea `src/services/api.js` (fragmento `api2-inicio`, pero escribe a mano las tres líneas de la función):

```javascript
// api.js
// Todo lo que habla con TheMealDB vive aqui.
const API = "https://www.themealdb.com/api/json/v1/1";

// Primera version: pedir, convertir a JSON y devolver. Sin adaptar y sin red de seguridad.
export async function obtenerRecetas() {
  const respuesta = await fetch(`${API}/search.php?s=`);
  const datos = await respuesta.json();
  return datos.meals;
}
```

En `src/pages/catalogo.astro` cambia **solo** el import de las recetas:

```astro
import { categorias, dificultades } from "../data/datos-de-prueba.js";
import { obtenerRecetas } from "../services/api.js";

const recetas = await obtenerRecetas();
console.log(recetas[0]); // sale en la TERMINAL, no en la consola del navegador
```

**Qué debe salir:** en la terminal de `npm run dev`, el objeto con `strMeal`, `strCategory`… En el navegador, **seis tarjetas vacías**: sin nombre, sin imagen y con «min» sin número (Astro no escribe `undefined`: deja el espacio vacío).

> Qué decir: "Se conectó, pero las tarjetas no entienden lo que llegó. Card busca `receta.nombre` y la API manda `strMeal`. Hablan idiomas distintos." → diapositiva 8 y 9.

## Paso 3 (35-50) · El adaptador, la imagen y las páginas

**3.1** En `api.js`, debajo de `const API`, pega `api3-adaptar`:

```javascript
// La API entrega las categorias en ingles. Se traducen las que se ven en los filtros.
const CATEGORIAS = {
  Beef: "Res",
  Breakfast: "Desayuno",
  Chicken: "Pollo",
  Dessert: "Postre",
  Goat: "Cabra",
  Lamb: "Cordero",
  Miscellaneous: "Variada",
  Pasta: "Pasta",
  Pork: "Cerdo",
  Seafood: "Mariscos",
  Side: "Acompanamiento",
  Starter: "Entrada",
  Vegan: "Vegana",
  Vegetarian: "Vegetariana",
};

// El tiempo y la dificultad NO vienen en la API (hallazgo del briefing).
// Se estiman con lo que si viene y la interfaz los marca como "aprox.".
function estimarMinutos(ingredientes, pasos) {
  const minutos = 10 + ingredientes * 2 + pasos * 3;
  return Math.round(minutos / 5) * 5; // de 5 en 5: 35, 40, 45...
}

function estimarDificultad(ingredientes) {
  if (ingredientes <= 7) return "Facil";
  if (ingredientes <= 12) return "Media";
  return "Dificil";
}

// El adaptador: traduce una receta de TheMealDB (strMeal, strCategory...)
// a NUESTRO formato (nombre, categoria...). Por eso Card no cambia.
export function adaptarReceta(meal) {
  // La API no trae una lista: trae strIngredient1 ... strIngredient20, muchos vacios.
  const ingredientes = [];
  for (let i = 1; i <= 20; i++) {
    const nombre = meal[`strIngredient${i}`]?.trim();
    const medida = meal[`strMeasure${i}`]?.trim();
    if (nombre) ingredientes.push(medida ? `${medida} ${nombre}` : nombre);
  }

  // Las instrucciones llegan como un solo texto: un paso por linea.
  // Se descartan las lineas que solo dicen "2" o "STEP 3".
  const pasos = (meal.strInstructions ?? "")
    .split(/\r?\n/)
    .map((linea) => linea.trim())
    .filter((linea) => linea.length > 3 && !/^(step\s*)?\d+[.:]?$/i.test(linea));

  return {
    id: meal.idMeal,
    nombre: meal.strMeal,
    categoria: CATEGORIAS[meal.strCategory] ?? meal.strCategory,
    area: meal.strArea || meal.strCountry || "Internacional", // los datos reales vienen incompletos
    imagen: `${meal.strMealThumb}/medium`, // version mediana: pesa ~20 KB y no 60 KB
    minutos: estimarMinutos(ingredientes.length, pasos.length),
    dificultad: estimarDificultad(ingredientes.length),
    ingredientes,
    pasos,
  };
}
```

Y en `obtenerRecetas`, cambia el `return` (a mano):

```javascript
  return datos.meals.map(adaptarReceta);
```

**3.2** En `src/components/catalogo/Card.astro`, las imágenes de la API ya traen `https://` (fragmento `api3-card-src`, debajo de `const base`):

```astro
// Las imagenes de prueba son locales (img/recetas/...); las de la API ya traen https://
const src = imagen.startsWith("http") ? imagen : `${base}${imagen}`;
```

y en el `<img>`: `src={src}`.

**3.3** El frontmatter completo de `catalogo.astro` (fragmento `api3-catalogo`). Borra el `console.log` y el import de los datos de prueba:

```astro
---
import Layout from "../layouts/Layout.astro";
import Filtros from "../components/catalogo/Filtros.astro";
import BarraDeBusqueda from "../components/catalogo/BarraDeBusqueda.astro";
import CardGrid from "../components/catalogo/CardGrid.astro";
import Paginacion from "../components/catalogo/Paginacion.astro";
import { obtenerRecetas } from "../services/api.js";

// Se ejecuta UNA vez, durante el build. El HTML publicado ya trae las recetas.
const recetas = await obtenerRecetas();

// Los filtros salen de los datos reales: si la API agrega una categoria, aparece sola.
const categorias = [...new Set(recetas.map((r) => r.categoria))].sort();
const dificultades = ["Facil", "Media", "Dificil"].filter((d) => recetas.some((r) => r.dificultad === d));

// Seis por pagina, como el mockup. Las otras paginas se activan con JavaScript despues.
const POR_PAGINA = 6;
const paginas = Math.ceil(recetas.length / POR_PAGINA);
---
```

y en el marcado:

```astro
        <CardGrid recetas={recetas.slice(0, POR_PAGINA)} />
        <Paginacion actual={1} total={paginas} />
```

**3.4** En `src/pages/index.astro`, las destacadas:

```astro
import { obtenerRecetas } from "../services/api.js";   // reemplaza el import de datos-de-prueba
const recetas = await obtenerRecetas();                  // debajo de const base
```

**Qué debe salir:** seis tarjetas con foto, nombre, "Postre · Uruguayan", "Facil" y "35 min aprox."; "25 recetas encontradas"; paginación de 1 a 5; filtros con las categorías en español.

**Error intencional (diapositiva 11):** borra `await` en `const recetas = await obtenerRecetas();` del catálogo y corre `npm run build`:

```text
[ERROR] TypeError: recetas.map is not a function
[ERROR] [build] Caught error rendering /catalogo
```

> Qué decir: "Sin `await`, `recetas` no es un arreglo: es una promesa, algo que todavía no llegó." Vuelve a ponerlo.

**Ver código fuente (diapositiva 7):** en la página del catálogo `Ctrl+U` y `Ctrl+F` «Flan». La receta está escrita en el HTML. No hay ningún `<script>`.

## Paso 4 (50-58) · Si la API falla, el sitio no se rompe

Arriba de `api.js` (fragmento `api4-import`):

```javascript
import { recetas as recetasDePrueba } from "../data/datos-de-prueba.js";
```

Reemplaza `obtenerRecetas` (fragmento `api4-try`; escribe a mano el `try`, el `catch` y el `return recetasDePrueba`):

```javascript
export async function obtenerRecetas() {
  try {
    const respuesta = await fetch(`${API}/search.php?s=`, {
      signal: AbortSignal.timeout(8000), // si la API no contesta en 8 s, se abandona
    });
    if (!respuesta.ok) throw new Error(`la API respondio ${respuesta.status}`);

    const datos = await respuesta.json();
    if (!datos.meals) throw new Error("la API no devolvio recetas");

    return datos.meals.map(adaptarReceta);
  } catch (error) {
    // Si la API falla, el sitio NO se rompe: se publica con los datos de prueba.
    console.warn(`[api] No se pudo leer TheMealDB (${error.message}). Uso los datos de prueba.`);
    return recetasDePrueba;
  }
}
```

**Error intencional (diapositiva 12):** escribe `themealdb.comm` en la constante `API` y corre `npm run build`:

```text
[api] No se pudo leer TheMealDB (fetch failed). Uso los datos de prueba.
[build] 12 page(s) built
```

> Qué decir: "La API es de otros. Si se cae justo cuando GitHub Actions construye el sitio, publicamos con los datos de prueba en lugar de publicar un sitio roto." Corrígelo: vuelven a salir 31 páginas.

Pregunta para lanzar: *¿por qué 12 páginas y no 31?* (Los datos de prueba son 6 recetas: 6 páginas de detalle + las 6 de siempre.)

## Paso 5 (58-80) · Una página por receta con `getStaticPaths`

Crea `src/pages/catalogo/[id].astro`. Los corchetes en el nombre dicen "esta parte de la dirección cambia".

**5.1** El frontmatter (fragmento `api5-detalle-front`). Escribe a mano `getStaticPaths`:

```astro
---
// catalogo/[id].astro
// UNA plantilla que genera UNA pagina por receta: /catalogo/52772, /catalogo/53322...
import Layout from "../../layouts/Layout.astro";
import Etiqueta from "../../components/ui/Etiqueta.astro";
import Boton from "../../components/ui/Boton.astro";
import Estado from "../../components/ui/Estado.astro";
import { obtenerRecetas } from "../../services/api.js";

// getStaticPaths le dice a Astro QUE paginas construir. Se ejecuta en el build.
// params -> la direccion de cada pagina. props -> los datos que recibe.
export async function getStaticPaths() {
  const recetas = await obtenerRecetas();
  return recetas.map((receta) => ({
    params: { id: receta.id },
    props: { receta },
  }));
}

const { receta } = Astro.props;
const { nombre, categoria, area, imagen, minutos, dificultad } = receta;
// Los datos de prueba no traen ingredientes ni pasos: se usa una lista vacia.
const ingredientes = receta.ingredientes ?? [];
const pasos = receta.pasos ?? [];

const base = import.meta.env.BASE_URL;
const src = imagen.startsWith("http") ? imagen.replace("/medium", "/large") : `${base}${imagen}`;
---
```

> Qué decir: "`getStaticPaths` responde una pregunta: ¿qué páginas construyo? Una por receta. `params` es la dirección; `props`, los datos que recibe cada página. Lo que vuelve de aquí llega a `Astro.props`."

**5.2** El marcado (fragmento `api5-detalle`):

```astro
<Layout titulo={`${nombre} — SaborU`} descripcion={`Receta de ${nombre}: ${categoria}, ${area}.`} activo="catalogo">
  <div class="contenedor detalle">
    <a class="detalle__volver" href={`${base}catalogo`}>
      <span aria-hidden="true">‹</span> Volver al catalogo
    </a>

    <section class="detalle__cabecera">
      <img class="detalle__imagen" src={src} alt={nombre} width="640" height="480" />

      <div class="detalle__info">
        <p class="rotulo">{categoria}</p>
        <div class="detalle__titulo">
          <h1>{nombre}</h1>
          <button class="detalle__guardar" type="button" aria-pressed="false">
            <span aria-hidden="true">♡</span> Guardar
          </button>
        </div>
        <div class="detalle__etiquetas">
          <Etiqueta tono="marca">{minutos} min aprox.</Etiqueta>
          <Etiqueta>{dificultad}</Etiqueta>
          <Etiqueta>{area}</Etiqueta>
          {ingredientes.length > 0 && <Etiqueta>{ingredientes.length} ingredientes</Etiqueta>}
        </div>
      </div>
    </section>

    {pasos.length > 0 ? (
      <div class="detalle__cuerpo">
        <section class="detalle__ingredientes">
          <h2>Ingredientes</h2>
          <ul>
            {ingredientes.map((ingrediente) => <li>{ingrediente}</li>)}
          </ul>
        </section>

        <section>
          <h2>Preparacion</h2>
          <ol class="detalle__pasos">
            {pasos.map((paso) => <li>{paso}</li>)}
          </ol>
        </section>
      </div>
    ) : (
      <Estado
        tipo="vacio"
        titulo="Preparacion no disponible"
        mensaje="No pudimos traer los pasos de esta receta. Intenta mas tarde."
      >
        <Boton href={`${base}catalogo`} variante="secundario">Ver otras recetas</Boton>
      </Estado>
    )}

    {pasos.length > 0 && (
      <div>
        <Boton href={`${base}catalogo`} variante="secundario">Ver otras recetas</Boton>
      </div>
    )}
  </div>
</Layout>
```

**5.3** Los estilos (fragmento `api5-detalle-css`). Explica solo tres cosas: las dos columnas desde 900 px, `min-width: 0` en la columna de texto y los pasos numerados con `counter()`.

**Qué debe salir:** desde una tarjeta del catálogo se llega a `/catalogo/53322`, con la foto grande, "POSTRE", "Flan", las etiquetas "35 min aprox.", "Facil", "Uruguayan", "7 ingredientes", la lista de ingredientes y la preparación numerada. "Volver al catálogo" regresa.

> Los nombres y la preparación llegan **en inglés**: TheMealDB no tiene otro idioma. Se traducen las categorías porque aparecen en los filtros; traducir cada receta necesitaría otro servicio.

## Paso 6 (80-90) · Probar, construir y guardar

```bash
npm run build      # 31 page(s) built, ningun archivo .js en dist/
npm run preview    # el sitio como se publicaria
```

1. `F12` → simulador → **320 px** en Inicio, Catálogo y una receta. En la consola:

```javascript
document.documentElement.scrollWidth === document.documentElement.clientWidth   // true
```

2. Teclado: `Tab` llega a la tarjeta, al favorito y, en el detalle, a "Volver" y "Guardar". El foco se ve.
3. Guardar:

```bash
git add .
git commit -m "feat: datos reales desde TheMealDB, adaptador y pagina de detalle por receta"
git push
```

4. Publicar desde la rama `gh-pages` (después de integrar en `main`):

```bash
npm run deploy     # construye y sube dist/ a la rama gh-pages: debe decir Published
```

La primera vez: **Settings → Pages → Deploy from a branch → `gh-pages` / `(root)` → Save**. En *Actions* aparece *pages build and deployment* en verde y el sitio queda en la URL de siempre.

> Qué decir: "`main` es el código; `gh-pages` es el sitio construido. GitHub sirve la rama `gh-pages` tal cual. El archivo `.nojekyll` evita que Jekyll esconda la carpeta `_astro`, donde está el CSS." 

---

## Taller en parejas (100-170)

Enunciado: [[Taller 2026-11-20 - Datos reales desde la API]]. Revisión de un minuto por grupo:

1. ¿Abrieron la respuesta cruda de **su** API? ¿Qué campos usan y cuál les falta?
2. ¿Tienen un solo archivo `src/services/api.js`, o hay `fetch` regados por las páginas?
3. ¿Sus tarjetas siguen igual? Si las cambiaron, falta el adaptador.
4. Escriban mal la dirección de su API: ¿el build termina?
5. ¿Ya prepararon la publicación desde `gh-pages`? (`public/.nojekyll`, `npm install -D gh-pages`, script `deploy`, Pages apuntando a `gh-pages`).
6. ¿Su API pide **clave**? Va en `.env` como `PUBLIC_…` o, mejor, se usa una API sin clave; nunca la clave escrita en el código que se sube a GitHub.

Problemas típicos de las APIs de los grupos:

| Situación | Qué hacer |
|---|---|
| La API devuelve un arreglo directo y no `{ meals: [...] }` | Ajustar la línea `datos.meals` a la forma de su respuesta |
| La API pagina (`?page=1`) | Para hoy, solo la primera página; los demás se piden después |
| La API devuelve cientos de elementos | `slice(0, 30)` en `obtenerX()`: 30 páginas de detalle bastan |
| La API necesita un segundo pedido para el detalle | Hoy: el detalle muestra lo que ya trae el listado. El segundo `fetch` es el reto |
| La API pide clave | Variable de entorno; si la clave es secreta, buscar otra API para el taller |
| Error de CORS en la consola del navegador | En el build no hay CORS: el `fetch` va en el frontmatter, no en un `<script>` |

## Cierre (170-180)

- Dos parejas muestran su catálogo con datos reales y una página de detalle.
- En la siguiente: el buscador, los filtros, la paginación y los favoritos empiezan a funcionar con JavaScript en el navegador.

## Errores frecuentes

| Síntoma | Causa y solución |
|---|---|
| `recetas.map is not a function` | Falta `await` antes de `obtenerRecetas()` |
| `Cannot read properties of null (reading 'map')` | La API respondió `{ "meals": null }` (búsqueda sin resultados). Revisar `if (!datos.meals)` |
| Tarjetas sin nombre, sin foto y «min» sin número | Falta `.map(adaptarReceta)`: la tarjeta recibe el formato de la API |
| La imagen sale rota con la dirección repetida | Falta el cambio de `src` en `Card.astro`: se le pegó `base` a una dirección `https://` |
| `getStaticPaths() function is required for dynamic routes` | El archivo se llama `[id].astro` y falta `export async function getStaticPaths()` |
| Una página de detalle da 404 | Ese `id` no está entre los que devolvió `getStaticPaths`. Si la API entrega el id como número, usar `params: { id: String(item.id) }` |
| El build se queda pegado | La API no contesta: falta `AbortSignal.timeout(8000)` |
| El `console.log` no aparece en el navegador | El frontmatter corre en el build: el mensaje está en la terminal |
| Recetas nuevas en la API que no aparecen | Los datos se leen en el build: hay que volver a construir |
| Actions en rojo en 5 segundos | Bloqueo de facturación de la organización, no el código. Publicar con `npm run deploy` a la rama `gh-pages` |
| El sitio publicado muestra el README o "Hola Mundo" | Pages apunta a `main`. Cambiarlo a `gh-pages` en *Settings → Pages* |
| El sitio publicado sale sin estilos | Falta `public/.nojekyll` o `--dotfiles` en el script `deploy` |
