// Game.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Game() {
  const navigate = useNavigate();
  const [scrambledWord, setScrambledWord] = useState("");
  const [originalWord, setOriginalWord] = useState("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    if (score >= 500) {
      navigate('/congrats');
    }
  }, [score, navigate]);

  useEffect(() => {
    if (lives <= 0) {
      navigate('/gameover');
    }
  }, [lives, navigate]);

  const getNewWord = async () => {
    try {
      const res = await Axios.get('http://localhost:3000/words');
      setOriginalWord(res.data.originalWord);
      setScrambledWord(res.data.scrambledWord);
      console.log(`Original Word (frontend): ${res.data.originalWord}`); // Log the original word
    } catch (error) {
      console.error('Error fetching new word:', error);
    }
  };

  const handleInputChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmit = async () => {
    if (!guess.trim()) {
      window.alert('Please enter a guess.');
      return;
    }

    try {
      const response = await Axios.post('http://localhost:3000/guess', { userGuess: guess });
      if (response.data.correct) {
        setScore(prevScore => prevScore + 100);
        // Update with new word data from the response
        setOriginalWord(response.data.originalWord);
        setScrambledWord(response.data.scrambledWord);
        console.log(`Original Word after guess (frontend): ${response.data.originalWord}`); // Log the new original word
      } else {
        setLives(prevLives => prevLives - 1);
      }
      setGuess(""); // Clear the input after submission
    } catch (error) {
      console.error('Failed to submit guess:', error);
    }
  };

  const handleHint = () => {
    if (originalWord) {
      const hintText = `Hint: ${originalWord.slice(0, 2)}`; // Use original word for hint
      alert(hintText);
    }
  };

  return (
    <div className="App">
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="mb-3 text-center text-white" style={{ marginTop: "-20vh" }}>Cryptic Characters</h1>
        <div className="p-5 rounded-3 text-center shadow" style={{ backgroundColor: '#F4F1DE', width: '80%', maxWidth: '600px' }}>
          <div className="display-4 mb-4">{scrambledWord}</div> {/* Display scrambled word */}
          <input
            type="text"
            className="form-control text-center mb-2"
            placeholder="Enter guess..."
            value={guess}
            onChange={handleInputChange}
          />
          <div className="mb-3">
            <button className="btn new-word-btn" onClick={getNewWord}>New Word</button>
            <button className="btn submit-btn" onClick={handleSubmit}>Submit</button>
            <button className="btn hint-btn" onClick={handleHint}>Hint</button>
          </div>
          <div className="mt-3">
            <h2>Lives</h2>
            <h2 className="p-10">{'● '.repeat(lives)}</h2>
            <h2>Score: {score}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
