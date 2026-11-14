// datos-de-prueba.js
// Seis recetas falsas con los MISMOS campos que vamos a sacar de la API.
// Si la forma de los datos no cambia, los componentes tampoco cambian
// cuando lleguen los datos reales.

export const recetas = [
  {
    id: "52772",
    nombre: "Pollo teriyaki al horno",
    categoria: "Pollo",
    area: "Japonesa",
    imagen: "img/recetas/pollo-teriyaki.svg",
    minutos: 45,
    dificultad: "Media",
  },
  {
    id: "52771",
    nombre: "Pasta con tomate y albahaca",
    categoria: "Pasta",
    area: "Italiana",
    imagen: "img/recetas/pasta-tomate.svg",
    minutos: 25,
    dificultad: "Facil",
  },
  {
    id: "52968",
    nombre: "Arroz con huevo y verduras",
    categoria: "Vegetariana",
    area: "Asiatica",
    imagen: "img/recetas/arroz-verduras.svg",
    minutos: 20,
    dificultad: "Facil",
  },
  {
    id: "52959",
    nombre: "Tortilla de papa",
    categoria: "Desayuno",
    area: "Espanola",
    imagen: "img/recetas/tortilla-papa.svg",
    minutos: 35,
    dificultad: "Media",
  },
  {
    id: "52785",
    nombre: "Sopa de lentejas",
    categoria: "Sopa",
    area: "Colombiana",
    imagen: "img/recetas/sopa-lentejas.svg",
    minutos: 50,
    dificultad: "Facil",
  },
  {
    id: "53013",
    nombre: "Ensalada de garbanzos",
    categoria: "Vegetariana",
    area: "Mediterranea",
    imagen: "img/recetas/ensalada-garbanzos.svg",
    minutos: 15,
    dificultad: "Facil",
  },
];

// Listas para los filtros, calculadas a partir de los datos.
// new Set() quita los repetidos: "Vegetariana" aparece dos veces y queda una.
export const categorias = [...new Set(recetas.map((r) => r.categoria))];
export const dificultades = [...new Set(recetas.map((r) => r.dificultad))];