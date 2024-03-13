const express = require('express');
const app = express();

// Serve HTML pages from the 'public' directory
app.use(express.static('public'));

// Start the server
const PORT = 9090;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
