# SaborU · Programación IV Frontend (grupo 10)

Sitio: https://frontend-programacion-iv-uniajc.github.io/frontend-programacion-iv-crear-repo-group-10/

## Publicar en GitHub Pages desde la rama `gh-pages`

El sitio se publica desde la rama **`gh-pages`**, que solo contiene el sitio ya construido (`dist/`). `main` tiene el código fuente.

```sh
git switch main
git pull
npm install
npm run deploy     # astro build + sube dist/ a la rama gh-pages
```

Configuración, una sola vez: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `gh-pages` / `(root)` → Save**.

- `public/.nojekyll` evita que GitHub procese el sitio con Jekyll, que ignora la carpeta `_astro/` (sin ese archivo el sitio sale sin estilos).
- `base` en `astro.config.mjs` debe ser el nombre del repositorio.
- El flujo `.github/workflows/deploy.yml` quedó solo para ejecutarlo a mano (`workflow_dispatch`) mientras GitHub Actions esté bloqueado por facturación.

---

# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
