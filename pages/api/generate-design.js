import * as admin from 'firebase-admin';

import initialPopulation from '../../utilities/initialPopulation';
import crossover from '../../utilities/crossover';
import mutation from '../../utilities/mutation';
import {initializeCanvas, generateBackground} from '../../utilities/generateBackground';
import rgbToHex from '../../utilities/rgbToHex';
import { INTENT_COLOR_DARKER, INTENT_DEFAULT , INTENT_COLOR_LIGHTER, INTENT_PATTERN_DENSER, INTENT_PATTERN_SPARSER, INTENT_TEXT_SMALLER, INTENT_TEXT_BIGGER} from '../../utilities/intentConst';
import { sortColorDarker , sortColorLighter, sortPatternDenser, sortPatternSparser, sortTextSmaller, sortTextBigger} from '../../utilities/intentSort';

export default async (req, res) => {
    if (req.method === 'POST') {
        // Receive value from request body
        const sessionId = req.body.sessionId || "default-session";
        const intent = req.body.intent || INTENT_DEFAULT;
        const populationSize = 8;

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
        const sessionRef = db.collection('invitations').doc(sessionId);
        const sessionDoc = await sessionRef.get();
        const invitationList = []
        if (!sessionDoc.exists) {
            // Create new population
            const populationList = initialPopulation(populationSize);

            // Save the new population to Firestore
            const res = await sessionRef.set({ ...populationList });

            // Infer all properties in each individual, then put it into invitationList
            const canvasObject = initializeCanvas();
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
        } else {
            const currentPopulationList = Object.values(sessionDoc.data())
            // Yield the next generations
            // #1: Selection
            let parentList = [];
            if (intent === INTENT_COLOR_DARKER) {
                parentList = currentPopulationList.sort(sortColorDarker).slice(0, currentPopulationList.length / 2);
            } else if (intent === INTENT_COLOR_LIGHTER) {
                parentList = currentPopulationList.sort(sortColorLighter).slice(0, currentPopulationList.length / 2);
            } else if (intent === INTENT_PATTERN_DENSER) {
                parentList = currentPopulationList.sort(sortPatternDenser).slice(0, currentPopulationList.length / 2);
            } else if (intent === INTENT_PATTERN_SPARSER) {
                parentList = currentPopulationList.sort(sortPatternSparser).slice(0, currentPopulationList.length / 2);
            } else if (intent === INTENT_TEXT_SMALLER) {
                parentList = currentPopulationList.sort(sortTextSmaller).slice(0, currentPopulationList.length / 2);
            } else if (intent === INTENT_TEXT_BIGGER) {
                parentList = currentPopulationList.sort(sortTextBigger).slice(0, currentPopulationList.length / 2);
            } else {
                parentList = currentPopulationList.slice(0, currentPopulationList.length / 2);
            }

            // #2: GA operators (crossover and mutation)
            let newPopulationList = [];
            for (let i = 0; i < parentList.length; i+=2) {
                const [newIndividualOne, newIndividualTwo] = crossover([...parentList[i]], [...parentList[i+1]], intent);
                const mutatedIndividualOne = mutation([...newIndividualOne], intent);
                const mutatedIndividualTwo = mutation([...newIndividualTwo], intent);
                newPopulationList.push(mutatedIndividualOne);
                newPopulationList.push(mutatedIndividualTwo);
            }
            newPopulationList = newPopulationList.concat(parentList);
            // Save the new population to Firestore
            const res = await sessionRef.set({ ...newPopulationList });

            // Infer all properties in each individual, then put it into invitationList
            const canvasObject = initializeCanvas();
            for (let i = 0; i < newPopulationList.length; i++) {
                const individual = newPopulationList[i];
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
        }

        res.status(200).json({ invitationList: invitationList });
    } else {
        // 405: Method Not Allowed
        res.status(405).end();
    }
}
