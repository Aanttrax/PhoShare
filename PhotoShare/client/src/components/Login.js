import React from "react";
import { Link, useNavigate } from 'react-router-dom';

import firebaseApp from "../firebase/credenciales";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import logo from "../img/logo.png";

import './Login.css';

const auth = getAuth(firebaseApp);

function Login() {

    const navigate = useNavigate();

    async function logIn(email,password){
        const sing = await signInWithEmailAndPassword(auth, email,password);

        navigate('/');

        console.log(sing);
    };

    function submitHandler(e) {
        e.preventDefault();

        const email= e.target.elements.mail.value;
        const password= e.target.elements.pass.value;

        logIn(email,password);

    };

    return(
        <div className="body">
            <div className="login-box">
                <img className = 'avatar'src={logo} alt="logo"/>
                <h2>Login Here!</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor = 'username'>Username</label>
                    <input id="mail" type = 'text' placeholder="Enter Username"/>

                    <label htmlFor = 'password'>Password</label>
                    <input id="pass" type = 'password' placeholder="Enter Password"/>

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