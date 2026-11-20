---
materia: Frontend
tipo: guia
fecha: 2026-11-20
tags: [clase, frontend, repaso]
---

# Ajustes del 13-nov: qué se corrigió y por qué

Volver a [[Clase 05 - Datos reales desde la API]] · Guía de hoy: [[Guia 2026-11-20 - Datos reales desde la API]]

Este documento explica qué se revisó en el repositorio del grupo 10 antes de la clase del 20-nov, qué se cambió y cómo contarlo en los primeros 10 minutos (diapositivas 2 y 3).

## 1. Lo que había en `main`

Después del live coding del 13-nov, `main` tenía el commit `(main): add footer and catalogo`. Tenía los componentes del catálogo escritos en vivo, pero con detalles que no se alcanzaron a corregir. **El build pasaba** (`5 page(s) built … Complete!`): por eso nadie lo notó en el momento.

| Archivo | Qué tenía | Qué pasaba en la pantalla | Corrección |
|---|---|---|---|
| `Card.astro` | `import { Etiqueta } from "../ui/Etiqueta.astro"` | Nada todavía, porque la etiqueta no se usaba; al usarla, el build falla | `import Etiqueta from …` (sin llaves: un `.astro` se exporta por defecto) |
| `Card.astro` | `const { …, dficultad } = receta` | La dificultad salía vacía | `dificultad` |
| `Card.astro` | Faltaba todo el `tarjeta__cuerpo` y el cierre de un `<div>` | Tarjetas con foto pero sin título, sin enlace y sin etiquetas | Cuerpo completo: título con el enlace, categoría · área y dos etiquetas |
| `Card.astro` | Ruta del corazón `…L12 21.2l8.8.8…` | El ícono del favorito salía deformado | `l8.8-8.8` |
| `CardGrid.astro` | `.rejila { display: grid … }` (una sola l) | Las tarjetas salían una debajo de otra, en escritorio también: la clase del HTML es `rejilla` | `.rejilla` |
| `BarraDeBusqueda.astro` | `viewBox="0 24 24"`, `stro-width`, `aria-hiddden` | La lupa se veía mal y un lector de pantalla la anunciaba | `viewBox="0 0 24 24"`, `stroke-width`, `aria-hidden` |
| Faltaban | `Estado.astro`, `Esqueleto.astro`, `estados.astro`, las 6 imágenes y las destacadas de la portada | No existía `/estados` y la portada seguía con el recuadro punteado | Se trajeron de la solución del 13-nov (rama `catalogo-2026-11-13`) |

**Commit:** `fix: completa el catalogo del 13-nov: tarjeta, rejilla, buscador, estados y destacadas`. Resultado verificado: `npm run build` → **6 páginas**, 0 archivos `.js`.

### Cómo explicarlo en clase (5 min)

1. `git pull` en vivo y abrir `/catalogo`: ahora hay tres columnas y las tarjetas tienen título.
2. Mostrar el cambio con `git show dff82d1 --stat` o, en VS Code, el historial del archivo `CardGrid.astro`.
3. La idea que se tienen que llevar: **un error de tipeo en CSS, en un atributo o en un SVG no rompe el build: solo se ve mal.** `npm run build` comprueba que el código se puede construir, no que la página se vea bien. Por eso siempre, además del build, hay que mirar la página en el celular y en escritorio.
4. Preguntar: "¿Quién tuvo alguno de estos errores?". El de `rejila` es el más común: la clase del CSS y la del HTML tienen que ser idénticas.

## 2. GitHub Actions: rojo desde el 7-nov, y no es el código

Al revisar el repositorio apareció algo más grave: **las tres últimas ejecuciones de Actions fallaron en 5 segundos** (7, 13 y 16 de noviembre). El sitio publicado sigue siendo el del 17 de octubre.

El trabajo ni siquiera arranca. La anotación dice:

```text
X The job was not started because your account is locked due to a billing issue.
```

