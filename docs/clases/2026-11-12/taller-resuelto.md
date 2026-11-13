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
