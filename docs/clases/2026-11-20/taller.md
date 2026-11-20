---
materia: Frontend
tipo: taller
fecha: 2026-11-20
entrega: 2026-11-27
tags: [clase, frontend, taller]
---

# Taller · Datos reales desde su API

**Programación IV · Frontend · UNIAJC · 20 de noviembre de 2026**
En parejas. 70 minutos en clase y el resto en casa. **Entrega: 27-nov-2026, antes de clase.**

Volver a [[Clase 05 - Datos reales desde la API]] · Guía del profesor: [[Guia 2026-11-20 - Datos reales desde la API]]

## Objetivo

Que su listado y su portada muestren los datos reales de **su** API, que cada elemento tenga su propia página de detalle y que, si la API falla durante el build, el sitio no se rompa.

**No se copia SaborU: se traduce.** El código de referencia está en la rama `api-2026-11-20` del repositorio del grupo 10. Cambien la dirección, los nombres de los campos y lo que estiman según **su** API.

## Antes de empezar (10 min)

- [ ] El taller del 13-nov está integrado en `main`: tarjetas con datos de prueba, `CardGrid` y `/estados`.
- [ ] `git switch main`, `git pull` y `npm run build` sin errores.
- [ ] Rama nueva: `git switch -c feature/datos-api`.
- [ ] Abran en el navegador **la dirección de su API** que devuelve la lista y anoten:

| Pregunta | Su respuesta |
|---|---|
| ¿Qué dirección devuelve la lista? | |
| ¿La lista viene directa (`[ … ]`) o dentro de un campo (`{ "results": [ … ] }`)? | |
| ¿Cómo se llama el campo de cada dato de su tarjeta? (nombre, imagen, categoría…) | |
| ¿Qué dato de su tarjeta **no** viene en la API? ¿Cómo lo van a estimar o qué van a mostrar? | |
| ¿Pide clave? | |

> Si su API pide una clave secreta, consulten con el profesor antes de seguir: la clave **nunca** se escribe en un archivo que se sube a GitHub.

## Parte 1 · En clase (70 min)

| Orden | Qué | Listo cuando… |
|---|---|---|
| 1 | `src/services/api.js` con `obtenerX()`: `fetch`, `await`, `respuesta.json()` | En la terminal, un `console.log` muestra un elemento de su API |
| 2 | `adaptarX(item)`: traduce un elemento de su API al formato de sus datos de prueba | Sus tarjetas se ven igual que con los datos de prueba, sin cambiar `Card` (solo la línea de la imagen si viene con `https://`) |
| 3 | Su listado usa `await obtenerX()` | Se ven datos reales y el conteo dice cuántos llegaron |
| 4 | Red de seguridad: `AbortSignal.timeout`, `respuesta.ok` y `try/catch` que devuelve sus datos de prueba | Con la dirección mal escrita, `npm run build` termina y muestra su aviso en la terminal |
| 5 | `npm run build` y commit | Sin errores |
| 6 | Preparar la publicación desde la rama `gh-pages` (`.nojekyll`, `gh-pages`, script `deploy`; ver abajo) | `npm run deploy` termina con `Published` y la URL abre su sitio con estilos |

## Parte 2 · En casa (hasta el 27-nov)

1. **Página de detalle** `src/pages/<listado>/[id].astro` con `getStaticPaths`: una página por elemento, con imagen grande, título, etiquetas, la información que dé su API y un enlace "Volver". Debe parecerse a su mockup de detalle.
2. **Las tarjetas enlazan al detalle** (el `href` del título apunta a `${base}<listado>/${id}`) y ninguna da 404.
3. **Filtros desde los datos:** las opciones de sus filtros se calculan con `new Set()` sobre los datos reales, no escritas a mano.
4. **Destacados en la portada** con datos reales (`slice(0, 3)`).
5. **Lo que no viene en la API** se estima o se omite, y si se estima, la interfaz lo dice ("aprox.", "estimado").
6. **Datos incompletos:** si a algún elemento le falta un campo (imagen, descripción…), su página no muestra `undefined` ni una imagen rota: usen un valor por defecto.
7. **Prueba de 320 px** en el listado y en un detalle. En la consola debe salir `true`:

   ```javascript
   document.documentElement.scrollWidth === document.documentElement.clientWidth
   ```

