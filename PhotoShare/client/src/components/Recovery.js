import React from "react";
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';

import './Recovery.css';

function Recovery(){
    return(
        <div className="body">
            <div className="recovery-box">
                <img className = 'avatar'src={logo} alt="logo"/>
                <h2>Forgot your Password?</h2>
                <form>
                    <label htmlFor = 'email'>Email</label>
                    <input type = 'text' placeholder="Enter Email"/>
                    <input type = 'submit' value='Request Password Reset'/>
                    <Link to = '/login' className="a">
                        Back to sign in
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Recovery;