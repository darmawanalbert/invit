import initialPopulation from '../../utilities/initialPopulation';

export default (req, res) => {
    // if (req.method === 'POST') {
    if (req.method === 'GET') {
        // Retrieve all request body values
        // const partnerOneName = req.body.partnerOneName;
        // const partnerTwoName = req.body.partnerTwoName;
        // const dateString = req.body.dateString;
        // const timeString = req.body.timeString;

        const populationList = initialPopulation(10);
        res.status(200).json({ populationList: populationList })
    } else {
        // 405: Method Not Allowed
        res.status(405).end();
    }
}
