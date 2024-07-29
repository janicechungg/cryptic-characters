// server.js

const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const PORT = 3000;

app.use(express.json());
app.use(cors());

let currentWord = ''; // Store the original word globally

// Gets a new word and scrambles it
app.get('/words', async (req, res) => {
    try {
        const response = await axios.get('https://random-word-api.herokuapp.com/word');
        currentWord = response.data[0]; // Store the original word
        const scrambledWord = scrambleWord(currentWord);
        console.log(`Original Word (backend): ${currentWord}`); // Log the original word
        res.json({ originalWord: currentWord, scrambledWord });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Could not fetch data');
    }
});

// Scrambles the word
function scrambleWord(word) {
    let scrambledWord = '';
    const wordArray = word.split('');
    while (wordArray.length > 0) {
        scrambledWord += wordArray.splice(wordArray.length * Math.random() << 0, 1);
    }
    return scrambledWord;
}

// Checks the user's guess
app.post('/guess', async (req, res) => {
    const userGuess = req.body.userGuess;
    if (userGuess) {
        const isCorrect = userGuess.toLowerCase() === currentWord.toLowerCase();
        console.log(`User's Guess: ${userGuess}, Correct Word: ${currentWord}, Correct: ${isCorrect}`);
        if (isCorrect) {
            const newWordData = await setNewWord(); // Fetch a new word immediately
            res.json({ correct: true, ...newWordData });
        } else {
            res.json({ correct: false, originalWord: currentWord, scrambledWord: scrambleWord(currentWord) });
        }
    } else {
        res.status(400).send('No guess provided');
    }
});

// Function to set a new word and scramble it
async function setNewWord() {
    const response = await axios.get('https://random-word-api.herokuapp.com/word');
    currentWord = response.data[0]; // Update the server's current word
    const scrambledWord = scrambleWord(currentWord);
    console.log(`New Original Word (backend): ${currentWord}`); // Log the new original word
    return { originalWord: currentWord, scrambledWord };
}

// Start the server
app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`);
});
