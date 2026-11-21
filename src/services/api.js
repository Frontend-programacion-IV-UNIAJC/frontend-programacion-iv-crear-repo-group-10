
import { recetas as recetasDePrueba } from "../data/datos-de-prueba.js";

/**
 * Una receta con NUESTRA forma (la misma de datos-de-prueba.js).
 * @typedef {Object} Receta
 * @property {string} id
 * @property {string} nombre
 * @property {string} categoria
 * @property {string} area
 * @property {string} imagen
 * @property {number} minutos
 * @property {string} dificultad
 * @property {string[]} [ingredientes]
 * @property {string[]} [pasos]
 */

const API = "https://www.themealdb.com/api/json/v1/1";


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


function estimarMinutos(ingredientes, pasos) {
  const minutos = 10 + ingredientes * 2 + pasos * 3;
  return Math.round(minutos / 5) * 5; 
}

function estimarDificultad(ingredientes) {
  if (ingredientes <= 7) return "Facil";
  if (ingredientes <= 12) return "Media";
  return "Dificil";
}


export function adaptarReceta(meal) {
  
  const ingredientes = [];
  for (let i = 1; i <= 20; i++) {
    const nombre = meal[`strIngredient${i}`]?.trim();
    const medida = meal[`strMeasure${i}`]?.trim();
    if (nombre) ingredientes.push(medida ? `${medida} ${nombre}` : nombre);
  }

 
  const pasos = (meal.strInstructions ?? "")
    .split(/\r?\n/)
    .map((linea) => linea.trim())
    .filter((linea) => linea.length > 3 && !/^(step\s*)?\d+[.:]?$/i.test(linea));

  return {
    id: meal.idMeal,
    nombre: meal.strMeal,
    categoria: CATEGORIAS[meal.strCategory] ?? meal.strCategory,
    area: meal.strArea || meal.strCountry || "Internacional", 
    imagen: `${meal.strMealThumb}/medium`, 
    minutos: estimarMinutos(ingredientes.length, pasos.length),
    dificultad: estimarDificultad(ingredientes.length),
    ingredientes,
    pasos,
  };
}

/** @returns {Promise<Receta[]>} */
export async function obtenerRecetas() {
  try {
    const respuesta = await fetch(`${API}/search.php?s=`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!respuesta.ok) throw new Error(`la API respondio ${respuesta.status}`);

    const datos = await respuesta.json();
    if (!datos.meals) throw new Error("la API no devolvio recetas");

    return datos.meals.map(adaptarReceta);
  } catch (error) {
 
    console.warn(`[api] No se pudo leer TheMealDB (${error.message}). Uso los datos de prueba.`);
    return recetasDePrueba;
  }
}