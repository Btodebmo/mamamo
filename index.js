const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());  // Enable CORS
app.use(express.json());

const apiKey = process.env.API_KEY || 'sk-e90797785fd74a14923d4412dedf73c0';
const url = 'https://ffa.chat/api/chat/completions';

app.get('/ai', async (req, res) => {
    const question = req.query.ask;

    if (!question) {
        return res.status(400).send('Error: The "ask" query parameter is required.');
    }

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    const data = {
        stream: false,  // Disable streaming
        model: "gpt-4o",
        messages: [
            { role: "user", content: question }
        ],
        session_id: "ZT-rqpOBJS4ao-crAAww",
        chat_id: "c9946d26-13ee-4204-a3d4-55a48baaf5dd",
        id: "ba1ca03f-ee46-408a-a990-33267a3c8239"
    };

    try {
        const response = await axios.post(url, data, { headers });
        res.json(response.data);
    } catch (error) {
        console.error('API Request Error:', error.response ? error.response.data : error.message);
        res.status(500).send('Error: ' + (error.response ? error.response.data : error.message));
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
