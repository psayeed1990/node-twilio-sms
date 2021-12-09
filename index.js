//start a express server
const express = require("express");
const app = express();

//define dotenv
require("dotenv").config();

//use cors
const cors = require("cors");
app.use(cors());

//set express to use json
app.use(express.json());

//set express to use url encoded
app.use(express.urlencoded({ extended: true }));

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

//import twilio
const twilio = require("twilio")(accountSid, authToken);

//testing route
app.post("/send-sms", async (req, res) => {
    const { phone, message } = req.body;
    const sendMessage = await twilio.messages.create({
        body: message,
        from: "+1 712 423 5259",
        to: phone,
    });

    res.status(200).json(sendMessage);
});

const PORT = process.env.PORT || 5999;
//start express server
app.listen(PORT, () => {
    console.log(`Server started @${PORT}`);
});
