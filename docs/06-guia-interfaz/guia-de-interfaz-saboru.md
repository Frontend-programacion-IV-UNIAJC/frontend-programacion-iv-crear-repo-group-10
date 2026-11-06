# Documento 26. Guía de interfaz de SaborU

**Asignatura:** Programación IV — Frontend y Experiencia de Usuario
**Destinatario:** docente, y material de consulta para los estudiantes
**Qué es:** la traducción del wireframe a una interfaz terminada, con las decisiones
visuales explicadas una por una.

---

## 1. Para qué sirve este documento

El wireframe decidió **qué va dónde**. Este documento decide **cómo se ve**, y deja por
escrito por qué cada decisión es la que es. Sirve para tres cosas:

1. Que puedas proyectar en clase un ejemplo terminado de lo que se le pide a cada grupo.
2. Que los estudiantes tengan un referente de hasta dónde se espera que lleguen.
3. Que la conversación sobre diseño en la sustentación sea sobre decisiones, no sobre
   gustos.

El proyecto demo que acompaña a este documento tiene las siete pantallas construidas en
Astro, compilando, con **cero kilobytes de JavaScript** y **300 kB** de peso total
incluyendo las imágenes.

---

## 2. La regla que ordena todo: nada se movió de sitio

El mockup conserva la estructura del wireframe, elemento por elemento. Si en el wireframe
el buscador estaba arriba de los filtros, sigue estando arriba de los filtros. Lo único
que entró es la capa visual.

| En el wireframe | En la interfaz terminada |
|---|---|
| Rectángulo con una equis | Ilustración con proporción 16:9 y `object-fit: cover` |
| Línea gruesa | Título en tipografía serif, 18 px, peso 600 |
| Líneas finas | Texto de apoyo en 14 px, color atenuado |
| Caja con una palabra | Componente `Boton` con sus tres variantes |
| Pastilla pequeña | Componente `Etiqueta`, usado para categoría, tiempo y dificultad |
| Bloque gris de carga | Componente `Esqueleto`, con la forma real de las tarjetas |
| Centro con icono y botón | Componente `Estado`, usado para vacío y para error |

Esa correspondencia es lo que hace que el salto de Figma al código sea mecánico. Si en
Figma nombras los componentes igual que los archivos `.astro`, la traducción deja de ser
interpretación.

---

## 3. Si estás usando el kit Blocks en Figma

El kit de wireframes por bloques funciona muy bien con esta arquitectura, porque cada
bloque del kit corresponde a un componente del proyecto. La equivalencia es esta:

| Bloque del kit | Componente del proyecto | Archivo |
|---|---|---|
| Navbar | Encabezado con marca y navegación | `src/components/layout/Header.astro` |
| Hero | Portada con titular, dos acciones y cifras | dentro de `src/pages/index.astro` |
| Card | Tarjeta de receta | `src/components/catalogo/Card.astro` |
| Card grid | Cuadrícula responsive | `src/components/catalogo/CardGrid.astro` |
| Search bar | Campo de búsqueda | `src/components/catalogo/BarraDeBusqueda.astro` |
| Filter / sidebar | Filtros, fila en móvil y lateral en escritorio | `src/components/catalogo/Filtros.astro` |
| Pagination | Paginación | `src/components/catalogo/Paginacion.astro` |
| Empty state | Estado vacío y de error | `src/components/ui/Estado.astro` |
| Skeleton | Estado de carga | `src/components/ui/Esqueleto.astro` |
| Button | Botón y enlace con apariencia de botón | `src/components/ui/Boton.astro` |
| Tag / chip | Metadato | `src/components/ui/Etiqueta.astro` |
| Form | Formulario con validación visible | dentro de `src/pages/contacto.astro` |
| Footer | Pie con créditos de la API | `src/components/layout/Footer.astro` |

**Recomendación práctica:** nombra los componentes de Figma exactamente así —`Card`,
`CardGrid`, `Boton`, `Etiqueta`, `Estado`—. Cuando un estudiante abra el archivo de Figma
y el proyecto al mismo tiempo, va a ver los mismos nombres en los dos lados, y eso quita
la mitad de las preguntas.

---

## 4. El sistema de diseño afinado

El sistema de la sesión 2 se conserva en su estructura —misma escala de espaciado, misma
escala tipográfica— y se afina en dos puntos.

### 4.1 Los neutros pasan de fríos a cálidos

Antes los grises eran azulados (`#1b2233`, `#f4f6fb`, `#d9dfec`). Sobre un color de marca
terracota, un gris azulado compite: son colores opuestos en el círculo cromático y la
pantalla se siente desafinada.

Los neutros nuevos llevan un punto de calidez y el resultado es que el color de marca
parece más intenso sin haber cambiado.

