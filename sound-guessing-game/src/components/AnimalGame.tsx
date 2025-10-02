import { useEffect, useState } from 'react';
import { useAnimals } from '../hooks/useAnimals';
import type { Animal } from '../interfaces/Animal';
import { getRandomAnimals } from '../utils/utils';
import '../css/animalGame.css';

const AnimalGame = () => {
    const { data: animals = [], isLoading, error } = useAnimals();
    const [streak, setStreak] = useState(0); // contador de rachas
    const [currentAnimals, setCurrentAnimals] = useState<Animal[]>([])
    const [correctAnimal, setCorrectAnimal] = useState<Animal | null>(null);
    const [mode, setMode] = useState<"arcade" | "challenge">("arcade");
    //animales q no se repiten hasta agotarse (modo challenge)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [remainingAnimals, setRemainingAnimals] = useState<Animal[]>([]);
    const [isEndModal, setIsEndModal] = useState<boolean>(false);


    // inicializar animales aleatorios al montar el componente
    useEffect(() => {
        if (!animals || animals.length === 0) return;

        if (mode === "arcade") {
            startNewRoundArcade();
        } else {
            // Cuando cambiamos a challenge, inicializamos remainingAnimals
            if (remainingAnimals.length === 0) {
                setRemainingAnimals(animals);
                const { options, correct } = getRandomAnimals(animals, 2);
                setCurrentAnimals(options);
                setCorrectAnimal(correct);
            }
        }
    }, [animals, mode]); // depende también del modo


    /* aqui pueden repetirse los animales en la ronda siguiente (modo arcade) */
    const startNewRoundArcade = () => {
        if (!animals) return;

        const { options, correct } = getRandomAnimals(animals, 2);
        setCurrentAnimals(options);
        setCorrectAnimal(correct);
    }

    const startNewRoundChallenge = (animalsToUse: Animal[] = remainingAnimals, shouldRemove: boolean = true) => {
        if (animalsToUse.length < 2) {
            setIsEndModal(true);
            return;
        }

        // Generamos las opciones a partir del estado actual
        const { options, correct } = getRandomAnimals(animalsToUse, 2);
        setCurrentAnimals(options);
        setCorrectAnimal(correct);

        // Eliminamos solo el correcto del array si shouldremove es true (dependiendo de si acierta o no)
        if (shouldRemove) {
            setRemainingAnimals(prev => prev.filter(a => a.id !== correct.id));
        }
    };

    const handleAnswer = (chosenId: number) => {
        if (correctAnimal && chosenId === correctAnimal.id) {
            setStreak((prev) => prev + 1)
            if (mode === "challenge") {
                startNewRoundChallenge(); // nueva ronda solo si acertó
            }
        } else {
            setStreak(0)//fallo
            if (mode === "challenge") {
                // setRemainingAnimals(animals) → actualiza estado para próximas rondas | startNewRoundChallenge(animals) → genera ronda actual inmediatamente
                setRemainingAnimals(animals);
                startNewRoundChallenge(animals, false);
            }
        }
        if (mode === "arcade") {
            startNewRoundArcade(); // nueva ronda pase lo q pase
        }
    }

    if (isLoading) return <p>Cargando animales...</p>
    if (error) return <p>Error {error.message}</p>
    if (!animals) return <p>Animales no encontrados</p>

    return (

        <>

            <div className='ModeGame-wrapper'>
                {/* Botón para cambiar de modo */}
                <div className='ChangeMode'>
                    <h2 className='AnimalGame-h2'>Modo de juego</h2>
                    <button className='ChangeMode-btn' onClick={() => {
                        setMode(mode === "arcade" ? "challenge" : "arcade");
                        setStreak(0)
                        if (mode === "arcade") setRemainingAnimals(animals);
                    }}
                    >
                        Cambiar a {mode === "arcade" ? "Challenge" : "Arcade"}
                    </button>
                </div>

                <div className='StreakGame-wrapper'>
                    <p className='StreakGame-p'>Racha actual</p>
                    <p className='StreakGame-number'>{streak}</p>
                </div>
            </div>



            {/* Lista de animales para elegir */}
            <div className='AnimalGame-options'>
                {currentAnimals[0] && (
                    <button
                        className='Button-option'
                        onClick={() => handleAnswer(currentAnimals[0].id)}
                    >
                        <div className='Option-wrapper'>
                            <p className='Option-name'>{currentAnimals[0].name.es}</p>
                        </div>
                    </button>
                )}

                {/* UN SOLO botón ? en medio */}
                {currentAnimals.length === 2 && (
                    <div className='Challenge-div'>
                        <img className='Challenge-image' src="/q-mark.svg" alt="interrogación" />
                        <button className='Challenge-sound' onClick={() => {/* reproducir audio */ }}>
                            play sonido
                        </button>
                        {mode === "challenge" && <p>Animales restantes: {remainingAnimals.length}</p>}
                    </div>

                )}

                {currentAnimals[1] && (
                    <button
                        className='Button-option'
                        onClick={() => handleAnswer(currentAnimals[1].id)}
                    >
                        <div className='Option-wrapper'>
                            <p className='Option-name'>{currentAnimals[1].name.es}</p>
                        </div>
                    </button>
                )}
            </div>

            {/* Modal de fin de challenge */}
            {isEndModal && (
                <div className="EndModal">
                    <p>¡Has llegado al final de los animales disponibles!</p>
                    <button
                        onClick={() => {
                            setRemainingAnimals(animals); // reinicia la bolsa
                            setIsEndModal(false);          // cierra el modal
                            setStreak(0);                  // reinicia racha si quieres
                            startNewRoundChallenge(animals, false);
                        }}
                    >
                        Reiniciar Challenge
                    </button>
                </div>
            )}

<div className='ResetGame-wrapper'>
            <button className='ResetGame-reset'
                onClick={() => {
                    if (mode === "arcade") {
                        startNewRoundArcade();
                        setStreak(0)
                    } else {
                        startNewRoundChallenge();
                        setStreak(0)
                    }
                }}
            >Reiniciar</button>
</div>

        </>
    );

}

export default AnimalGame;