import './App.css';
import Body from './Components/Body';
import {useState, useEffect} from 'react';
import Axios from 'axios';

function App() {

  const[word, setWord] = useState("");
  const[guess, setGuess] = useState("");
  const[checkWord, setCheckWord] = useState("");
  const[score, setScore] = useState(0)

  const getNewWord = () => {
    Axios.get('http://localhost:3000/words').then((res) => {
      setWord(res.data);
    });
  }

  const handleInputChange = (e) => {
    setGuess(e.target.value);
  }

  const handleSubmit = () => {
    console.log('Sending this guess:', guess);
    Axios.post('http://localhost:3000/guess', { userGuess: guess })
      .then(response => {
        if (response.data.correct) {
          setCheckWord(response.data.message);
          setScore(score => score + 100)
          console.log("New Word: ", response.data.newWord);
          setWord(response.data.newWord);
        }
        else {
          setCheckWord(response.data.message);
          setScore(score => Math.max(0, score - 100))
        }
        console.log('Data sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Failed to send data:', error);
      });
  };


  return (
    <div className="App">
      <Body/>
      <button onClick = {getNewWord}>New Word</button>
      <h1>{word}</h1>
      <input type = "text" placeholder = "Enter guess..."
      onChange = {handleInputChange}></input>
      <button onClick = {handleSubmit}>Submit</button>
      <h1>{checkWord}</h1>
      <h2>Score: {score}</h2>
    </div>
  );
}



export default App;
