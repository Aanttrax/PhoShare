import React from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Subir from './Subir.js';
import useModal from "../hooks/useModal";
import atras from '../img/atras.png';

import friends from '../img/Amigos.png';
import favorites from '../img/Favorito.png';
import up from '../img/Añadir.png';
import user from '../img/user.png';

import './Perfil.css';

function Perfil(){

    const navigate = useNavigate();

    const [isOpenModal, openModal, closeModal]= useModal();

    let btn = [{name : 'Amigos', 
               img : `${friends}`}, 
               {name : 'Favoritos', 
               img : `${favorites}`}, 
               {name : 'Subir', 
               img : `${up}`}
               ];

    let userbd = useSelector(state => state.user);
    let usersbd = useSelector(state => state.users);
    
    const usuario_perfil = usersbd.find(element => element.email === userbd.user.email);

    console.log(usuario_perfil.imagenes)
    
    function select(e) {
        
        const seleccion = e.target.alt;
        console.log(seleccion,'**************')
        switch(seleccion){
            case 'Subir':
                openModal()
        }
    }

    return (
        <div className="body_perfil">
            <img 
                onClick={()=>{navigate('/home')}}
                src={atras} 
                className ='btn_atras'
                alt='atras' 
                width="50px" height="50px"/>
            <header className="perfil">
                <div className="data_perfil">
                    <img 
                        src = {usuario_perfil.Perfil.imgPerfil?usuario_perfil.Perfil.imgPerfil:user} 
                        alt='usuario'
                        width="130" height="130"/>
                    <div >
                        <p className="status_perfil">{usuario_perfil.username}</p><br/>
                        <span className="status_perfil">Seguidores</span>
                        <span className="status_perfil">Seguidos</span>    
                    </div>
                </div>
                <div className="btn_perfil">
                    {Array.isArray(btn) && btn.map((c,i)=>(
                        <div key={i} onClick = {select} id = {c.name}>
                            <img
                                className="img_perfil" 
                                src = {c.img}
                                alt= {c.name}/>
                            <p>{c.name}</p>
                        </div>
                    ))}
                </div>
            </header>
            <div className="contenido">
                <Subir isOpen={isOpenModal}
                closeModal={closeModal}/>

                {Array.isArray(usuario_perfil.imagenes) && usuario_perfil.imagenes.map((c,i)=>(
                    <div key={i} className = 'imagenes_perfil'>
                        <img
                            className="imagenes_show"
                            src = {c.imag}
                            alt= {c.nameimg}/>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Perfil;