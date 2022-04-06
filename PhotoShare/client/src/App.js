import { Routes, Route } from "react-router";
import Splash from "./components/Splash.js";
import Login from "./components/Login.js";
import HomePage from './components/HomePage.js';

import './App.css';

function App() {

  return (
    <div>
      <Routes>
        <Route exact path = "/" element ={<Splash/>}/>
        <Route exact path = "/login" element = {<Login/>}/>
        <Route exact path = "/home" element = {<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
