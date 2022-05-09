import React from "react"
import './Modal.css';
//import firebaseApp from "../firebase/credenciales";
//import { getStorage } from "firebase/storage";
import { getAuth, deleteUser } from "firebase/auth"
import { useNavigate } from "react-router-dom";
//import { doc, deleteDoc } from "firebase/firestore";

const auth = getAuth();
const user = auth.currentUser;
//const storage = getStorage(firebaseApp);


async function  eliminar(id, navigate){

    await deleteUser(id).then(() => {
        //deleteDoc(doc(db, "user", id));
         // User deleted.
    }).catch((error) => {
     // An error ocurred
     // ...
     });
  
  
       
    await navigate('/login');


}


const Modal =({isOpen, closeModal, children})=> {
    const navigate = useNavigate();
    const handleModalDialogClick = (e) =>{
        e.stopPropagation();
      
    }
    return (
        <div className={`modal ${isOpen && 'modal-open'}`} onClick={closeModal}>
            <div className="modal__dialog" onClick={handleModalDialogClick}>
                <h1>¿Esta seguro de Eliminar la Cuenta?</h1>
                <input className="btn_exit" type='button' value='Eliminar Cuenta' onClick={()=>eliminar(user,navigate)}/> 
                <input className='btn_exit' type='button' value='Salir'onClick={closeModal}/> 
                {children}
            </div> 
        </div>
    )
}
export default Modal;

