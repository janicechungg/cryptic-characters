import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Body from './Components/Body';
import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Axios from 'axios';

function App () {
  return (
    <div className="Game app-background">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Game />} />
          <Route path = "/congrats" element = {<Congrats />}/>
          <Route path = "/gameover" element = {<GameOver/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function Game() {
  const navigate = useNavigate();
  const[word, setWord] = useState("");
  const[guess, setGuess] = useState("");
  //const[checkWord, setCheckWord] = useState("");
  const[score, setScore] = useState(0)
  const[lives, setLives] = useState(3);

  useEffect(() => {
    if (score >= 500) {
      navigate('/congrats')
    }
  }, [score]);

  useEffect(() => {
    if (lives <= 0) {
      navigate('/gameover')
    }
  })

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
          setScore(score => score + 100)
          setWord(response.data.newWord);
        }
        else {
          //setCheckWord(response.data.message);
          setLives(lives => lives - 1);
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
    
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
        
      <h1 className="mb-3 text-center text-white" style={{ marginTop: "-20vh" }}>Cryptic Characters</h1> 
        <div className="p-5 rounded-3 text-center shadow" style={{ backgroundColor: '#F4F1DE', width: '80%', maxWidth: '600px' }}>
      <div className="display-4 mb-4">{word}</div>
      <input type = "text" 
      className = "form-control text-center mb-2"
      placeholder = "Enter guess..."
      value = {guess}
      onChange = {handleInputChange}
      ></input>

      <div className="mb-3">
      <button className = "btn new-word-btn" onClick = {getNewWord}>New Word</button>
      <button className = "btn submit-btn" onClick = {handleSubmit}>Submit</button>
      </div>
      <div className = "mt-3">
      <h2>Lives</h2>
      <h2 className = "p-10"> {'● '.repeat(lives)}</h2>
      <h2>Score: {score}</h2>
      </div>
      </div>
    </div>
    </div>
  );
}

function Congrats() {
  return (
    <div className = "Congrats">
            <div className=" d-flex min-vh-100 d-flex justify-content-center align-items-center text-white">
      <h1>YOU WON THE GAME.</h1>
      </div>
    </div>
  )
}

function GameOver() {
  return (
    <div className = "GameOver">
            <div className=" d-flex min-vh-100 d-flex justify-content-center align-items-center text-white">
      <h1>WOMP WOMP!</h1>
      </div>
    </div>
  )
}



export default App;
