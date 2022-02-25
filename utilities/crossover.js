import getRandomInt from './getRandomInt';

const crossover = (individualOne, individualTwo) => {
    const individualSize = individualOne.length;
    const crossoverPoint = getRandomInt(individualSize);
    for (let i = crossoverPoint; i < individualSize; i++) {
        [individualOne[i], individualTwo[i]] = [individualTwo[i], individualOne[i]];
    }
    return [individualOne, individualTwo];
};

export default crossover;
