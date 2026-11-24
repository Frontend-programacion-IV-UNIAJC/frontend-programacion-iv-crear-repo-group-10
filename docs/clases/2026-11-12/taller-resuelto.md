---
materia: Frontend
tipo: solucion
fecha: 2026-11-13
tags: [clase, frontend, taller]
---

# Taller del 12-nov resuelto · Layout, navegación y páginas base

**Programación IV · Frontend · UNIAJC · revisión al inicio de la clase del 13-nov-2026**

Volver a 2026-11-13 - Componentes del catalogo · Enunciado: Taller Clase 04 - Completar para el 13-nov

El taller ya está en la rama `main` del repositorio del grupo 10. Sirve para comparar con lo que hizo cada grupo y para empezar la clase de hoy desde el mismo punto.

## Qué quedó en el repositorio

```text
src/
├── layouts/Layout.astro          lang="es", saltar al contenido, Header, <main> con <slot />, Footer
├── components/
│   ├── layout/Header.astro       enlaces en un arreglo, map, aria-current, sticky
│   ├── layout/Footer.astro       Grid de 1 a 3 columnas, credito a TheMealDB
│   └── ui/
│       ├── Boton.astro           <a> si hay href, <button> si no; 3 variantes; 44 px
│       └── Etiqueta.astro        pildora de metadato (se usa hoy en las tarjetas)
├── pages/
│   ├── index.astro               portada: Grid de 2 columnas desde 900 px
│   ├── catalogo.astro            vacia (se construye hoy)
│   ├── favoritos.astro           vacia
│   ├── contacto.astro            vacia
│   └── acerca-de.astro           terminada: Grid con ficha sticky
└── styles/variables.css, global.css
public/img/portada.svg
```

Dos commits:

1. `fix: corrige selector body, variable --texto-m y tamanos de h1 y h2`
2. `feat: layout responsive, header, footer, boton, etiqueta, portada y rutas base`

Verificado: `npm run build` genera 5 páginas, 0 archivos `.js`, y a 320 px las cinco responden `true`.

## Archivo por archivo: dónde está y para qué sirve

| Archivo | Sirve para | Partes que hay que saber explicar |
|---|---|---|
| `src/styles/variables.css` | Guardar los colores, tamaños y espacios en un solo lugar | `:root` declara; `var(--nombre)` usa. Cambiar una variable cambia todo el sitio |
| `src/styles/global.css` | Reglas para todo el documento: body, títulos, enlaces, foco, `.contenedor` | Lo carga el Layout con `import`; los `<style>` de cada componente solo aplican a ese componente |
| `src/layouts/Layout.astro` | El marco de todas las páginas: `<head>`, Header, Footer y estilos | `import` de componentes y CSS · `Astro.props` (`titulo`, `descripcion`, `activo`, `ancho = "normal"`) · `<slot />` es el hueco del contenido · "Saltar al contenido" para el teclado |
| `src/components/layout/Header.astro` | Marca y navegación, con la página actual marcada | Arreglo `enlaces` · `.map()` dibuja un `<li>` por enlace · `aria-current="page"` cuando `activo === e.clave` · `${base}` en cada `href` · `position: sticky` |
| `src/components/layout/Footer.astro` | Crédito a la API, enlaces secundarios y aviso legal | Tres bloques · `{anio}` calculado en el frontmatter · `display: grid` = una columna; desde 768 px `1.6fr 1fr 1.2fr` · `aria-label` distingue los dos `<nav>` |
| `src/components/ui/Boton.astro` | Un solo botón para todo el sitio | Props con valor por defecto · `const Etiqueta = href ? "a" : "button"` · clases `boton--variante` · `...resto` pasa atributos · `min-height: 44px` |
| `src/components/ui/Etiqueta.astro` | Píldoras de categoría, tiempo y dificultad (hoy en las tarjetas) | Prop `tono` · clase armada con template literal · `--radio-pildora` · `white-space: nowrap` |
| `src/pages/index.astro` | La portada (`/`) | Envuelta en `<Layout activo="inicio" ancho="ancho">` · tres `<section>` = tres bloques del mockup · Grid 2 columnas desde 900 px · Flexbox con `flex-wrap` en los botones · `width` y `height` en la imagen |
| `src/pages/catalogo.astro`, `favoritos.astro`, `contacto.astro` | Que todas las direcciones del Header existan (ningún 404) | El nombre del archivo es la dirección · solo cambian `titulo`, `descripcion`, `activo` y los textos · `.pendiente` avisa lo que falta |
| `src/pages/acerca-de.astro` | Problema, personas, decisiones de diseño y créditos | `<article>` y `<aside>` · `<dl>`, `<dt>`, `<dd>` · Grid `1.3fr 0.7fr` · ficha con `position: sticky; top: 7.5rem` |
| `public/img/portada.svg` | La ilustración de la portada | Lo que está en `public/` se copia tal cual y se pide con `` `${base}img/portada.svg` `` |

