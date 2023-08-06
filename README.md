# whatsappApiHelper

This is a repository with some of the most used Objects for interacting with Whatsap Business Api, I created this since I am currently working in a privete project that require this "module". And while looking for something like this on the internet I only found some stuff that required payment.

This structure should be easy to replicate in any other langagues, or using any other technologies.

## Technologies

- Node.js
- dotenv
- Express.js
- Axios

## How to run

```
// Clone repository
git clone https://github.com/Luizfernando5212/whatsappApiHelper.git

// Install dependencies
npm install dotenv express axios

// Be creative

// To be able to run and test locally, you should install ngrok to redirect. The Facebook App requires that the URL is not Local.
npm install ngrok
// more info on https://www.npmjs.com/package/ngrok
```

## Examples

I made these, so that it should be simple to use and replicate, to make a request of a message as simple as this

```
await axios(whatsHelper.textMessage(from, "Hello World!"));
await axios(whatsHelper.interactiveMessage(from, 'My message', ['Button1', 'Button2'], 1));
```

There are other examples in the example.js file


## Author

Luiz Fernando Arruda Oliveira

https://www.linkedin.com/in/luiz-oliveira-037470213/