| Token | Valor | Para qué |
|---|---|---|
| `--color-texto` | `#241b16` | Texto principal |
| `--color-texto-suave` | `#6b5f57` | Texto de apoyo, descripciones |
| `--color-texto-tenue` | `#7a6a5d` | Rótulos, metadatos, pie |
| `--color-fondo` | `#ffffff` | Superficies: tarjetas, formularios |
| `--color-lienzo` | `#faf7f4` | Fondo de la página |
| `--color-superficie` | `#f4efe9` | Bloques secundarios |
| `--color-borde` | `#e9e1d9` | Bordes de tarjeta |
| `--color-borde-fuerte` | `#d6cabd` | Bordes de campo de formulario |

**Decisión importante:** el fondo de la página no es blanco puro, es un crema muy claro.
Las tarjetas sí son blancas. Esa diferencia mínima es lo que hace que una tarjeta se lea
como un objeto que está encima de algo, sin necesidad de una sombra fuerte.

### 4.2 Dos familias tipográficas con roles distintos

| Token | Dónde se usa |
|---|---|
| `--fuente` (serif) | Títulos y números grandes |
| `--fuente-texto` (sin serifa) | Todo el texto corrido, botones, etiquetas |

La serif da carácter y la sin serifa da legibilidad en tamaños pequeños. Son dos, no tres:
el error de las tres tipografías es el que se ve en la mitad de los mockups de clase.

**Nota de rendimiento.** Las dos familias son del sistema: no se descarga ni un kilobyte
de fuentes. Si un grupo quiere una tipografía propia de Google Fonts, es una decisión
válida, pero tiene un costo medible en la sesión 9 y debe quedar justificada en la
bitácora técnica.

### 4.3 La escala tipográfica gana un escalón

Se agrega `--texto-xxl` (44 px) solo para el titular de la portada, y `--texto-xs`
(12 px) para rótulos en mayúsculas. El cuerpo sigue en 16 px y **nunca baja de ahí**.

---

## 5. Las decisiones de interfaz, una por una

### 5.1 El encabezado se queda pegado arriba

Es `position: sticky` con un fondo translúcido y desenfoque. La razón no es estética: en
el catálogo la persona se desplaza mucho, y tener siempre a mano la navegación y la marca
evita el viaje de vuelta hasta arriba.

La navegación en móvil **no es un menú que se abre**. Es una fila de pastillas
desplazable. Dos ventajas: funciona sin una sola línea de JavaScript, y el usuario ve que
hay más secciones sin tener que pulsar nada. El menú de hamburguesa esconde la navegación
y es la razón número uno por la que la gente no descubre secciones.

### 5.2 La tarjeta del catálogo

Cuatro decisiones que vale la pena señalar en clase:

1. **El tiempo aparece sobre la imagen**, en una pastilla oscura. Es el dato que decide
   si la persona entra o no, así que no puede estar al final de la ficha.
2. **El botón de favorito mide 44 × 44 px** aunque el icono sea pequeño. Ese es el tamaño
   que un dedo acierta.
3. **Toda la tarjeta es clicable**, pero el nombre accesible del enlace sigue siendo el
   título. Se consigue con un pseudo-elemento que cubre la tarjeta, no envolviendo todo
   en un enlace: así el botón de favorito sigue siendo un botón independiente.
4. **La imagen tiene `width`, `height` y proporción fija.** Sin eso, el contenido salta
   cuando las imágenes cargan, y eso se penaliza en la sesión 9.

### 5.3 Los filtros cambian de forma, no de contenido

En móvil son pastillas en fila desplazable. En escritorio son una barra lateral fija que
acompaña el desplazamiento. Es el mismo contenido en dos disposiciones distintas, que es
exactamente lo que significa "responsive" frente a "la misma pantalla estirada".

Hay un detalle técnico que cuesta media hora encontrar y conviene anticipar: una fila con
`overflow-x: auto` **ensancha a su contenedor** dentro de una cuadrícula, y aparece
desplazamiento horizontal en toda la página. Se corrige con `min-width: 0` en el elemento
de la cuadrícula. Está comentado en el código.

### 5.4 Los cuatro estados tienen su propia pantalla

El proyecto incluye una ruta `/estados` que no es parte del producto: es una página de
referencia donde están los cuatro estados uno debajo del otro. Sirve para revisarlos sin
tener que provocar un error de red, y para que el estudiante vea que vacío y error
**comparten estructura** —símbolo, título, explicación y salida— y solo cambian el texto y
el tono.

El estado de carga son bloques con la forma del contenido, no una rueda girando. La
diferencia es que el esqueleto comunica qué va a aparecer; la rueda solo comunica espera.

### 5.5 El formulario muestra un error a propósito

El campo de correo del formulario de contacto está deliberadamente en estado inválido.
No es un descuido: es la referencia de cómo se ve un campo con error.

Tres cosas que se deben señalar: el mensaje va **debajo del campo que falló**, dice **cómo
corregirlo** y no solo que está mal, y el rojo **nunca es la única señal** —hay icono y
texto—, porque una de cada doce personas no distingue bien el rojo.

### 5.6 La pantalla de detalle se lee con las manos ocupadas