**Cómo encajan:** la página escribe su contenido entre `<Layout>` y `</Layout>`. El Layout pone el `<head>`, el Header (al que le pasa `activo`) y el Footer, y deja el contenido en el `<slot />`. Boton y Etiqueta se usan dentro de las páginas.

### Preguntas que pueden hacer

- **¿Qué es una prop?** Un dato que un componente le pasa a otro, como un parámetro: `<Layout titulo="Inicio">`, y adentro `const { titulo } = Astro.props`.
- **¿Qué hace `<slot />`?** Es el hueco donde cae lo que se escribe entre la etiqueta de apertura y la de cierre del componente.
- **¿Por qué `${base}` en cada enlace?** GitHub Pages publica el sitio dentro de una carpeta con el nombre del repositorio. Sin `base`, el enlace va a la raíz del dominio y da 404.
- **¿Qué es lo de arriba entre `---`?** El frontmatter: JavaScript que corre al construir el sitio, no en el navegador. Por eso `dist/` no tiene archivos `.js`.
- **¿Por qué mi estilo no se aplica?** Casi siempre es un nombre mal escrito: la clase, la variable o un guion. En DevTools → Elements se ve si la clase está y si la regla aparece tachada.
- **¿Grid o Flexbox?** Grid cuando hay columnas (filas y columnas a la vez); Flexbox cuando es una fila de cosas que fluyen.

## Errores que quedaron del live coding (y cómo se ven)

Los encontramos al revisar los archivos escritos en clase. Ninguno detiene `npm run dev`, y por eso son peligrosos: el sitio "funciona" pero algo no se aplica.

| Archivo | Escrito | Correcto | Qué pasaba |
|---|---|---|---|
| `global.css` | `body:{` | `body {` | `npm run build` fallaba: `Unexpected end of input` |
| `variables.css` | `--texto-M` | `--texto-m` | Los componentes usan `var(--texto-m)`: sin coincidencia, sin tamaño |
| `global.css` | `h1` con `--texto-l`, `h2` con `--texto-xl` | al revés | El subtítulo era más grande que el título |
| `Layout.astro` | `initial-escale=1.0` | `initial-scale=1.0` | El navegador ignora la propiedad mal escrita |
| `Layout.astro` | `content="{description"` | `content={descripcion}` | La descripción para Google era el texto literal `{description` |
| `Layout.astro` | `#b4451f0` | `#b4451f` | Un color de 7 cifras no es válido |
| `Layout.astro` | `"principal-ancho"` | `"principal--ancho"` | La clase con un guion no existe en el CSS |
| `Header.astro` | `encabezado_interior`, `marca_simbolo` | `encabezado__interior`, `marca__simbolo` | Un guion bajo en vez de dos: el encabezado no cambiaba a fila en escritorio |
| `Header.astro` | `strike-linecap` | `stroke-linecap` | Atributo inexistente: el ícono perdía las puntas redondeadas |
| `Header.astro` | `import { e164, email } from "astro:schema"` | (se borra) | VS Code lo agregó solo al autocompletar. Nadie lo usa |

**La lección:** CSS y HTML no avisan. Un nombre mal escrito no da error: simplemente no se aplica. Por eso se compara con el mockup y se corre `npm run build` antes de cada push.

## Las cinco ideas del taller

1. **Footer con Grid:** un Grid sin columnas definidas es una sola columna. Desde 768 px, `grid-template-columns: 1.6fr 1fr 1.2fr`.
2. **Boton:** si recibe `href` dibuja un `<a>`; si no, un `<button>`. Se ven iguales, pero no son lo mismo. Alto mínimo de 44 px.
3. **Portada:** cada bloque del mockup es un bloque del código. Grid para texto e imagen, Flexbox con `flex-wrap` para los botones.
4. **Rutas:** cada archivo de `src/pages/` es una dirección. El `activo` de cada página debe coincidir con la `clave` del arreglo del Header.
5. **`base`:** un enlace escrito como `href="/catalogo"` da 404 en GitHub Pages. Siempre `` `${base}catalogo` ``.

## Revisión rápida de cada grupo

- [ ] ¿La URL publicada abre y se parece al mockup?
- [ ] ¿Cambia la página activa al navegar?
- [ ] ¿Algún enlace del Header o del Footer da 404?
- [ ] ¿A 320 px la consola responde `true`?
- [ ] ¿Aparecen los dos integrantes en Contributors?
