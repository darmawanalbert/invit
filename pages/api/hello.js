import colorContrast from "../../utilities/colorContrast";

export default async (req, res) => {
    if (req.method === 'GET') {
        // 8.592 for blue
        const blueRatio = colorContrast([255, 255, 255], [0, 0, 255]);
        // 1.074 for yellow
        const yellowRatio = colorContrast([255, 255, 255], [255, 255, 0]);
        res.status(200).json({ blueRatio: blueRatio, yellowRatio: yellowRatio });
    } else {
        // 405: Method Not Allowed
        res.status(405).end();
    }
}
