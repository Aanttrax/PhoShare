import { Routes, Route } from "react-router";
import HomePage from './components/HomePage.js';
import Splash from "./components/Splash.js";

import './App.css';

function App() {

  return (
    <div>
      <Routes>
        <Route exact path = "/" element ={<Splash/>}/>
        <Route exact path = "/home" element = {<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
