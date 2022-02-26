import * as admin from 'firebase-admin';

export default async (req, res) => {
    if (req.method === 'POST') {
        // Receive value from request body
        const sessionId = req.body.sessionId;
        const invitationBase64 = req.body.invitationBase64;

        // Initialize Firebase Admin instance
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                storageBucket: process.env.FIREBASE_STORAGE_BUCKET
            });
        } else {
            admin.app();
        }

        // Initialize connection to Firebase Cloud Storage
        const bucket = admin.storage().bucket();
        const fileName = `pdf/invitation-${sessionId}.pdf`;
        const file = bucket.file(fileName);

        file.save(invitationBase64)
            .then(() => {
                console.log('Upload successful!');
                const uploadedFile = bucket.file(fileName);
                uploadedFile.setMetadata({
                    metadata: {
                        firebaseStorageDownloadTokens: sessionId,
                    },
                });
                const url = `https://firebasestorage.googleapis.com/v0/b/invit-77505.appspot.com/o/pdf%2Finvitation-${sessionId}.pdf?alt=media&token=${sessionId}`;
                res.status(200).json({ fileUrl: url });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).end();
            });
    } else {
        // 405: Method Not Allowed
        res.status(405).end();
    }
}
