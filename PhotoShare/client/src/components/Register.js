import React from "react";
import { Link } from "react-router-dom";
import logo from '../img/logo.png';

import './Register.css';

function Register() {
    return (
        <div className="body">
            <div className="register-box">
                <img className = 'avatar'src={logo} alt="logo"/>
                <h2>Register!</h2>
                <form>
                    <label htmlFor = 'username'>Username</label>
                    <input type = 'text' placeholder="Enter Username"/>
                    <label htmlFor = 'email'>Email</label>
                    <input type = 'text' placeholder="Enter email"/>
                    <label htmlFor = 'password'>Password</label>
                    <input type = 'password' placeholder="Enter Password"/>
                    <label htmlFor = 'confirm-password'>Confirm Password</label>
                    <input type = 'password' placeholder="Re-Enter Password"/>
                    <label htmlFor = 'sex'>Sex</label>
                    <input type = 'text' placeholder="Enter Sex"/>
                    <label htmlFor = 'age'>Age</label>
                    <input type = 'text' placeholder="Enter Age"/>
                    <input type = 'submit' value='Register'/>
                    <Link to = '/login' className="a">
                        Back to sign in
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Register;