Los pasos de preparación van en 18 px, numerados con un círculo grande, y con mucho aire
entre uno y otro. El resto de la interfaz usa 16 px; aquí se sube a propósito porque la
persona está a medio metro de la pantalla, de pie y cocinando.

El botón de volver es explícito y está arriba. No se confía en el gesto del navegador:
sale de un dolor documentado en el user journey.

---

## 6. Accesibilidad verificada

Lo siguiente ya está cumplido en el demo y es exactamente lo que se audita en la sesión 6.

| Requisito | Cómo se cumple |
|---|---|
| Contraste AA | Todas las combinaciones de texto superan 4.5 : 1. La más ajustada es el texto tenue sobre el lienzo, con 4.86 : 1 |
| Operable con teclado | El foco nunca se elimina: se marca con un contorno de 3 px del color de marca |
| Saltar al contenido | Primer elemento enfocable de la página, oculto hasta que recibe el foco |
| Áreas táctiles | Todo control interactivo mide al menos 44 px de alto |
| Imágenes | Todas tienen `alt` descriptivo, `width`, `height` y `loading="lazy"` salvo la de portada |
| Idioma | `lang="es"` en el layout, una sola vez para todas las páginas |
| Estado activo | El enlace de la sección actual lleva `aria-current="page"`, no solo un color distinto |
| Movimiento | Se respeta `prefers-reduced-motion` |
| Formularios | Cada campo tiene `label` asociado; el error se enlaza con `aria-describedby` y marca `aria-invalid` |

**Una advertencia honesta:** esto cumple lo que se puede verificar sin usuarios. La
sesión 6 audita con herramientas y la sesión 8 prueba con personas, y ahí siempre aparece
algo que ninguna herramienta detecta.

---

## 7. Lo que falta y en qué sesión llega

El demo está completo como **referencia visual**, pero no todo pertenece a la sesión 3.
Esta tabla aclara qué puede mostrarse y qué conviene no adelantar.

| Pieza | Estado | Sesión |
|---|---|---|
| Layout, Header, Footer, Card, CardGrid | Terminado | 3 y 4 |
| Páginas Inicio, Catálogo, Acerca de | Terminadas | 3 y 4 |
| Página de detalle con `getStaticPaths` | Terminada | **5** |
| Buscador y filtros | Se ven, no filtran | **7** |
| Favoritos reales con `localStorage` | Muestra datos de ejemplo | **7** |
| Paginación | Se ve, no pagina | **7** |
| Envío real del formulario | No envía | **7** |
| Datos desde TheMealDB | Datos de prueba | **5** |

Para dejar el demo en estado estricto de sesión 3, basta con borrar
`src/pages/catalogo/[id].astro` y `src/pages/estados.astro`. Mi recomendación es
conservarlos y decirlo en voz alta: ver a dónde va el proyecto motiva más que esconderlo.

---

## 8. Qué pedirle a cada grupo

Si vas a usar esta interfaz como referencia de lo esperado, el criterio justo no es
"que se parezca a SaborU". Es este:

1. Que la estructura corresponda a su propio wireframe.
2. Que los colores, los tamaños y los espacios salgan de **su** archivo
   `10-sistema-de-diseno.md`, no de este.
3. Que la tarjeta y el botón sean componentes, no marcado repetido.
4. Que las cuatro pantallas de estado existan.
5. Que todo el texto pase el contraste de 4.5 : 1.
6. Que el proyecto siga enviando cero o casi cero JavaScript.

Un proyecto con otra paleta, otra tipografía y la misma solidez vale más que una copia de
este.

---

## 9. Archivos del demo

```
saboru-astro/
├── src/
│   ├── layouts/Layout.astro
│   ├── components/
│   │   ├── layout/Header.astro · Footer.astro
│   │   ├── ui/Boton.astro · Etiqueta.astro · Estado.astro · Esqueleto.astro
│   │   └── catalogo/Card.astro · CardGrid.astro · BarraDeBusqueda.astro
│   │                 Filtros.astro · Paginacion.astro
│   ├── pages/
│   │   ├── index.astro            /
│   │   ├── catalogo.astro         /catalogo
│   │   ├── catalogo/[id].astro    /catalogo/52772 y las demas
│   │   ├── favoritos.astro        /favoritos
│   │   ├── contacto.astro         /contacto
│   │   ├── acerca-de.astro        /acerca-de
│   │   └── estados.astro          /estados   (referencia de interfaz)
│   ├── data/datos-de-prueba.js
│   └── styles/variables.css · global.css
├── public/img/                    Ilustraciones provisionales en SVG
└── docs/ux/
    ├── wireframes/index.html      La referencia en gris
    └── mockups/                   Capturas de las siete pantallas, movil y escritorio
```

Las ilustraciones de `public/img/` son SVG hechos a mano: pesan menos de 1 kB cada uno,
se ven nítidos en cualquier pantalla y no dependen de ningún servicio externo. En la
sesión 5 las reemplazan las fotografías reales de la API.

---

**Fin del Documento 26.**
