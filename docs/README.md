# Documentación de SaborU

Todo lo que se decidió antes de escribir código, en el orden en que se hizo.

| # | Documento | Qué decide | Sesión |
|---|---|---|---|
| 1 | [Briefing](01-briefing/briefing.md) | Qué problema se resuelve y para quién | 2 |
| 2 | [Acta de cierre](02-acta-cierre/acta-de-cierre.md) | Qué entra y qué no entra en la versión 1 | 2 |
| 3 | [Wireframe](03-wireframe/Wireeframeindex.html) | Qué va dónde, en gris ([captura](03-wireframe/referencia-completa.png)) | 2 |
| 4 | [Mockup](04-mockup/README.md) | Cómo se ve cada pantalla | 2B |
| 5 | [Prototipo](05-prototipo/prototipo.md) | Cómo se navega entre pantallas | 2B |
| 6 | [Guía de interfaz](06-guia-interfaz/guia-de-interfaz-saboru.md) | Por qué cada decisión visual es la que es | 3 |

```
BRIEFING -> ACTA -> WIREFRAME -> MOCKUP -> PROTOTIPO -> CÓDIGO
```

---

## Hoja de ruta del desarrollo

El proyecto se termina en cinco clases. Cada clase deja el sitio publicado y
funcionando en GitHub Pages.

| Clase | Tema | Qué queda construido |
|---|---|---|
| **4** | Layout responsive y navegación | Sistema de diseño, `Layout`, `Header`, `Footer`, `Boton`, `Etiqueta`, portada y las seis rutas creadas |
| **5** | Componentes del catálogo | `Card`, `CardGrid`, `BarraDeBusqueda`, `Filtros`, `Paginacion`, `Estado`, `Esqueleto` con datos de prueba |
| **6** | Datos reales desde TheMealDB | `src/services/api.js`, `fetch` en tiempo de construcción, detalle con `getStaticPaths`, imágenes reales |
| **7** | Interactividad en el navegador | Búsqueda, filtros, paginación, favoritos con `localStorage` y formulario validado |
| **8** | Cierre técnico | Accesibilidad, rendimiento con Lighthouse, README final y publicación definitiva |
