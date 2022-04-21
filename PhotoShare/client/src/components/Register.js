import React from "react";
import { Link, useNavigate } from "react-router-dom";

import firebaseApp from "../firebase/credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore'

import logo from '../img/logo.png';

import './Register.css';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


function Register() {

    const navigate = useNavigate();

    async function registerUser(email, password,username,sex,age) {
        const infoUser = await createUserWithEmailAndPassword(auth,email,password).then((userFirebase) => {
            return userFirebase
        });

        const docuRef = doc(firestore, `users/${infoUser.user.uid}`);

        setDoc(docuRef,{
            email:email,
            password: password,
            username:username,
            sex:sex,
            age:age
        });
        console.log(infoUser)
    };

    function submitHandler(e) {
        e.preventDefault();

        const username = e.target.elements.username.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const sex = e.target.elements.sex.value;
        const age = e.target.elements.age.value;

        registerUser(email,password,username,sex,age);

        navigate('/');

    };

    return (
        <div className="body">
            <div className="register-box">
                <img className = 'avatar'src={logo} alt="logo"/>
                <h2>Register!</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor = 'username'>Username</label>
                    <input id = 'username' type = 'text' placeholder="Enter Username"/>

                    <label htmlFor = 'email'>Email</label>
                    <input id = 'email'type = 'text' placeholder="Enter email"/>

                    <label htmlFor = 'password'>Password</label>
                    <input type = 'password' placeholder="Enter Password"/>

                    <label htmlFor = 'confirm-password'>Confirm Password</label>
                    <input id = 'password' type = 'password' placeholder="Re-Enter Password"/>

                    <label htmlFor = 'sex'>Sex</label>
                    <input id = 'sex' type = 'text' placeholder="Enter Sex"/>

                    <label htmlFor = 'age'>Age</label>
                    <input id = 'age' type = 'text' placeholder="Enter Age"/>

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