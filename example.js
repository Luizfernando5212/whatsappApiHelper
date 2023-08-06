/*
 * Starter Project for WhatsApp Echo Bot Tutorial
 *
 * Remix this as the starting point for following the WhatsApp Echo Bot tutorial
 *
 */

// Imports dependencies and set up http server
const express = require("express"),
    body_parser = require("body-parser"),
    axios = require("axios").default,
    app = express().use(body_parser.json()),
    whatsHelper = require('./helper.js'); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log("webhook is listening"));

// Accepts POST requests at /webhook endpoint
app.post("/whatsapp/", async (req, res) => {
    // Parse the request body from the POST
    let body = req.body;
    let state; 
    /* 
        One way to keep track of the state of the user, is by using a external DataBase. if you awant to leave the user "open" to send any message
        otherwise you can use the state variable to keep track of the state of the user, by setting the state as the id of the response.
    */

    if (req.body.object) {
        if (req.body.entry &&
            req.body.entry[0].changes &&
            req.body.entry[0].changes[0] &&
            req.body.entry[0].changes[0].value.messages &&
            req.body.entry[0].changes[0].value.messages[0]) {
            let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload

            try {
                try {
                    state = req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id; // setting the state as the id of the response
                } catch (err) {
                    try {
                        state = req.body.entry[0].changes[0].value.messages[0].interactive.list_reply.id;
                    } catch (err) { }
                }
                if (state) {
                    console.log(state)
                    await updateState(from, state);
                    console.log(state + ' Novo')
                }
            } catch (err) {
                console.log('Não há estado no momento ')
            }

            if (body.entry[0].changes[0].value.messages[0].text &&
                body.entry[0].changes[0].value.messages[0].text.body) {
                switch (state) {
                    case 0: await axios(whatsHelper.textMessage(from, "Hello World!"));
                        await axios(user.updateState(from, 1)); // You should update state if you want to keep track of the user state using a external DataBase
                        break;
                    case 4: await axios(whatsHelper.interactiveListMessage(from, 'My message', ['buttons'], 1));
                }
            } else if (body.entry[0].changes[0].value.messages[0].interactive &&
                body.entry[0].changes[0].value.messages[0].interactive.button_reply &&
                body.entry[0].changes[0].value.messages[0].interactive.button_reply.id) {
                switch (state) {
                    case 1: await axios(whatsHelper.interactiveMessage(from, 'My message', ['Button1', 'Button2'], 1)); break;

                }
            } else if (body.entry[0].changes[0].value.messages[0].interactive &&
                body.entry[0].changes[0].value.messages[0].interactive.list_reply &&
                body.entry[0].changes[0].value.messages[0].interactive.list_reply.id) {
                    switch (state) {
                        case 2: await axios(whatsHelper.mediaMessage(from, 'https://www.w3schools.com/w3css/img_lights.jpg')); break;
                        case 3: await axios(whatsHelper.fullMessage(from, {header: 'Header', body: 'Body', footer: 'Footer'}, ['Buttons'], 4)); break;
                    }

            }
        }
        res.sendStatus(200);
    } else {
        // Return a '404 Not Found' if event is not from a WhatsApp API
        res.sendStatus(404);
    }
});

// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
app.get("/whatsapp", (req, res) => {
    /**
     * UPDATE YOUR VERIFY TOKEN
     *This will be the Verify Token value when you set up webhook
     **/
    const verify_token = process.env.VERIFY_TOKEN;

    // Parse params from the webhook verification request
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode were sent
    if (mode && token) {
        // Check the mode and token sent are correct
        if (mode === "subscribe" && token === verify_token) {
            // Respond with 200 OK and challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});