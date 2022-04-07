import { Routes, Route } from "react-router";
import Splash from "./components/Splash.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Recovery from "./components/Recovery.js";
import HomePage from './components/HomePage.js';

import './App.css';

function App() {

  return (
    <div>
      <Routes>
        <Route exact path = "/" element ={<Splash/>}/>
        <Route exact path = "/login" element = {<Login/>}/>
        <Route exact path = "/register" element = {<Register/>}/>
        <Route exact path = "/recovery" element = {<Recovery/>}/>
        <Route exact path = "/home" element = {<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
