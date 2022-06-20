import './Ver.css'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
//Imagenes
import dowload from '../img/Descargar.png';
import favorites from '../img/Favorito.png';
import coment from '../img/Comentario.png';
import image from '../img/imagen.png';
import hom from '../img/Home.png';
import paisajes from '../img/pai.jpg';
//cosas importadas de otros componentes
import {defini, imgurl} from './HomePage.js'
//firebase
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { async } from '@firebase/util';
//axios
import axios from 'axios'
import fileDownload from 'js-file-download'



function Ver(){
    const navigate = useNavigate();

    let btn = [{name : 'Imagen', 
               img : `${image}`},
               {name : 'Descargar', 
               img : `${dowload}`}, 
               {name : 'Añadir', 
               img : `${favorites}`}, 
               {name : 'Comentarios', 
               img : `${coment}`},
               {name : 'volver', 
               img : `${hom}`}
               ];
               const handleClick = (url, filename) => {
                axios.get(url, {
                  responseType: 'blob',
                })
                .then((res) => {
                  fileDownload(res.data, filename)
                })
            }
         function descargar(){
      
            // Create a reference to the file we want to download
            const storage = getStorage();
            const starsRef = ref(storage, imgurl);

            // Get the download URL
            getDownloadURL(starsRef)
            .then((url) => {
             // Insert url into an <img> tag to "download"
             })
            .catch((error) => {
             // A full list of error codes is available at
             // https://firebase.google.com/docs/storage/web/handle-errors
             switch (error.code) {
               case 'storage/object-not-found':
                   // File doesn't exist
                   console.log(error.code);
                   break;
               case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
                 case 'storage/canceled':
                    console.log(error.code);
                   // User canceled the upload
                  break;

                // ...

                 case 'storage/unknown':
                    console.log(error.code);
                    // Unknown error occurred, inspect the server response
                 break;
             }
            });


         }         

    //filtra los usuarios
    let usuariosbd = useSelector(state => state.users);
    //filtra usuarios que subieron imagenes
    let filtrados = usuariosbd.filter(imgs => imgs.imagenes.length > 0);
    //llena un array con todas las imagenes que hay
    let todasImgs = [];
    console.log(llenar(todasImgs));
    function llenar(todasImgs){
        for (let i = 0; i < filtrados.length; i++) {
            todasImgs = todasImgs.concat(filtrados[i].imagenes);
        }
        return todasImgs;
    }
    //array de la imagen
    let imagenVer = llenar(todasImgs).filter(imgs => imgs.nameimg === defini);
    console.log(defini,'**************')
    console.log(imagenVer,'**************')

    function select(e) {
        
        const seleccion = e.target.alt;
        console.log(seleccion,'**************')
        switch(seleccion){
            case 'volver':
                navigate('/home')
            case 'Comentarios':
                setEstado(1)
            case 'Descargar':
                handleClick(imgurl,defini)
                
        }
    }

    const[estado, setEstado] = useState(0);
    function cerrar(){
        setEstado(0);
    }

    return(
        <div className="Ver">
            
            <div className="cuerpo">
                <div className="div_ver">
                    {Array.isArray(imagenVer) && imagenVer.map((c,i)=>(
                        <div key={i} >
                            <>
                            <img
                                className="img_ver"
                                src = {c.imag}
                                alt= {c.nameimg}/>
                            </>
                        </div>
                    ))}
                </div>
            </div>

            <div className="cabecera">
                {estado === 0? 
                    <div className="btn_ver">
                        {Array.isArray(btn) && btn.map((c,i)=>(
                                <div key={i} onClick={select} id = {c.name}>
                                    <img
                                        className="icon_ver" 
                                        src = {c.img}
                                        alt= {c.name}/>
                                    <p>{c.name}</p>
                                </div>
                        ))}
                    </div>
                : ""}

                {estado === 1?
                    <div>
                        <div className='divCerrar'>
                            <button onClick={cerrar} className='botonCerrar'>cerrar</button>
                        </div>
                        <div className='cuadroComentarios'>
                            <div className='comentarios'>
                                
                            </div>
                            <div className='accion'>
                                <div>
                                    <input type='text' className='escribir'></input>
                                </div>
                                <div>
                                    <button className='publicar'>Publicar</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                : ""}
            </div>
        </div>
    )
}
export default Ver;
