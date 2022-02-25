import getRandomInt from './getRandomInt';

const mutation = (individual) => {
    const individualSize = individual.length;
    const mutationPoint = getRandomInt(individualSize);
    let mutationValue = getRandomInt(255);
    if (mutationPoint === 6) {
        mutationValue = getRandomInt(getRandomInt(70) + 1);
    }
    individual[mutationPoint] = mutationValue;
    return individual;
};

export default mutation;
