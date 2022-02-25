import initialPopulation from '../../utilities/initialPopulation';
import generateBackground from '../../utilities/generateBackground';

export default (req, res) => {
    // if (req.method === 'POST') {
    if (req.method === 'GET') {
        // Retrieve all request body values
        // const partnerOneName = req.body.partnerOneName;
        // const partnerTwoName = req.body.partnerTwoName;
        // const dateString = req.body.dateString;
        // const timeString = req.body.timeString;

        const populationList = initialPopulation(1);
        const bgBase64List = [];
        for (let i = 0; i < populationList.length; i++) {
            const individual = populationList[i];
            const bgBase64 = generateBackground(individual.slice(0,3), individual.slice(3,6), individual[6]);
            bgBase64List.push(bgBase64);
        }

        res.status(200).json({ populationList: populationList, bgBase64List: bgBase64List });
    } else {
        // 405: Method Not Allowed
        res.status(405).end();
    }
}
