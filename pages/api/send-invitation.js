const axios = require('axios');

export default async (req, res) => {
    if (req.method === 'POST') {
        
        var config = {
            method: 'post',
            url: 'https://invit.vercel.app/api/store-pdf',
            data: {
                'sessionId' : req.body.sessionId,
                'invitationBase64' : req.body.invitationBase64,
            }
        };
        
        const store_pdf = await axios(config)

        var config2 = {
            method: 'post',
            url: 'http://ec2-13-239-17-27.ap-southeast-2.compute.amazonaws.com:8089/align/twilio/invite',
            data: {
                'num' : req.body.num,
                'inviter' : req.body.inviter,
                'invitation_url' : store_pdf.data.fileUrl
            }
        };

        const sms_sender = await axios(config2)

        res.send(JSON.stringify(sms_sender.data))

    } else {
        // 405: Method Not Allowed
        res.status(405).end();
    }
}