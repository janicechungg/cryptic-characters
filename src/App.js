import './App.css';
import Body from './Components/Body';
import {useState, useEffect} from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

function App() {

  const[word, setWord] = useState("");
  const getNewWord = () => {
    Axios.get('http://localhost:3000/words').then((res) => {
      setWord(res.data);
    });
  }


  return (
    <div className="App">
      <Body/>
      <button onClick = {getNewWord}>New Word</button>
      <h1>{word}</h1>
    </div>
  );
}



export default App;
