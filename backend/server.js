const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Node.js Backend!' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
}); 