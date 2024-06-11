const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const cors = require('cors')
const PORT = 3000;

app.use(cors());


//Gets the word from API
app.get('/words', async (req, res) => {
    try { 
        const response = await axios.get('https://random-word-api.herokuapp.com/word');
        res.send(scrambleWord(response.data[0]));
        console.log(response.data[0]);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Could not fetch data');
    }
})

//Scrambles the word
function scrambleWord(word) {
    var scrambledWord = '';
    word = word.split('');
    while (word.length > 0) {
        scrambledWord += word.splice(word.length * Math.random() << 0, 1);
    }
    return scrambledWord;
}

app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`);
})