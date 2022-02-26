import crossover from '../../utilities/crossover';

export default async (req, res) => {
    if (req.method === 'GET') {
        const arr = [46, 106, 134, 175, 211, 129, 38, 1, 32, 94, 92, 41];
        const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const [newArr, newArr2] = crossover(arr, arr2);

        res.status(200).json({ newArr: newArr, newArr2: newArr2 });
    } else {
        // 405: Method Not Allowed
        res.status(405).end();
    }
}
