import getRandomInt from './getRandomInt';
import { INTENT_COLOR_DARKER, INTENT_COLOR_LIGHTER, INTENT_DEFAULT, INTENT_PATTERN_DENSER, INTENT_PATTERN_SPARSER, INTENT_TEXT_BIGGER, INTENT_TEXT_SMALLER } from './intentConst';

const crossover = (individualOne, individualTwo, intentParam) => {
    const intent = intentParam || INTENT_DEFAULT;
    const crossoverProbability = 0.5;
    let crossoverPointList = [];
    // Perform crossover based on user's intent
    if (intent === INTENT_COLOR_DARKER || intent === INTENT_COLOR_LIGHTER) {
        crossoverPointList = [0, 1, 2, 3, 4, 5, 8, 9, 10];
    } else if (intent === INTENT_PATTERN_DENSER || intent === INTENT_PATTERN_SPARSER) {
        crossoverPointList = [6, 7];
    } else if (intent === INTENT_TEXT_BIGGER || intent === INTENT_TEXT_SMALLER) {
        crossoverPointList = [11];
    } else {
        // Perform single-point crossover
        const individualSize = individualOne.length;
        const crossoverPoint = getRandomInt(individualSize);
        for (let i = crossoverPoint; i < individualSize; i++) {
            crossoverPointList.push(i);
        }
    }

    for (let i = 0; i < crossoverPointList.length; i++) {
        const currentIndex = crossoverPointList[i];
        const currentRandomVar = Math.random();
        if (currentRandomVar < crossoverProbability) {
            [individualOne[currentIndex], individualTwo[currentIndex]] = [individualTwo[currentIndex], individualOne[currentIndex]];
        }
    }

    return [individualOne, individualTwo];
};

export default crossover;
