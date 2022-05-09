import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
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
    const[seguido,setSeguido]=useState('');
    const[seguir,setSeguir]=useState(false);
    function Seguir(user){

        if ( seguir==false){
            setSeguir(true);
            setSeguido('seguir');
            console.log('no');
        }else {
            setSeguir(false);
            setSeguido('siguido');
            
            console.log(user);
        }
        }
        function DejarSeguir(id){

            if ( seguir==true){
                setSeguir(true);
                setSeguido('seguir');
                console.log('no');
            }else {
                setSeguir(false);
                setSeguido('seguido');
                
                console.log('yes');
            }
            }

    const dispatch = useDispatch();

    let userbd = useSelector(state => state.user);
    let usersbd = useSelector(state => state.users);
    
    const usuario_perfil = usersbd.find(element => element.email === userbd.user.email);
    
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

    const [visible , setVisible] = useState(true);
    const [letra , setLetra] = useState("");
    

    const escribi = (e) => {
        setLetra(e.target.value);
        if(e.target.value === ''){
            setVisible(true);
        }else if(letra.length >= 0 && letra.length !== 1){
            setVisible(false);
        }
    }


    function exist(d){
        return d.includes(letra);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('You clicked submit.');
      }
    return (

        
        <div className="home">
            <div className="principal">
                <div 
                    onClick={perfil}
                    className="user">
                    <img 
                        src = {
                            usuario_perfil.imgPerfil?usuario_perfil.imgPerfil:
                            userimagen} 
                        alt='user' width="50" height="50"/>
                    <p>
                        {usuario_perfil.username}
                    </p>
                </div>
                <div>
                    <input className="search" 
                            type= 'text' 
                            name='buscar' 
                            placeholder="Buscar" 
                            onChange={escribi}>
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
            
            {visible?

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
            : ""}

            {visible === false? 
                <div className="container_search">
                    {Array.isArray(usersbd) && usersbd.map((c,i)=>(
                        
                        
                        <div className="mienbros" key ={i}>
                            {exist(c.username)?
                            <>
                            <div className="usuario_result" key={c.username}>
                                <img src={c.imgPerfil} alt = 'imagen' className = 'imgUser' width="80" height="80"/>
                                <p>{c.username}</p>

                                
                            </div>
                           
                            
                            
                            </>
                            : ""}
                            <button className="seguir" onClick={()=> Seguir(c.username)} >{seguido}</button> 
                            
                        </div>
                            
                        
                    ))}
                </div>  
            : ""}

        </div>
    )
};

export default HomePage;