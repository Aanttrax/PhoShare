
import React, { useState } from "react";
import logo from '../img/logo.png';
import { useSelector } from "react-redux";
import firebaseApp from "../firebase/credenciales";


import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";

import './Edit.css';

import Modal from "./Modal";
import useModal from "../hooks/useModal";


const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


function Edit() {

    const [isOpenModal, openModal, closeModal]= useModal();
    
    const [tipo,setTipo] = useState('Public');
    const [uploadValue,setUploadValue] = useState({uploadValue:0,picture:''});
    const [uploadValuePortal,setUploadValuePortal] = useState({uploadValue:0,picture:''});
    const [storageRef, setStorageRef] = useState([]);
    const [file,setFile] = useState([]);
    const [storageRefPortal, setStorageRefPortal] = useState([]);
    const [filePortal,setFilePortal] = useState([]);

    let user = useSelector(state => state.user);

    const uid = user.user.uid;
 
    async function editUser(password,username) {
        
        const docuRef = doc(firestore, `users/${uid}`);

        updateDoc(docuRef,{
            password: password,
            username:username,
            tipo: tipo
        });
    };


    function submitHandler(e) {

        e.preventDefault();

        const username = e.target.elements.newUsername.value;
        const password = e.target.elements.newPassword.value;
        
        editUser(password,username);

        e.target.elements.newUsername.value='';
        e.target.elements.newPassword.value='';
    };

    function tipoPerfil(e){

        setTipo(e.target.value)

    };

    function onUpload(e){
        
        const stoRef = ref(storage,`Fotos/${e.target.files[0].name}`); 
        setStorageRef(stoRef) 
        setFile(e.target.files[0])

    };

    function upLoad() {
        
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        uploadTask.on('state_changed', 
            (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadValue({uploadValue: percentage})
        },
            (error) => {
            console.log(error.message)
        },
            ()=>{
            
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);

                setUploadValue({
                    uploadValue:100,
                    picture: downloadURL
                })

                const docuRef = doc(firestore, `users/${uid}`);

                updateDoc(docuRef,{
                imgPerfil: downloadURL
                })

              });
            
        });
        
        document.getElementById('file').value='';
        
    };
    
    function onUploadPortal(e){
        
        const stoRef = ref(storage,`Fotos/${e.target.files[0].name}`); 
        setStorageRefPortal(stoRef) 
        setFilePortal(e.target.files[0])

    };

    function upLoadPortal() {

        const uploadTask = uploadBytesResumable(storageRefPortal, filePortal)

          uploadTask.on('state_changed', 
          (snapshot) => {
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadValuePortal({uploadValue: percentage})
      },
          (error) => {
          console.log(error.message)
      },
          ()=>{
          
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);

              setUploadValuePortal({
                  uploadValue:100,
                  picture: downloadURL
              })
            
              const docuRef = doc(firestore, `users/${uid}`);

              updateDoc(docuRef,{
                imgPortal: downloadURL
              })

            });
          
      });

        document.getElementById('portada').value='';
    };

    return (
        <div className="body">
            <div className="edit-box">
            <img className = 'avatar'src={logo} alt="logo"/>
                <h2>Edit Profile</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor = 'username'>New Username</label>
                    <input
                        id="newUsername" 
                        type = 'text' 
                        placeholder="Enter New Username"/>

                    <label htmlFor = 'password'>New Password</label>
                    <input 
                        id="newPassword"
                        type = 'password' 
                        placeholder="Enter New Password"/>

                    <label>Cambiar foto de Perfil</label>
                    <p>
                        <progress value={uploadValue.uploadValue} max='100'></progress>
                        <input 
                            id = 'file'
                            onChange={onUpload}
                            type = 'file' 
                            name = 'imagen subida'/>
                        <input 
                            onClick={upLoad}
                            type = 'button' 
                            value = 'subir imagen'/>
                    </p>

                    <label htmlFor = 'imgPortada'>Cambiar foto de Portada</label>
                    <p>
                        <progress value={uploadValuePortal.uploadValue} max='100'></progress>
                        <input
                            id="portada"
                            onChange={onUploadPortal}
                            type = 'file' 
                            name = 'imagen subida'/>
                        <input 
                            onClick={upLoadPortal}
                            type = 'button' 
                            value = 'subir imagen'/>
                    </p>

                    <label htmlFor = 'account'>Type Account</label>

                    <div 
                        className='T' 
                        >
                        <div 
                            className="se"
                            onChange={tipoPerfil}>
                            <input type = 'radio'  name='tipo' defaultChecked value='Publico'/>
                            <label>Public</label>
                        </div>
                        <div 
                            className="se"
                            onChange={tipoPerfil}>
                            <input type = 'radio' name='tipo' value = 'Privado'/>
                            <label>Privado</label>
                        </div>
                    </div>

                    <input type ='button' value='Eliminar cuenta'
                                onClick={openModal}
                            />
                                <Modal 
                                isOpen={isOpenModal}
                                 closeModal={closeModal}
                 
                                />
                    
                    <input 
                        type = 'submit' 
                        value='Aplicar'/>
                </form>
            </div>
        </div>
    );
};

export default Edit;