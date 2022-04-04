import React from "react";
import user from '../img/user.png';

import './HomePage.css'


function HomePage() {

    let btn = ['categoria1', 'categoria2', 'categoria3', 'categoria4', 'categoria5', 'categoria6' ];

    return (
        <div>
            <div className="principal">
                <div className="user">
                    <img src = {user} alt='user' width="50" height="50"/>
                    <p>Nombre de Usuario</p>
                </div>
                <div>
                    <input className="search" type= 'text' name='buscar'>
                    </input>
                </div>
            </div>
            <div className="menu">
                <select className="select">
                    <option value=''>Opciones</option>
                    <option value='Edit'>Editar perfil</option>
                
                </select>
                <div>
                    {Array.isArray(btn) && btn.map((c,i)=>(
                        <button 
                            key ={i}
                            className = 'btn'>
                            {c}
                        </button>
                    ))}
                </div>
            </div>
                
        </div>
    )
};

export default HomePage;