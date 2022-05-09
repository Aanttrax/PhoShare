import React from "react"
import './Modal.css';
import firebaseApp from "../firebase/credenciales";
import { getStorage } from "firebase/storage";
import { getAuth, deleteUser } from "firebase/auth"
const auth = getAuth();
const user = auth.currentUser;
const storage = getStorage(firebaseApp);

function eliminar(id){

    deleteUser(id).then(() => {
        // User deleted.
      }).catch((error) => {
        // An error ocurred
        // ...
      });
      
    
}
const Modal =({isOpen, closeModal, children})=> {
    
    const handleModalDialogClick = (e) =>{
        e.stopPropagation();
      
    }
    return (
        <div className={`modal ${isOpen && 'modal-open'}`} onClick={closeModal}>
            <div className="modal__dialog" onClick={handleModalDialogClick}>
                <h1>¿Esta seguro de Eliminar la Cuenta?</h1>
                <input type={'button'} value='Eliminar Cuenta' onClick={()=>eliminar(user)}/> 
                <input type={'button'} value='Salir'onClick={closeModal}/> 
                {children}
            </div> 
        </div>
    )
}
export default Modal;

