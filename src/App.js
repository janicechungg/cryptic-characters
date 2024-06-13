import './App.css';
import Body from './Components/Body';
import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Axios from 'axios';

function App () {
  return (
    <div className = "Game">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Game />} />
          <Route path = "/congrats" element = {<Congrats />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function Game() {
  const navigate = useNavigate();
  const[word, setWord] = useState("");
  const[guess, setGuess] = useState("");
  const[checkWord, setCheckWord] = useState("");
  const[score, setScore] = useState(0)
  const[gameWon, setGameWon] = useState(false)

  useEffect(() => {
    if (score >= 500) {
      navigate('/congrats')
    }
  }, [score]);

  const getNewWord = () => {
    Axios.get('http://localhost:3000/words').then((res) => {
      setWord(res.data);
    });
  }

  const handleInputChange = (e) => {
    setGuess(e.target.value);
  }

  const handleSubmit = () => {
    if (!guess.trim()) {
      window.alert('Write an answer');
      return;
    }

    console.log('Sending this guess:', guess);
    Axios.post('http://localhost:3000/guess', { userGuess: guess })
      .then(response => {
        if (response.data.correct) {
          //setCheckWord(response.data.message);
          setScore(score => score + 100)
          setWord(response.data.newWord);
        }
        else {
          setCheckWord(response.data.message);
          setScore(score => Math.max(0, score - 100))
        }
        setGuess("");
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
      <input type = "text" 
      placeholder = "Enter guess..."
      value = {guess}
      onChange = {handleInputChange}
      ></input>
      <button onClick = {handleSubmit}>Submit</button>
      <h1>{checkWord}</h1>
      <h2>Score: {score}</h2>
    </div>
  );
}

function Congrats() {
  return (
    <div className = "congrats">
      <h1>YOU WON THE GAME</h1>
    </div>
  )
}


export default App;
