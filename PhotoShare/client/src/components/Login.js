import React from "react";
import {Link} from 'react-router-dom';
import logo from "../img/logo.png";

import './Login.css';

function Login() {
    return(
        <div className="body">
            <div className="login-box">
                <img className = 'avatar'src={logo} alt="logo"/>
                <h2>Login Here!</h2>
                <form>
                    <label htmlFor = 'username'>Username</label>
                    <input type = 'text' placeholder="Enter Username"/>
                    <label htmlFor = 'password'>Password</label>
                    <input type = 'password' placeholder="Enter Password"/>
                    <input type = 'submit' value='Log in'/>
                    <Link to = '/recovery' className="a">
                        Lost your Password
                    </Link><br/>
                    <Link to = '/register' className="a">
                        Dont have account?
                    </Link>
                </form>
            </div>
        </div>
    )
};

export default Login;