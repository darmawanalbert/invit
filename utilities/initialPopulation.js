import getRandomInt from './getRandomInt';
import enforceColorContrast from './enforceColorContrast';

const initialPopulation = (populationSizeParam) => {
    const populationSize = populationSizeParam || 20;
    const populationList = []
    /*
    Individual Representation
    Every individual is a list of genotype
    Background
    #0: fillColor R value (0-255)
    #1: fillColor G value (0-255)
    #2: fillColor B value (0-255)
    #3: strokeColor R value (0-255)
    #4: strokeColor G value (0-255)
    #5: strokeColor B value (0-255)
    #6: tileSize (1-70)
    #7: bgType (0-3)
    Text
    #8: fontColor R value (0-255)
    #9: fontColor G value (0-255)
    #10: fontColor B value (0-255)
    #11: fontSize (12-48)
    */
    for (let i = 0; i < populationSize; i++) {
        const individual = []
        // Background
        individual.push(getRandomInt(256));
        individual.push(getRandomInt(256));
        individual.push(getRandomInt(256));
        individual.push(getRandomInt(256));
        individual.push(getRandomInt(256));
        individual.push(getRandomInt(256));
        individual.push(getRandomInt(70) + 1);
        individual.push(getRandomInt(4));
        // Text
        individual.push(getRandomInt(256));
        individual.push(getRandomInt(256));
        individual.push(getRandomInt(256));
        individual.push(getRandomInt(37) + 12);

        // Enforce Color Contrast
        const finalIndividual = enforceColorContrast([...individual]);
        populationList.push(finalIndividual);
    }
    return populationList;
};

export default initialPopulation;
