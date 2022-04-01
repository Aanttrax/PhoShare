import { Routes, Route } from "react-router";
import HomePage from './components/HomePage.js';

import './App.css';

function App() {

  return (
    <div>
      <Routes>
        <Route exact path = "/home" element = {<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
