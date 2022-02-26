const axios = require('axios');

export default async (req, res) => {
    if (req.method === 'POST') {
        
        var config = {
            method: 'post',
            url: 'http://ec2-13-239-17-27.ap-southeast-2.compute.amazonaws.com:8089/align/twilio/invite',
            data: {
                'num' : req.body.num,
                'inviter' : req.body.inviter,
                'invitation_url' : req.body.invitation_url
            }
        };

        axios(config)
            .then(function (response) {
            console.log(response)
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({'message' : 'success'}));
        })
        .catch(function (error) {
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({"message":"ERROR!"}));
        });

    } else {
        // 405: Method Not Allowed
        res.status(405).end();
    }
}