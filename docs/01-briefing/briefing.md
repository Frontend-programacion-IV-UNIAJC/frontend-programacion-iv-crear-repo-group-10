# Briefing del proyecto — SaborU

**Proyecto:** SaborU, catálogo de recetas rápidas para quien cocina solo
**Asignatura:** Programación IV — Frontend y Experiencia de Usuario
**Docente:** William Samuel Henao Gutiérrez
**Periodo académico:** 2026-2
**Sesión:** 2 (entrevista cruzada)
**Duración de la entrevista:** 15 minutos
**API del proyecto:** [TheMealDB](https://www.themealdb.com/api.php), pública y gratuita

---

## 1. El problema

**1.1 Descrito en una frase**

> Un estudiante universitario que vive solo **necesita** decidir rápido qué cocinar con
> lo que tiene, **porque** dispone de poco tiempo y poco dinero, **pero actualmente** las
> recetas que encuentra están en videos largos, sin lista clara de ingredientes y
> pensadas para cocinas equipadas.

**1.2 Cómo se resuelve hoy, sin el producto**

Busca en redes sociales, abre tres o cuatro videos y termina pidiendo domicilio una de
cada tres veces.

**1.3 Costo del problema**

Entre 15 y 20 minutos de búsqueda para una preparación de 20 minutos. Gasto extra en
domicilios. Frustración al final del día.

**1.4 Frases textuales del cliente**

1. "Tengo huevos, arroz y media cebolla. Dime algo que pueda hacer ya."
2. "El video dura ocho minutos y la receta son cuatro pasos."
3. "Se me olvida cuál era la que me gustó."

---

## 2. El usuario

| Campo | Usuario principal | Usuario secundario |
|---|---|---|
| Nombre y edad | Camila, 20 años | Don Hernán, 58 años |
| Ocupación o rol | Estudiante de segundo semestre | Empleado que vive solo hace un año |
| Contexto de uso | Entre semana, 8 p. m., llegando de clase | Fin de semana, sin prisa |
| Dispositivo | Celular, en la cocina, con las manos ocupadas | Tableta sobre la mesa |
| Nivel tecnológico | Alto | Bajo |
| Objetivo principal | Cenar distinto en menos de 25 minutos | Seguir una receta sin perderse |
| Principal frustración | Las recetas piden lo que no tiene | Letra pequeña y jerga de cocina |

---

## 3. La tarea principal

**3.1 Si solo pudiera hacer una cosa, sería:** encontrar una receta que pueda cocinar
esta noche con un ingrediente que ya tiene.

**3.2 Pasos que sigue para lograrla**

1. Abre SaborU.
2. Escribe o elige un ingrediente o una categoría.
3. Ve varias opciones, cada una con su tiempo.
4. Entra a una receta y cocina siguiendo los pasos.

**3.3 Información que necesita para decidir:** foto, nombre, tiempo estimado,
dificultad e ingrediente principal o categoría.

**3.4 Información que sobra:** el origen histórico del plato, el valor nutricional
detallado y los comentarios de otros usuarios.

---

## 4. Contenido y datos

**4.1 Datos que debe mostrar cada receta en el listado**

| Dato | ¿Imprescindible o adicional? | ¿Lo entrega la API? |
|---|---|---|
| Imagen | Imprescindible | Sí (`strMealThumb`) |
| Nombre | Imprescindible | Sí (`strMeal`) |
| Categoría | Imprescindible | Sí (`strCategory`) |
| País de origen | Adicional | Sí (`strArea`) |
| Tiempo estimado | Imprescindible | **No: se estima por el número de ingredientes** |
| Dificultad | Adicional | **No: se deriva del número de pasos** |

> El hallazgo más valioso del briefing: el cliente pide un dato que la API no entrega.
> Se decidió calcularlo de forma aproximada y **decirlo en la interfaz** ("25 min
> aprox."), no inventarlo en silencio.

**4.2 Criterios de búsqueda y filtrado acordados:** búsqueda por nombre o ingrediente;
filtro por categoría y por dificultad.

**4.3 Orden por defecto del listado:** de la receta más rápida a la más lenta.

**4.4 Qué hacer cuando un dato viene vacío:** imagen de reemplazo propia; si no hay
categoría, la etiqueta no se muestra; si la búsqueda no encuentra nada, estado vacío con
una acción para limpiar los filtros.

---

## 5. Alcance

**5.1 Funcionalidades acordadas, en orden de prioridad**

| # | Funcionalidad | Prioridad | ¿Entra en la versión 1? |
|---|---|---|---|
| 1 | Catálogo de recetas con tiempo y dificultad visibles | Alta | Sí |
| 2 | Detalle con ingredientes y pasos numerados | Alta | Sí |
| 3 | Búsqueda por nombre y filtro por categoría | Alta | Sí |
| 4 | Favoritos guardados en el navegador | Media | Sí |
| 5 | Formulario de contacto para sugerir recetas | Baja | Sí |

**5.2 Fuera de alcance, acordado explícitamente**

- Cuentas de usuario e inicio de sesión
- Calificaciones y comentarios
- Lista de mercado y cálculo nutricional

---

## 6. Restricciones y referencias

**6.1 Referencias que le gustan al cliente:** las aplicaciones de recetas que muestran
los ingredientes antes que el procedimiento.

**6.2 Lo que quiere evitar:** videos obligatorios, ventanas emergentes y textos largos
antes de la receta.

**6.3 Restricciones:** uso principal en celular, desde 320 px de ancho; conexión
irregular; un usuario con baja visión (texto mínimo de 16 px y contraste AA).

**6.4 Tono y estilo visual esperado**

```
[x] Cercano       [x] Minimalista   [ ] Juvenil       [ ] Institucional
[ ] Sobrio        [ ] Colorido      [x] Editorial     [ ] Técnico
```

---

## 7. Criterios de éxito

**7.1 Cómo sabremos que funcionó:** una persona que abre SaborU sin conocerlo llega a
una receta cocinable en menos de tres interacciones.

**7.2 Indicador medible:** tres clics o menos desde el inicio hasta los ingredientes de
una receta.

**7.3 Qué sería un fracaso:** que la persona salga del sitio sin haber abierto ninguna
receta, o que necesite más de cinco clics para llegar a una.

---

## 8. Consecuencias para el diseño

| Lo que dijo el cliente | Decisión de diseño | Pantalla o componente |
|---|---|---|
| "Dime algo que pueda hacer ya" | Búsqueda y filtros en primer plano del catálogo | `BarraDeBusqueda`, `Filtros` |
| "El video dura ocho minutos" | Pasos en texto numerado, sin video obligatorio | Detalle |
| "Se me olvida cuál era la que me gustó" | Botón de favorito visible desde la tarjeta | `Card`, Favoritos |
| "Cocino con las manos ocupadas" | Pasos de 18 px, botones de 44 px de alto | Detalle, `Boton` |
| El tiempo no viene en la API | Tiempo estimado y marcado como aproximado | `Card`, Detalle |
| Uso principal en celular | Diseño móvil primero; navegación sin menú escondido | `Header` |

---

**Siguiente documento:** [Acta de cierre](../02-acta-cierre/acta-de-cierre.md)