## Entrega: el taller debe quedar integrado en `main`

**Se revisa y se califica lo que esté en la rama `main` del repositorio en la fecha de entrega.** Un taller que se quede en `feature/datos-api` sin fusionar no está entregado.

1. Suban la rama y abran el pull request de `feature/datos-api` hacia `main`:

```bash
git add .
git commit -m "feat: datos reales desde la API y pagina de detalle"
git push -u origin feature/datos-api
```

2. El otro integrante revisa el pull request en GitHub y lo aprueba.
3. **Fusionen el pull request** (*Merge pull request* → *Confirm merge*).
4. Actualicen su copia local y verifiquen que el trabajo quedó en `main`:

```bash
git switch main
git pull
git log --oneline -3      # debe aparecer el commit del taller
npm run build             # sin errores, con sus paginas de detalle
```

> Si GitHub avisa de conflictos al fusionar: `git switch feature/datos-api`, `git merge main`, corrijan los archivos marcados, `git add .`, `git commit` y `git push`. El pull request se actualiza solo.

## Publicar en GitHub Pages desde la rama `gh-pages`

GitHub Actions está bloqueado por facturación en la organización (el mensaje dice *"your account is locked due to a billing issue"*), así que el flujo `deploy.yml` ya no publica. **No es un error de ustedes.** En su lugar se publica **desde una rama**: ustedes construyen el sitio en su computador y suben solo la carpeta `dist/` a una rama llamada `gh-pages`; GitHub la sirve tal cual.

> Hoy muchos repositorios tienen Pages apuntando a `main` / `(root)`. Eso publica el **código fuente**: se ve el README o una página vieja, y `/catalogo` da 404. `main` no es el sitio: el sitio es `dist/`.

### Una sola vez

**1.** Revisen que `base` en `astro.config.mjs` sea el nombre exacto de su repositorio:

```javascript
export default defineConfig({
  site: "https://frontend-programacion-iv-uniajc.github.io",
  base: "/frontend-programacion-iv-crear-repo-group-N/",   // N = su grupo
});
```

**2.** Creen el archivo vacío `public/.nojekyll`. GitHub procesa las ramas con Jekyll, y Jekyll **ignora las carpetas que empiezan por guion bajo**, como `_astro/`, donde Astro guarda el CSS. Sin este archivo el sitio sale sin estilos.

```bash
touch public/.nojekyll          # Git Bash. En PowerShell: New-Item public/.nojekyll
```

**3.** Instalen la herramienta que sube `dist/` a la rama `gh-pages`:

```bash
npm install -D gh-pages
```

**4.** En `package.json`, agreguen el script `deploy` dentro de `"scripts"`:

```json
"deploy": "astro build && gh-pages -d dist --dotfiles -m \"deploy: sitio construido\""
```

`--dotfiles` es obligatorio: sin él, `gh-pages` no sube `.nojekyll`.

**5.** Para que cada push no deje una X roja, cambien en `.github/workflows/deploy.yml` el disparador a manual:

```yaml
on:
    workflow_dispatch:
```

**6.** Hagan commit de estos cambios en su rama, con el resto del taller.

### Cada vez que quieran publicar (desde `main`, después del merge)

```bash
git switch main
git pull
npm run deploy
```

Debe terminar con `Published`. La primera vez crea la rama `gh-pages` en GitHub.

### Configurar Pages (una sola vez, después del primer `npm run deploy`)

1. En GitHub: **Settings → Pages**.
2. **Build and deployment → Source:** *Deploy from a branch*.
3. **Branch:** `gh-pages` y carpeta `/ (root)` → **Save**.
4. En la pestaña **Actions** aparece *pages build and deployment*. Ese trabajo lo maneja GitHub y **sí funciona** con el bloqueo: esperen el check verde (1 o 2 minutos).
5. Abran `https://frontend-programacion-iv-uniajc.github.io/<su-repositorio>/`, recorran el listado y un detalle, y prueben en el celular.

