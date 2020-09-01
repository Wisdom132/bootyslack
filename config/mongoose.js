const mongoose = require("mongoose");

module.exports = app => {
    mongoose.connect("mongodb://localhost:27017/slackbot", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    }).then(() => console.log("conneceted to db")).catch(err => console.log(err))
    mongoose.Promise = global.Promise;

    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("SIGHUP", cleanup);

    if (app) {
        app.set("mongoose", mongoose);
    }
};

function cleanup() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
}