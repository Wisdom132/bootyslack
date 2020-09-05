const axios = require("axios");
const e = require("express");

const hook = "T0131AR2K1Q/B019WLA4V51/UinM4oC9wKvNK4RcxL7uBLDB";

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
                    text: `*${log.name}* ${log.email} with ₦${log.createdAt}`,
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

// module.exports = {

// }