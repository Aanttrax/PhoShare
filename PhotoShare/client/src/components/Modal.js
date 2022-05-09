import React from "react"
import './Modal.css';
import firebaseApp from "../firebase/credenciales";
import { getStorage } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth"
const auth = getAuth();
const user = auth.currentUser;
const storage = getStorage(firebaseApp);

function eliminar(id){

    storage.useSelector("user").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
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
                <input type={'button'} value='Eliminar Cuenta' onClick="eliminar('${user}')"/> 
                <input type={'button'} value='Cancelar'onClick={closeModal}/> 
                {children}
            </div> 
        </div>
    )
}
export default Modal;

