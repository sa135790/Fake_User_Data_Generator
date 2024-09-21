


const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Middleware to serve static files from 'client' folder
app.use(express.static(path.join(__dirname, '../client')));

// Root route to serve 'index.html'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Your existing API route
app.post('/api/generate', (req, res) => {
  const { region, errorPerRecord, seed, page } = req.body;
  const generatedData = generateRandomUserData(region, errorPerRecord, seed, page);
  res.json(generatedData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
