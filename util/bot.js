const axios = require('axios');

const hook = "T0131AR2K1Q/B019WLA4V51/UinM4oC9wKvNK4RcxL7uBLDB";

exports.logger = async (log) => {
    try {
        const slackbody = {
            mkdwn: true,
            attachments: [{
                pretext: "Booty Tranaction Notification",
                title: "Activity Log",
                color: "good",

                text: `*${log.name}* ${log.email} with ₦${log.createdAt}`
            }]


        };
        const res = await axios.post(`https://hooks.slack.com/services/${hook}`, slackbody)
        console.log(res.data)

    } catch (err) {
        console.log(err)
    }

}

// module.exports = {

// }