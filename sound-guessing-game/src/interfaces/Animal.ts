export interface Animal {
    id: number;
    name: {
        en: string,
        es: string,
    };
    type: {
        en: string,
        es: string,
    };
    sound: string;
    image: string;

}

export interface RandomAnimalsResult{
    options:Animal[];
    correct:Animal;
}