> Publiquen siempre desde `main` actualizado: lo que se ve en el sitio debe ser lo que está integrado en `main`.

## Evidencia (aula virtual o README)

1. Enlace al pull request fusionado en `main`.
2. **URL publicada** del listado y de un detalle (desde la rama `gh-pages`) y captura de *Settings → Pages* con la fuente `gh-pages`.
3. Capturas del sitio publicado (listado y un detalle) a 320 px y en escritorio, al lado de su mockup.
4. Captura del build con la dirección de la API mal escrita: debe terminar y mostrar su aviso.
5. En el README, una tabla de tres columnas: **campo de su tarjeta · campo de la API · cómo se obtiene** (directo, traducido o estimado).

## Calificación (100 puntos)

| Criterio | Puntos |
|---|---|
| Un solo archivo `src/services/api.js` habla con la API; las páginas solo llaman `obtenerX()` | 15 |
| Adaptador: las tarjetas reciben su formato y no se reescribieron | 20 |
| Red de seguridad: `timeout`, `respuesta.ok` y `try/catch` con datos de prueba (probado con la dirección mal escrita) | 15 |
| Listado y portada con datos reales; filtros calculados desde los datos | 10 |
| Detalle con `getStaticPaths`: una página por elemento, enlazada desde la tarjeta, parecida al mockup | 25 |
| Datos faltantes y estimados bien manejados (sin `undefined`, "aprox." donde corresponde) | 5 |
| Sitio publicado desde `gh-pages` con estilos y sin 404, y 320 px sin desplazamiento horizontal | 10 |

- Solo se califica lo que esté integrado en `main` en la fecha de entrega.
- Un `npm run build` que falla resta 15 puntos. Un fallo del flujo `deploy.yml` por el bloqueo de facturación **no** resta.
- Una clave secreta subida al repositorio resta 20 puntos.
- **Reto opcional (+5):** si su API tiene un endpoint de detalle (por ejemplo `lookup.php?i=`), úsenlo en `getStaticPaths` para traer los datos completos de cada elemento.

## Errores frecuentes

| Síntoma | Solución |
|---|---|
| `.map is not a function` | Falta `await`, o la lista viene dentro de un campo (`datos.results`, `datos.data`…) |
| `Cannot read properties of null` | La API respondió vacío o `null`: revisen antes de usar (`if (!datos.results) throw …`) |
| Tarjetas vacías o `undefined` | Falta el adaptador: la tarjeta recibe los nombres de la API |
| Imagen rota con la dirección repetida | Le pegaron `base` a una imagen que ya trae `https://` |
| `getStaticPaths() function is required` | El archivo `[id].astro` no exporta `getStaticPaths` |
| Un detalle da 404 | El `id` del enlace no está entre los de `getStaticPaths`. Si la API da números, `String(item.id)` |
| El build se queda pegado | Falta `AbortSignal.timeout(8000)` |
| `console.log` no aparece en el navegador | El frontmatter corre en el build: búsquenlo en la terminal |
| Error de CORS | El `fetch` está en un `<script>` del navegador. Hoy va en el frontmatter (entre las `---`) |
| El sitio publicado muestra el README o "Hola Mundo" | Pages apunta a `main`. Cámbienlo a la rama `gh-pages` en *Settings → Pages* |
| El sitio publicado sale sin estilos | Falta `public/.nojekyll`, o falta `--dotfiles` en el script `deploy` |
| La portada abre pero `/catalogo` da 404, o las imágenes no cargan | `base` en `astro.config.mjs` no es el nombre del repositorio, o falta `${base}` en un enlace |
| `npm run deploy` dice `Filename too long` | La carpeta del proyecto está muy adentro: muévanla a una ruta corta (`C:\proyectos\...`) o corran `git config --global core.longpaths true` |
| `npm run deploy` pide usuario o falla al subir | Es el mismo permiso de `git push`: primero verifiquen que `git push` funciona |
| Publicaron y no cambió nada | Esperen el check verde de *pages build and deployment* y recarguen con `Ctrl+F5` |
