import React from "react";

import './HomePage.css'


function HomePage() {

    let btn = ['categoria1', 'categoria2', 'categoria3', 'categoria4', 'categoria5', 'categoria6' ];

    return (
        <div>
                <select>
                    <option value=''>Opciones</option>
                    <option value='Edit'>Editar perfil</option>
                
                </select>
                <div>
                    {Array.isArray(btn) && btn.map((c,i)=>(
                        <button key ={i}>
                            {c}
                        </button>
                    ))}
                </div>
        </div>
    )
};

export default HomePage;