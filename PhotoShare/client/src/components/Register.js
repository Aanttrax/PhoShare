import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import atras from '../img/atras.png';

import firebaseApp from "../firebase/credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore'

import logo from '../img/logo.png';

import './Register.css';
import useModal from "../hooks/useModal";
import swal from 'sweetalert';


const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


function Register() {
   
    const [isOpenRegisterModal, openRegisterModal, closeRegisterModal]= useModal();
    const mostrarAlerta =()=>{
        swal({
                title: "Cuenta creada exitosamente",
                icon: "success",
                button: "aceptar"
        }
        );
    }
    
  
    const navigate = useNavigate();

    const [mail,setMail]= useState('');
    const [message, setMessage]= useState('');

    const [pas,setPas] = useState('');
    const [messagePas,setMessagePas] = useState('');

    const [equalityMenssage, setEqualityMenssage] = useState('');

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
            age:age,
            tipo:'Public',
            Perfil:{imgPerfil:'', imgName:''},
            Portal:{imgPortal:'', imgName:''},
            imagenes:[]
        });

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

    function validarEmail( email ) {
        let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ( !expr.test(email) ){
            setMessage (`La dirección de correo es incorrecta.`);  
        } else {
            setMessage (``); 
        }
    };

    function validarPass(pas) {
        console.log(pas.length)
        if(pas.length <5) {
            setMessagePas (`El password tiene que tener como minnimo 6 caracteres`);  
        } else {
            setMessagePas ('');
        }
    };

    function validarEquality(equality) {
        if(pas !== equality){
            setEqualityMenssage('El Password no coincide')
            console.log(pas, equality)
        } else {
            setEqualityMenssage('')
            console.log(pas, equality)
        }
    }

    function validate(e) {
        setMail(e.target.value)
        validarEmail(mail);
    };

    function verify(e) {
        setPas(e.target.value);
        validarPass(pas);
    };

    function equal(e) {
        validarEquality(e.target.value);
    };

    return (
        <div className="body">
            <img 
                onClick={()=>{navigate('/login')}}
                src={atras} 
                className ='btn_atras'
                alt='atras' 
                width="50px" height="50px"/>
            <div className="register-box">
                <img className = 'avatar'src={logo} alt="logo"/>
                <h2>Register!</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor = 'username'>Username</label>
                    <input 
                        id = 'username' 
                        type = 'text' 
                        placeholder="Enter Username"/>

                    <label htmlFor = 'email'>Email</label>
                    <input 
                        id = 'email'
                        type = 'text' 
                        placeholder="Enter email"
                        onChange={validate}/>
                    <span className="alert">{message}</span>
                    <label htmlFor = 'password'>Password</label>
                    <input 
                        type = 'password' 
                        placeholder="Enter Password"
                        onChange={verify}/>
                    <span className="alert">{messagePas}</span>
                    <label htmlFor = 'confirm-password'>Confirm Password</label>
                    <input 
                        id = 'password' 
                        type = 'password'  
                        placeholder="Re-Enter Password"
                        onChange={equal}/>
                    <span className="alert">{equalityMenssage}</span>
                    <label htmlFor = 'sex'>Sex</label>
                    <input 
                        id = 'sex' 
                        type = 'text' 
                        placeholder="Enter Sex"/>

                    <label htmlFor = 'age'>Age</label>
                    <input 
                        id = 'age' 
                        type = 'text' 
                        placeholder="Enter Age"/>
                       
                       <input type = 'submit'  value='Register' onClick={()=>mostrarAlerta()}/>
                          <Link to = '/login' className="a">
                        Back to sign in
                        </Link>
                </form>      
            </div>
        </div>
    );
};

export default Register;