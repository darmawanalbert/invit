import getRandomInt from './getRandomInt';
import { INTENT_COLOR_DARKER, INTENT_COLOR_LIGHTER, INTENT_DEFAULT, INTENT_PATTERN_DENSER, INTENT_PATTERN_SPARSER, INTENT_TEXT_BIGGER, INTENT_TEXT_SMALLER } from './intentConst';

const mutation = (individual, intentParam) => {
    const intent = intentParam || INTENT_DEFAULT;
    const mutationProbability = 0.8;
    const colorGeneIndex = [0, 1, 2, 3, 4, 5, 8, 9, 10];
    if (intent === INTENT_COLOR_DARKER) {
        for (let i = 0; i < colorGeneIndex.length; i++) {
            const currentIndex = colorGeneIndex[i];
            const randomVar = Math.random();
            if (randomVar < mutationProbability) {
                const mutationValue = getRandomInt(individual[currentIndex]);
                individual[currentIndex] = mutationValue;
            }
        }
    } else if (intent === INTENT_COLOR_LIGHTER) {
        for (let i = 0; i < colorGeneIndex.length; i++) {
            const currentIndex = colorGeneIndex[i];
            const randomVar = Math.random();
            if (randomVar < mutationProbability && individual[currentIndex] < 255) {
                const mutationValue = getRandomInt(255 - individual[currentIndex]) + individual[currentIndex] + 1;
                individual[currentIndex] = mutationValue;
            }
        }
    } else if (intent === INTENT_PATTERN_DENSER) {
        const randomVar = Math.random();
        if (randomVar < mutationProbability) {
            const mutationValue = getRandomInt(individual[6] - 1) + 1;
            individual[6] = mutationValue;
        }
    } else if (intent === INTENT_PATTERN_SPARSER) {
        const randomVar = Math.random();
        if (randomVar < mutationProbability && individual[6] < 70) {
            const mutationValue = getRandomInt(70 - individual[6]) + individual[6] + 1;
            individual[6] = mutationValue;
        }
    } else if (intent === INTENT_TEXT_SMALLER) {
        const randomVar = Math.random();
        if (randomVar < mutationProbability) {
            const mutationValue = getRandomInt(individual[11] - 12) + 12;
            individual[11] = mutationValue;
        }
    } else if (intent === INTENT_TEXT_BIGGER) {
        const randomVar = Math.random();
        if (randomVar < mutationProbability && individual[11] < 48) {
            const mutationValue = getRandomInt(48 - individual[11]) + individual[11] + 1;
            individual[11] = mutationValue;
        }
    } else {
        // Perform single-point mutation
        const randomVar = Math.random();
        if (randomVar < mutationProbability) {
            const individualSize = individual.length;
            const mutationPoint = getRandomInt(individualSize);
            let mutationValue = getRandomInt(256);
            if (mutationPoint === 6) {
                mutationValue = getRandomInt(70) + 1;
            } else if (mutationPoint === 7) {
                mutationValue = getRandomInt(2);
            } else if (mutationPoint === 11) {
                mutationValue = getRandomInt(37) + 12;
            }
            individual[mutationPoint] = mutationValue;
        }
    }
    return individual;
};

export default mutation;
