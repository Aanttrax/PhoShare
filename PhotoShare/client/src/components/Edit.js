
import React from "react";
import logo from '../img/logo.png';
import { useSelector } from "react-redux";
import firebaseApp from "../firebase/credenciales";

import { getFirestore, doc, setDoc } from 'firebase/firestore'

import './Edit.css';

const firestore = getFirestore(firebaseApp);

function Edit() {

    let user = useSelector(state => state.user);
    let users = useSelector(state => state.users);

    console.log(users);

    let actual = users.find( e => e.email === user.user.email);

    const email = actual.email;
    const sex = actual.sex;
    const age = actual.age;
    const uid = user.user.uid;
 
    async function editUser(password,username) {
        
        const docuRef = doc(firestore, `users/${uid}`);

        setDoc(docuRef,{
            email:email,
            password: password,
            username:username,
            sex:sex,
            age:age
        });
    };

    function submitHandler(e) {

        e.preventDefault();

        const username = e.target.elements.newUsername.value;
        const password = e.target.elements.newPassword.value;
        
        editUser(password,username);

        e.target.elements.newUsername.value='';
        e.target.elements.newPassword.value='';
    };



    return (
        <div className="body">
            <div className="edit-box">
            <img className = 'avatar'src={logo} alt="logo"/>
                <h2>Edit Profile</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor = 'username'>New Username</label>
                    <input
                        id="newUsername" 
                        type = 'text' 
                        placeholder="Enter New Username"/>

                    <label htmlFor = 'password'>New Password</label>
                    <input 
                        id="newPassword"
                        type = 'password' 
                        placeholder="Enter New Password"/>

                    <label>Cambiar foto de Perfil</label>
                    <p>
                        <input type = 'file' name = 'imagen subida'/>
                        <input type = 'button' value = 'subir imagen'/>
                    </p>

                    <label htmlFor = 'imgPortada'>Cambiar foto de Portada</label>
                    <p>
                        <input type = 'file' name = 'imagen subida'/>
                        <input type = 'button' value = 'subir imagen'/>
                    </p>

                    <label htmlFor = 'account'>Type Account</label>

                    <div className='T'>
                        <div className="se">
                            <input type = 'radio'  name='tipo' checked/>
                            <label>Public</label>
                        </div>
                        <div className="se">
                            <input type = 'radio' name='tipo'/>
                            <label>Privado</label>
                        </div>
                    </div>

                    <input type ='button' value='Eliminar cuenta'/>
                    
                    <input type = 'submit' value='Aplicar'/>
                </form>
            </div>
        </div>
    );
};

export default Edit;