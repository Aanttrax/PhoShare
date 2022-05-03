import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import userimagen from '../img/user.png';

import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth"

import alert from '../img/alert.png';

import deportes from '../img/depo.jpg';
import paisajes from '../img/pai.jpg';
import comida from '../img/comi.jpg';
import games from '../img/game.jpg';
import autoMoto from '../img/aut.jpg';
import otros from '../img/otr.jpg';
import './HomePage.css'
import { getStart } from "../actions/actions";

const auth = getAuth(firebaseApp)

function HomePage({user}) {
    
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getStart())
    },[dispatch])

    let btn = [{name : 'Deportes', 
               img : `${deportes}`}, 
               {name : 'Paisajes', 
               img : `${paisajes}`}, 
               {name : 'Comida', 
               img : `${comida}`},
               {name : 'Video Juegos', 
               img : `${games}`},
               {name : 'Autos & Motos', 
               img : `${autoMoto}`},
               {name : 'Otros', 
                img : `${otros}`}];

    const navigate = useNavigate();

    async function logOut(){
        const sing = await signOut(auth)
        console.log(sing)
        navigate('/');

    };


    function edit(){
        navigate('/edit')
    }

    function perfil(){
        navigate('/perfil')
    }
    return (

        
        <div className="home">
            <div className="principal">
                <div 
                    onClick={perfil}
                    className="user">
                    <img src = {userimagen} alt='user' width="50" height="50"/>
                    <p>{user.email}</p>
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
                    <option 
                        value='Edit'
                        onClick={edit}>
                            Editar perfil
                    </option>
                    <option value='log out' 
                        onClick={logOut}>
                                Cerrar Sesion
                    </option>
                </select>
            </div>
            
            <div className="container">
                {Array.isArray(btn) && btn.map((c,i)=>(
                    <div className="card" key ={i}>
                        <p className="title">{c.name}</p>
                        <div className="ima">
                            <img 
                                src={c.img} 
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