
import React from "react";
import { Link } from "react-router-dom";
import logo from '../img/logo.png';

import './Edit.css';

function Edit() {
    return (
        <div className="body">
            <div className="edit-box">
                
                <h2>Edit Profile</h2>
                <form>
                    <label htmlFor = 'username'>New Username</label>
                    <input type = 'text' placeholder="Enter New Username"/>

                    <label htmlFor = 'password'>New Password</label>
                    <input type = 'text' placeholder="Enter New Password"/>

                    <label htmlFor = 'imgPerfil'>Cambiar foto de Perfil</label>
                    <p>
                        <input type = 'file' name = 'imagen subida'/>
                        <input type = 'submit' value = 'subir imagen'/>
                    </p>

                    <label htmlFor = 'imgPortada'>Cambiar foto de Portada</label>
                    <p>
                        <input type = 'file' name = 'imagen subida'/>
                        <input type = 'submit' value = 'subir imagen'/>
                    </p>

                    <label htmlFor = 'account'>Type Account</label>
                    <div className='T'>
                    <label className='T1'><input type = 'radio' name = 'tipe' checked/>Public</label>
                    <label className='T1'><input type = 'radio' name = 'tipe'/>Private</label>
                    </div>

                    <input type = 'submit' value='Eliminar cuenta'/>

                    <Link to = '/login' className="a">
                      <input type = 'submit' value='cerrar sesion'/>
                    </Link>
                    

                    
                    
                    <input type = 'submit' value='Aplicar'/>
                </form>
            </div>
        </div>
    );
};

export default Edit;