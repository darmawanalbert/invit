import initialPopulation from '../../utilities/initialPopulation';
import {initializeCanvas, generateBackground} from '../../utilities/generateBackground';
import rgbToHex from '../../utilities/rgbToHex';

export default (req, res) => {
    if (req.method === 'POST') {
        const sessionId = req.body.sessionId;
        const populationList = initialPopulation(10);
        const canvasObject = initializeCanvas();
        const invitationList = [];
        for (let i = 0; i < populationList.length; i++) {
            const individual = populationList[i];
            const bgBase64 = generateBackground(canvasObject, individual.slice(0,3), individual.slice(3,6), individual[6], individual[7]);
            const textColor = rgbToHex(individual[8], individual[9], individual[10]);
            const textSize = individual[11];
            const invitationObject = {
                bgBase64: bgBase64,
                textColor: textColor,
                textSize: textSize,
            }
            invitationList.push(invitationObject);
        }

        res.status(200).json({ invitationList: invitationList });
    } else {
        // 405: Method Not Allowed
        res.status(405).end();
    }
}
