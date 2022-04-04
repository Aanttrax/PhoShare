import React from "react";
import user from '../img/user.png';
import alert from '../img/alert.png';
import imagen from '../img/imagen.png';
import './HomePage.css'


function HomePage() {

    let btn = ['categoria1', 'categoria2', 'categoria3', 'categoria4', 'categoria5', 'categoria6' ];

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
                <img src = {alert} alt='user' width="70" height="60"/>
            </div>
            <div className="menu">
                <select className="select">
                    <option value=''>Opciones</option>
                    <option value='Edit'>Editar perfil</option>
                
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