const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(express.static('public'));

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const generateResponse = async (userMessage) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(userMessage);
    const response = result.response;
    const text = response.text();
    console.log(typeof text);
    return text;
}

app.post('/api', async (req, res, next) => {
    const userMessage = req.body.message;
    const botResponse = await generateResponse(userMessage);
    console.log(botResponse);
    res.json({ message: botResponse });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});