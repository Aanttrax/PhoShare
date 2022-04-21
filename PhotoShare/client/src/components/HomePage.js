import React from "react";
import { useNavigate } from "react-router-dom";
import user from '../img/user.png';

import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth"

import alert from '../img/alert.png';
import imagen from '../img/imagen.png';
import './HomePage.css'

const auth = getAuth(firebaseApp)

function HomePage() {

    let btn = ['categoria1', 'categoria2', 'categoria3', 'categoria4', 'categoria5', 'categoria6' ];

    const navigate = useNavigate();

    async function logOut(){
        const sing = await signOut(auth)

        navigate('/');

        console.log(sing);
    };

    return (

        
        <div className="home">
            <div className="principal">
                <div className="user">
                    <img src = {user} alt='user' width="50" height="50"/>
                    <p>Nombre de Usuario</p>
                </div>
                <div>
                    <input className="search" type= 'text' name='buscar' placeholder="Buscar">
                    </input>
                </div>
                <img src = {alert} alt='user' width="50" height="50"/>
            </div>
            <div className="menu">
                <select className="select">
                    <option value=''>Opciones</option>
                    <option value='Edit'>Editar perfil</option>
                    <option value='log out' 
                        onClick={logOut}>
                                Cerrar Sesion
                    </option>
                </select>
            </div>
            <div className="container">
                {Array.isArray(btn) && btn.map((c,i)=>(
                    <div className="card" key ={i}>
                        <p className="title">{c}</p>
                        <div className="ima">
                            <img src={imagen} 
                                alt = 'imagen'
                                className = 'img' 
                            />
                        </div>
                    </div>
                ))}
            </div>
                
        </div>
    )
};

export default HomePage;