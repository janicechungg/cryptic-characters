import './App.css';
import Body from './Components/Body';
import {useState, useEffect} from 'react';
import Axios from 'axios';

function App() {

  const[word, setWord] = useState("");
  const[guess, setGuess] = useState("");

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
    </div>
  );
}



export default App;
