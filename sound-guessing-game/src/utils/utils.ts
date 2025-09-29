import type { Animal, RandomAnimalsResult } from "../interfaces/Animal";

// Función para sacar n animales aleatorios de un array
export const getRandomAnimals = (animals: Animal[], n: number): RandomAnimalsResult => {
    const count = Math.min(n, animals.length); // nunca mas de los disponibles
    const result: Animal[] = [];
    const copy = [...animals]; // hacemos una copia para no modificar el original

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * copy.length); // índice aleatorio
        result.push(copy[randomIndex]); // añadimos el animal seleccionado en "result"
        copy.splice(randomIndex, 1); // eliminamos para que no se repita
    }

    // elegimos 1 correcto entre los seleccionados
    const correctIndex = Math.floor(Math.random() * result.length);

    return {
        options: result,
        correct: result[correctIndex],
    }
}
