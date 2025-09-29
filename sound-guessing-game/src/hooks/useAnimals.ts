import { useQuery } from "@tanstack/react-query";
import type { Animal } from "../interfaces/Animal";

const fetchAnimals = async (): Promise<Animal[]> => {
    const res = await fetch("/animals.json");
    if (!res.ok) throw new Error("failed to fetch animals");
    return res.json();
}

export const useAnimals = () => {
    return useQuery<Animal[], Error>({ //devolverá un array de objetos del tipo Animal o un Error 
        queryKey: ["animals"],
        queryFn: fetchAnimals,
        staleTime: Infinity // no es necesario volver a llamar a los animales ya q no cambian
    });
}