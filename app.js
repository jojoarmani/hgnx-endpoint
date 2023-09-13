const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Define the endpoint
app.get('/info', (req, res) => {
  // Get query parameters
  const { slackName, track } = req.query;
  
  // Validate slackName and track query parameters
  if (!slackName || !track) {
    return res.status(400).json({ error: 'slackName and track are required query parameters' });
  }

  // Get current day of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const currentDayOfWeek = daysOfWeek[currentDate.getUTCDay()];

  // Get current UTC time with validation of +/-2 hours
  const currentUTCTime = new Date().toUTCString();
  const utcOffset = currentDate.getTimezoneOffset() / 60;
  if (utcOffset < -2 || utcOffset > 2) {
    return res.status(400).json({ error: 'UTC offset is not within +/-2 hours' });
  }

  // GitHub URLs
  const githubFileURL = 'https://github.com/yourusername/yourrepository/blob/main/yourfile.js';
  const githubSourceURL = 'https://github.com/jojoarmani/hgnx-endpoint';

  // Send the response in JSON format
  res.status(200).json({
    slackName,
    currentDayOfWeek,
    currentUTCTime,
    track,
    githubFileURL,
    githubSourceURL,
    statusCode: 'Success',
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});