Pasa lo mismo en los repositorios de los estudiantes (por ejemplo, el del grupo 1 del 20-nov): es un **bloqueo de facturación de la organización** `Frontend-programacion-IV-UNIAJC`, no un error de código.

**Qué hay que hacer:** un propietario de la organización entra a **github.com/organizations/Frontend-programacion-IV-UNIAJC/settings/billing** y revisa el método de pago, el límite de gasto o el aviso que muestre GitHub. Los repositorios son públicos, así que los minutos de Actions no deberían costar; lo más probable es un pago pendiente o una cuenta marcada para revisión. Si no se resuelve desde ahí, hay que escribir a soporte de GitHub (o a GitHub Education, si la organización está asociada a GitHub Classroom).

**Y un segundo problema:** en *Settings → Pages* el repositorio estaba en *Deploy from a branch* con `main` / `(root)`. Eso publica el **código fuente**, no el sitio construido: el del grupo 10 muestra un "Hola Mundo" viejo y el del grupo 1 muestra su README (`/catalogo` da 404).

**Solución sin Actions: publicar desde la rama `gh-pages`** (ya aplicada en `main`, commit `build: publicar en GitHub Pages desde la rama gh-pages`):

| Cambio | Para qué |
|---|---|
| `public/.nojekyll` (vacío) | GitHub procesa las ramas con Jekyll, que ignora las carpetas con guion bajo como `_astro/` (el CSS). Sin este archivo, el sitio sale sin estilos |
| `npm install -D gh-pages` | Herramienta que sube la carpeta `dist/` a la rama `gh-pages` |
| Script `"deploy": "astro build && gh-pages -d dist --dotfiles …"` | Construye y publica con un solo comando. `--dotfiles` hace que suba `.nojekyll` |
| `deploy.yml` con `on: workflow_dispatch` | Deja de ejecutarse en cada push (sin X roja); queda para cuando Actions vuelva |
| README | Explica cómo publicar |

Probado contra un repositorio local: la rama `gh-pages` queda con `.nojekyll`, `_astro/` y todas las páginas. El trabajo *pages build and deployment*, que es el que publica una rama, lo maneja GitHub y **sí funciona** con el bloqueo (en verde en el grupo 1).

**Para dejarlo publicado (una vez):** `npm run deploy` desde `main` y luego *Settings → Pages → Deploy from a branch → `gh-pages` / `(root)` → Save*.

En los talleres, un fallo de `deploy.yml` por facturación **no resta puntos**; la evidencia es la URL publicada desde `gh-pages`.

## 3. El taller del 13-nov

Se ajustó [[Taller 2026-11-13 - Componentes del catalogo]] en tres puntos:

1. **Entrega integrada en `main`:** rama `feature/catalogo` → pull request → revisión del compañero → merge → verificación en `main`. "Solo se califica lo que esté integrado en `main`."
2. **Actions bloqueado:** el "check verde" y la URL publicada se reemplazan por la captura de `npm run build` y `npm run preview`.
3. **Calificación:** un fallo de Actions por facturación no resta; un `npm run build` que falla sí sigue restando 15.

La entrega era hoy (20-nov). Como los cambios afectan la forma de entregar, conviene dar unos días más para el merge a `main`, por ejemplo hasta el 23-nov.

## 4. Lo que quedó en el repositorio

| Rama | Qué tiene |
|---|---|
| `main` | El catálogo del 13-nov completo y corregido + los fragmentos de VS Code de hoy (`.vscode/api-2026-11-20.code-snippets`) + la publicación por rama (`npm run deploy`). Es el punto de partida del live coding |
| `api-2026-11-20` | La solución de hoy: `src/services/api.js`, `catalogo/[id].astro` y los cambios en catálogo, portada y tarjeta. 31 páginas |
| `gh-pages` | (Se crea con el primer `npm run deploy`.) Solo el sitio construido: es lo que publica GitHub Pages |
| `catalogo-2026-11-13` | La solución del 13-nov (ya incluida en `main`) |

Nada de esto está subido a GitHub todavía: los commits están en el computador del profesor.
