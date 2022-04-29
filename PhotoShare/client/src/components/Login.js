import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import firebaseApp from "../firebase/credenciales";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import logo from "../img/logo.png";

import './Login.css';

const auth = getAuth(firebaseApp);

function Login() {

    const navigate = useNavigate();

    const[mail,setMail]=useState('');
    const [message, setMessage]=useState('');

    async function logIn(email,password){
        const sing = await signInWithEmailAndPassword(auth, email,password);
        navigate('/');
        console.log(sing,'aqui')
    };

    function submitHandler(e) {
        e.preventDefault();

        const email= e.target.elements.mail.value;
        const password= e.target.elements.pass.value;

        logIn(email,password);

    };

    function validarEmail( email ) {
        let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ( !expr.test(email) ){
            setMessage (`La dirección de correo es incorrecta.`);  
        } else {
            setMessage (``); 
        }
    };

    function verify(e) {
        setMail(e.target.value)
        validarEmail(mail);
    };

    return(
        <div className="body">
            <div className="login-box">
                <img className = 'avatar'src={logo} alt="logo"/>
                <h2>Login Here!</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor = 'username'>E-mail</label>
                    <input 
                        id="mail" 
                        type = 'text' 
                        placeholder="Enter Username"
                        onChange={verify}/>
                    <span className="alert">{message}</span>
                    <label htmlFor = 'password'>Password</label>
                    <input 
                        id="pass" 
                        type = 'password' 
                        placeholder="Enter Password"/>

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