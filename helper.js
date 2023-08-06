require('dotenv').config();

const token = process.env.WHATSAPP_TOKEN;
const phoneNumber = process.env.PHONE_NUMBER_ID;

const url = (numberId) => {
    return "https://graph.facebook.com/v16.0/" +
    numberId + "/messages/";
}

// The first parameter is always the phone number of the recipient.


// This is to send the simple text message, without any buttons or media.
exports.textMessage = (from, message) => {
    let body = {
        method: "POST",
        url: url(phoneNumber),
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: {
            messaging_product: "whatsapp",
            to: from,
            type: "text",
            text: {
                preview_url: false,
                body: message,
            },
        },
    }
    return body;
}

/* This is to send the text with header, body, footer and buttons.
   message is an object with header, body and footer.
   {
        header: "message inside header",
        body: "message inside body",
        footer: "message inside footer"
   }
   buttons is an array of strings, limited to 3 buttons, according to limitations of this kind o interaction.

   The i parameter is to keep track of the state of the users interactions.
*/
exports.fullMessage = (from, message, buttons, i = 0) => {
    let body = {
        method: "POST",
        url: url(phoneNumber),
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        data: {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: from,
            type: "interactive",
            interactive: {
                type: "button",
                header: {
                    type: 'text',
                    text: message.header
                },
                body: {
                    text: message.body,
                },
                footer: {
                    text: message.footer,
                },
                action: {
                    button: "buttons",
                    rows: buttons.map((name, index) => {
                        console.log(index)
                        return  {
                                id: index + i,
                                title: name,
                            };
                        
                    })
                }
            },

        }
    }
    return body;
}

/*
    This is to send the text with header, body and buttons. Usualy footer is not used, so it is not included in this function.
    message is an object with header and body or just a message that have buttons, in that case this parameter receives a String.
    {
        header: "message inside header",
        body: "message inside body"
    }

    The i parameter is to keep track of the state of the users interactions.
*/
exports.interactiveMessage = (from, message, buttons, i = 0) => {
    if (message instanceof Object) {
        let body = {
            method: "POST",
            url: url(phoneNumber),
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            data: {
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: from,
                type: "interactive",
                interactive: {
                    type: "button",
                    header: {
                        type: 'text',
                        text: message.header
                    },
                    body: {
                        text: message.body,
                    },
                    action: {
                        buttons: buttons.map((name, index) => {
                            return {
                                type: "reply",
                                reply: {
                                    id: index + i,
                                    title: name,
                                },
                            };
                        })
                    },
                },
            },
        }
        return body;
    } else {
        let body = {
            method: "POST",
            url: url(phoneNumber),
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            data: {
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: from,
                type: "interactive",
                interactive: {
                    type: "button",
                    body: {
                        text: message,
                    },
                    action: {
                        buttons: buttons.map((name, index) => {
                            return {
                                type: 'reply',
                                reply: {
                                    id: index + i,
                                    title: name
                                }
                            }
                        })
                    }
                }
            },
        }
        return body;
    }
}

/*
    This is to send an interactive list message, the buttons show up like a dropdown.
    message is a String with the message that will be shown.
    buttons is an array of strings, limited to 20 buttons, according to limitations of this kind o interaction.
    name is a String that will be shown in the dropdown button.
    i is to keep track of the state of the users interactions.
*/
exports.interactiveListMessage = (from, message, buttons, name, i = 0) => {

    let body = {
        method: "POST",
        url: url(phoneNumber),
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        data: {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: from,
            type: "interactive",
            interactive: {
                type: "list",
                body: {
                    text: message
                },
                action: {
                    button: name,
                    sections: [
                        {
                            title: "SECTION_1_TITLE",
                            rows: buttons.map((name, index) => {
                                return {
                                    id: index + i,
                                    title: name,
                                }
                            })
                        }
                    ]
                }
            }
        }
    }
    return body;
}

/*
    This is to send a media message, the image is sent as a URL.
*/
exports.mediaMessage = (from, img) => {
    let body = {
        method: "POST",
        url: url(phoneNumber),
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        data: {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: from,
            type: "image",
            image: {
                link: img,
            },
        },
    }
    return body;
}