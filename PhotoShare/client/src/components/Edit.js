
import React from "react";
import logo from '../img/logo.png';

import './Edit.css';

function Edit() {
    return (
        <div className="body">
            <div className="edit-box">
            <img className = 'avatar'src={logo} alt="logo"/>
                <h2>Edit Profile</h2>
                <form>
                    <label htmlFor = 'username'>New Username</label>
                    <input type = 'text' placeholder="Enter New Username"/>

                    <label htmlFor = 'password'>New Password</label>
                    <input type = 'password' placeholder="Enter New Password"/>

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