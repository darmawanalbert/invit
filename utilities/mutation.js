import getRandomInt from './getRandomInt';

const mutation = (individual) => {
    const mutationProbability = 0.5;
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
    return individual;
};

export default mutation;
