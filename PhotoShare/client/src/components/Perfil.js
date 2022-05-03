import React from "react";

import friends from '../img/Amigos.png';
import favorites from '../img/Favorito.png';
import up from '../img/Añadir.png';
import user from '../img/user.png';

import './Perfil.css';

function Perfil(){

    let btn = [{name : 'Amigos', 
               img : `${friends}`}, 
               {name : 'Favoritos', 
               img : `${favorites}`}, 
               {name : 'Subir', 
               img : `${up}`}
               ];

    return (
        <div className="body_perfil">
            <header className="perfil">
                <div className="data_perfil">
                    <img src = {user} alt='usuario'/>
                    <div >
                        <p className="status_perfil">Nombre Usuario</p><br/>
                        <span className="status_perfil">Seguidores</span>
                        <span className="status_perfil">Seguidos</span>    
                    </div>
                </div>
                <div className="btn_perfil">
                    {Array.isArray(btn) && btn.map((c,i)=>(
                        <div>
                            <img
                                className="img_perfil" 
                                src = {c.img}
                                alt= {c.name}/>
                            <p>{c.name}</p>
                        </div>
                    ))}
                </div>
            </header>
        </div>
    )
}

export default Perfil;