import * as admin from 'firebase-admin';

import initialPopulation from '../../utilities/initialPopulation';
import {initializeCanvas, generateBackground} from '../../utilities/generateBackground';
import rgbToHex from '../../utilities/rgbToHex';

export default async (req, res) => {
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

        // Initialize Firebase Admin instance
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        } else {
            admin.app();
        }

        // Initialize connection to Firebase Realtime Database
        const db = admin.firestore();
        const sampleRef = db.collection('invitations').doc('first-sample');
        const doc = await sampleRef.get();
        if (!doc.exists) {
            console.log("The document doesn't exist1");
        } else {
            console.log(doc.data());
        }

        res.status(200).json({ invitationList: invitationList });
    } else {
        // 405: Method Not Allowed
        res.status(405).end();
    }
}
