const axios = require("axios");
const hook = process.env.HOOK;

exports.sendNotificationToBotty = async (error, log) => {
    try {
        let slackbody;
        if (log) {
            slackbody = {
                mkdwn: true,
                attachments: [{
                    pretext: "Booty Notification",
                    title: "Activity Log",
                    color: "good",
                    text: log,
                }, ],
            };
        } else if (error) {
            slackbody = {
                mkdwn: true,
                attachments: [{
                    pretext: "Booty Notification",
                    title: "Error Notification",
                    color: "#f50057",
                    text: error,
                }, ],
            };
        }
        await axios.post(
            `https://hooks.slack.com/services/${hook}`,
            slackbody
        );
    } catch (err) {
        console.log(err);
    }
};