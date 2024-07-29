import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './Components/Game';
import Congrats from './Components/Congrats';
import GameOver from './Components/GameOver';

function App() {
  return (
    <div className="Game app-background">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/congrats" element={<Congrats />} />
          <Route path="/gameover" element={<GameOver />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
