const User = require("../models/user");

const bot = require("../util/bot")
exports.createNewUser = async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            role: req.body.role
        });
        user.password = await user.hashPassword(req.body.password);
        let addedUser = await user.save()
        await bot.sendNotificationToBotty(null, `${addedUser.name} Just Created an account with Email as ${addedUser.email}`)
        res.status(200).json({
            msg: "Your Account Has been Created",
            data: addedUser
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.logUserIn = async (req, res) => {
    const {
        email,
        password
    } = req.body
    try {
        let user = await User.findOne({
            email: email
        });
        //check if user exit
        if (!user) {
            await bot.sendNotificationToBotty(`Login Attempt with Invalid Credentials ${email} as Email and ${password} as Password`)
            return res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }
        let match = await user.compareUserPassword(password, user.password);
        if (match) {
            let token = await user.generateJwtToken({
                user
            }, "secret", {
                expiresIn: 604800
            })

            if (token) {
                await bot.sendNotificationToBotty(null, `${user.name} Just Logged in`)
                res.status(200).json({
                    success: true,
                    token: token,
                    userCredentials: user
                })
            }
        } else {
            await bot.sendNotificationToBotty(`Login Attempt with Invalid Credentials ${email} as Email and ${password} as Password`)
            return res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }
    } catch (err) {
        await bot.sendNotificationToBotty(`An Error Occured`)
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}