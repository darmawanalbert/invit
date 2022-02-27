import colorContrast from "./colorContrast";
import getRandomInt from "./getRandomInt";

const enforceColorContrast = (individual) => {
    const backgroundColor = individual[7] === 0 ? [individual[0], individual[1], individual[2]] : [255, 255, 255];
    let foregroundColor = [individual[8], individual[9], individual[10]];
    let contrastRatio = colorContrast(backgroundColor, foregroundColor);
    while (contrastRatio < 4.5) {
        // Keep changing the foregroundColor until the contrastRatio >= 4.5
        foregroundColor = [getRandomInt(256), getRandomInt(256), getRandomInt(256)];
        contrastRatio = colorContrast(backgroundColor, foregroundColor);
    }
    return individual;
}

export default enforceColorContrast;
