import getRandomInt from './getRandomInt';

const initialPopulation = (populationSizeParam) => {
    const populationSize = populationSizeParam || 20;
    const populationList = []
    /*
    Individual Representation
    Every individual is a list of genotype
    #0: fillColor R value (0-255)
    #1: fillColor G value (0-255)
    #2: fillColor B value (0-255)
    #3: strokeColor R value (0-255)
    #4: strokeColor G value (0-255)
    #5: strokeColor B value (0-255)
    #6: tileSize (1-70)
    #7: bgType (0-1)

    */
    for (let i = 0; i < populationSize; i++) {
        const individual = []
        individual.push(getRandomInt(256));
        individual.push(getRandomInt(256));
        individual.push(getRandomInt(256));
        individual.push(getRandomInt(256));
        individual.push(getRandomInt(256));
        individual.push(getRandomInt(256));
        individual.push(getRandomInt(70) + 1);
        populationList.push(individual);
    }
    return populationList;
};

export default initialPopulation;
